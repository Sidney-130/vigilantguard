// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {VigilantGuard} from "../src/VigilantGuard.sol"; // Assumes you renamed the file

contract VigilantGuardTest is Test {
    VigilantGuard public vigilantGuard;
    address public owner;
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        owner = address(this);
        // Corrected Constructor: Now passes all 5 required arguments
        vigilantGuard = new VigilantGuard(
            100,            // _maxTypingSpeed: 100 chars/second
            0.01 ether,     // _minAmount: 0.01 ETH
            70,             // _highRiskThreshold: 70/100
            10 ether,       // _maxTransactionAmount: 10 ETH
            owner           // _owner
        );
    }

    // ===================================
    // 1. Core Functionality Tests
    // ===================================

    function testInitialState() public view {
        assertEq(vigilantGuard.owner(), owner, "Owner is correct");
        assertEq(vigilantGuard.totalChecked(), 0, "Total checked starts at zero");
        assertEq(vigilantGuard.getRules().highRiskThreshold, 70, "Threshold is 70");
    }

    function testSubmitTransaction_LowRisk() public {
        bytes32 txHash = keccak256("low-risk-tx");
        
        // Corrected submitTransaction: Now passes 4 arguments (low risk profile)
        vm.prank(user1);
        uint16 riskScore = vigilantGuard.submitTransaction(
            txHash, 
            1 ether,    // Amount (Normal)
            user2,      // Recipient
            20          // Typing Speed (Slow/Normal)
        );

        assertTrue(riskScore < vigilantGuard.getRules().highRiskThreshold, "Score should be low risk");
        assertEq(vigilantGuard.totalChecked(), 1, "Total checked incremented");
        assertEq(vigilantGuard.totalFlagged(), 0, "Total flagged is zero");
    }

    function testSubmitTransaction_HighAmountRisk() public {
        bytes32 txHash1 = keccak256("high-amount-tx-1");
        bytes32 txHash2 = keccak256("high-amount-tx-2");
        bytes32 txHash3 = keccak256("high-amount-tx-3");

        // High Amount (30 points)
        vm.prank(user1);
        // Corrected submitTransaction: Passes 4 arguments
        uint16 score1 = vigilantGuard.submitTransaction(txHash1, 11 ether, user2, 5);
        assertTrue(score1 >= 30, "Score should reflect high amount risk (>=30)");
        
        // Moderate High Amount (15 points)
        vm.prank(user1);
        // Corrected submitTransaction: Passes 4 arguments
        uint16 score2 = vigilantGuard.submitTransaction(txHash2, 6 ether, user2, 5);
        assertTrue(score2 >= 15, "Score should reflect moderate high amount risk (>=15)");

        // Too low amount (10 points)
        vm.prank(user1);
        // Corrected submitTransaction: Passes 4 arguments
        uint16 score3 = vigilantGuard.submitTransaction(txHash3, 0.005 ether, user2, 5);
        assertTrue(score3 >= 10, "Score should reflect low amount risk (>=10)");
    }

    function testSubmitTransaction_TypingSpeedRisk() public {
        bytes32 txHash = keccak256("bot-tx");

        // Bot-like speed (25 points)
        vm.prank(user1);
        // Corrected submitTransaction: Passes 4 arguments (Typing Speed > maxTypingSpeed 100)
        uint16 riskScore = vigilantGuard.submitTransaction(
            txHash, 
            1 ether, // Normal amount
            user2, 
            150     // High speed
        );

        assertTrue(riskScore >= 25, "Score should reflect bot-like typing speed");
    }
    
    function testSubmitTransaction_HighRisk_Flagged() public {
        bytes32 txHash = keccak256("flagged-tx");
        
        vm.prank(user1);
        // Corrected submitTransaction: Passes 4 arguments (High risk profile: 30(Amount) + 25(Speed) = 55)
        uint16 riskScore = vigilantGuard.submitTransaction(
            txHash, 
            11 ether,   // Suspiciously high amount (30 pts)
            user2, 
            100         // Bot-like speed (25 pts)
        );

        assertTrue(riskScore >= 55, "Score should be high risk (>=55)");
        assertTrue(riskScore >= vigilantGuard.getRules().highRiskThreshold, "Transaction should be flagged");
        assertEq(vigilantGuard.totalFlagged(), 1, "Total flagged incremented");

        // Renamed variable from 'tx' to 'txn' to avoid shadowing warning
        VigilantGuard.Transaction memory txn = vigilantGuard.getTransaction(1);
        assertEq(txn.transactionHash, txHash);
        assertEq(txn.submittedBy, user1);
        assertEq(txn.isFlagged, true);
    }
    
    function testSubmitTransaction_DuplicatesPrevented() public {
        bytes32 txHash = keccak256("duplicate-tx");
        
        vm.prank(user1);
        // Corrected submitTransaction: Passes 4 arguments
        vigilantGuard.submitTransaction(txHash, 1 ether, user2, 20);
        
        assertEq(vigilantGuard.totalChecked(), 1);

        // Attempt to submit again
        vm.prank(user1);
        vm.expectRevert("Already processed");
        vigilantGuard.submitTransaction(txHash, 1 ether, user2, 20);
        
        assertEq(vigilantGuard.totalChecked(), 1, "Total checked should not increment on duplicate");
    }

    // ===================================
    // 2. Cooldown and Pattern Tests
    // ===================================

    function testFraudPattern_Blacklisting() public {
        // User is flagged 3 times -> blacklisted

        // 1st flag (Score 55)
        vm.prank(user1);
        // Corrected submitTransaction: Passes 4 arguments
        vigilantGuard.submitTransaction(keccak256("tx-1"), 11 ether, user2, 100);
        assertEq(vigilantGuard.fraudPatterns(user1).suspiciousCount, 1);
        
        // 2nd flag (Score 55 + 5 from pattern = 60)
        vm.warp(block.timestamp + 61); // Move past cooldown (60s)
        vm.prank(user1);
        // Corrected submitTransaction: Passes 4 arguments
        vigilantGuard.submitTransaction(keccak256("tx-2"), 11 ether, user2, 100);
        assertEq(vigilantGuard.fraudPatterns(user1).suspiciousCount, 2);

        // 3rd flag (Score 55 + 10 from pattern = 65) -> Blacklist Triggered
        vm.warp(block.timestamp + 61); // Move past cooldown
        // This sets up the expectation, the next line *triggers* the actual emission:
        vm.expectEmit(true, true, false, true); 
        vm.prank(user1);
        vigilantGuard.submitTransaction(keccak256("tx-3"), 11 ether, user2, 100);
        
        assertTrue(vigilantGuard.fraudPatterns(user1).isBlacklisted, "User should be blacklisted");
        
        // 4th transaction attempt fails due to blacklist modifier
        vm.prank(user1);
        vm.expectRevert("Address blacklisted");
        vigilantGuard.submitTransaction(keccak256("tx-4"), 1 ether, user2, 20);
    }

    function testFraudPattern_CooldownRisk() public {
        bytes32 txHash1 = keccak256("cooldown-tx-1");
        bytes32 txHash2 = keccak256("cooldown-tx-2");
        
        // 1st flag (Score 55)
        vm.prank(user1);
        // Corrected submitTransaction: Passes 4 arguments
        vigilantGuard.submitTransaction(txHash1, 11 ether, user2, 100); // Base risk 55
        
        // 2nd transaction immediately after (TimeSinceFlag < 60s cooldown)
        vm.prank(user1);
        // Corrected submitTransaction: Passes 4 arguments
        uint16 riskScore = vigilantGuard.submitTransaction(txHash2, 1 ether, user2, 20); // Base risk 35
        
        // Expect: 10 (low amount) + 0 (speed) + 5 (pattern) + 20 (cooldown) = 35 points
        assertEq(riskScore, 35, "Cooldown risk (20 pts) should be applied");
    }

    // ===================================
    // 3. Owner & Rule Management Tests
    // ===================================

    function testOwnerCanSetRules() public {
        // Corrected setRules: Now passes all 5 required arguments
        vm.prank(owner);
        vigilantGuard.setRules(
            200,            // _maxTypingSpeed
            0.05 ether,     // _minAmount
            75,             // _highRiskThreshold
            20 ether,       // _maxTransactionAmount
            120             // _cooldownPeriod
        );

        VigilantGuard.Rules memory newRules = vigilantGuard.getRules();
        assertEq(newRules.maxTypingSpeed, 200, "Max typing speed updated");
        assertEq(newRules.minAmount, 0.05 ether, "Min amount updated");
        assertEq(newRules.highRiskThreshold, 75, "Threshold updated");
        assertEq(newRules.maxTransactionAmount, 20 ether, "Max amount updated");
        assertEq(newRules.cooldownPeriod, 120, "Cooldown updated");
    }

    function testNonOwnerCannotSetRules() public {
        vm.prank(user1);
        vm.expectRevert("Only owner");
        // Corrected setRules: Passes all 5 required arguments
        vigilantGuard.setRules(
            200, 
            0.05 ether, 
            75, 
            20 ether, 
            120
        );
    }

    function testOwnerCanBlacklist() public {
        vm.prank(owner);
        vigilantGuard.blacklistAddress(user1);
        assertTrue(vigilantGuard.fraudPatterns(user1).isBlacklisted, "Address should be blacklisted");
    }
    
    function testOwnerCanRemoveFromBlacklist() public {
        vigilantGuard.blacklistAddress(user1);
        assertTrue(vigilantGuard.fraudPatterns(user1).isBlacklisted);

        vm.prank(owner);
        vigilantGuard.removeFromBlacklist(user1);
        assertFalse(vigilantGuard.fraudPatterns(user1).isBlacklisted, "Address should be removed from blacklist");
    }

    // ===================================
    // 4. Batch Processing Tests
    // ===================================
    
    function testBatchSubmitTransactions() public {
        // Two low-risk transactions
        bytes32[] memory hashes = new bytes32[](2);
        hashes[0] = keccak256("user2-tx-1");
        hashes[1] = keccak256("user2-tx-2");
        
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1 ether;
        amounts[1] = 2 ether;
        
        address[] memory recipients = new address[](2);
        recipients[0] = user1;
        recipients[1] = user1;
        
        uint64[] memory speeds = new uint64[](2);
        speeds[0] = 5;
        speeds[1] = 10;
        
        vm.prank(user2);
        uint16[] memory scores = vigilantGuard.batchSubmitTransactions(
            hashes, 
            amounts, 
            recipients, 
            speeds
        );
        
        assertEq(scores.length, 2, "Should return 2 scores");
        assertEq(vigilantGuard.totalChecked(), 2, "Total checked should be 2");
    }

    // ===================================
    // 5. View Function Tests
    // ===================================

    function testGetFlaggedTransactions() public {
        // 1st tx (Flagged)
        vm.prank(user1);
        vigilantGuard.submitTransaction(keccak256("tx-A"), 11 ether, user2, 100);
        
        // 2nd tx (Not Flagged)
        vm.prank(user2);
        vigilantGuard.submitTransaction(keccak256("tx-B"), 1 ether, user1, 5); 

        // 3rd tx (Flagged)
        vm.prank(user1);
        vm.warp(block.timestamp + 61); 
        vigilantGuard.submitTransaction(keccak256("tx-C"), 11 ether, user2, 100);
        
        VigilantGuard.Transaction[] memory flagged = vigilantGuard.getFlaggedTransactions();
        assertEq(flagged.length, 2, "Should return exactly 2 flagged transactions");
        assertEq(flagged[0].submittedBy, user1);
        assertEq(flagged[1].submittedBy, user1);
    }
}