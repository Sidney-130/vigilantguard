// script/Deploy.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {console} from "forge-std/console.sol"; 
import {VigilantGuard} from "src/VigilantGuard.sol"; 

contract DeployVigilantGuard is Script {
    
        //Added return type to easily capture the deployed contract address
    function run() external returns (VigilantGuard) {
        // Get deployer private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("============================================================"); // 60 equals signs
        console.log("Deploying VigilantGuard Contract (Enhanced Logic)");
        console.log("============================================================"); // 60 equals signs
        console.log("Deployer:", deployer);
        
        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);
        
        // Define initial constructor arguments
        uint64 maxTypingSpeed = 100;    // 100 chars/second
        uint256 minAmount = 0.01 ether; // 0.01 ETH
        uint16 highRiskThreshold = 70;  // 70/100
        uint256 maxTransactionAmount = 10 ether; // 10 ETH
        
        // ============ Deploy VigilantGuard (formerly Enhanced) ============
        VigilantGuard deployedContract = new VigilantGuard(
            maxTypingSpeed,
            minAmount,
            highRiskThreshold,
            maxTransactionAmount,
            deployer // owner
        );
        
        vm.stopBroadcast();
        
        // ============ Logging and Verification Info ============
        
        console.log("Deployed Contract Address:", address(deployedContract));
        
        // Check contract rules via view functions (Ensures deployment worked)
        VigilantGuard.Rules memory currentRules = deployedContract.rules();
        
        console.log("");
        console.log("Contract Verification:");
        console.log("  Owner:", deployedContract.owner());
        console.log("  High Risk Threshold:", currentRules.highRiskThreshold);
        console.log("  Max Transaction Amount:", currentRules.maxTransactionAmount / 1 ether, "ETH");
        
        // ============ Save Deployment Info ============
        
        string memory deploymentInfo = string.concat(
            "# VigilantGuard Deployment\n\n",
            "## Network\n",
            "Chain ID: ", vm.toString(block.chainid), "\n",
            "Block: ", vm.toString(block.number), "\n",
            "Timestamp: ", vm.toString(block.timestamp), "\n\n",
            "## Deployer\n",
            "Address: ", vm.toString(deployer), "\n\n",
            "## Contract Address\n",
            "VigilantGuard: ", vm.toString(address(deployedContract)), "\n\n",
            "## Frontend Config\n",
            "```\n",
            "NEXT_PUBLIC_VIGILANT_GUARD_ADDRESS=", vm.toString(address(deployedContract)), "\n",
            "```\n"
        );
        
        vm.writeFile("deployment-info.md", deploymentInfo);
        console.log("");
        console.log("DEPLOYMENT SUCCESSFUL!");
        console.log("Deployment info saved to: deployment-info.md");
        console.log("============================================================"); // 60 equals signs
        
        return deployedContract;
    }
}
