// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VigilantGuard Enhanced - Advanced Fraud Detection
 * @notice Enhanced version with real fraud scoring and BlockDAG optimization
 * @dev Optimized for BlockDAG's parallel processing capabilities
 */
contract VigilantGuard {
    
    // ============ Structs ============
    
    struct Transaction {
        bytes32 transactionHash;
        uint64 timeSubmitted;
        address submittedBy;
        uint256 amount;                // Transaction amount
        address recipient;             // Transaction recipient
        uint16 riskScore;              // Risk score (0-100)
        bool isFlagged;                // Whether transaction is flagged as suspicious
    }
    
    struct Rules {
        uint64 maxTypingSpeed;         // Max typing speed (chars/second)
        uint256 minAmount;             // Min amount to trigger checks
        uint16 highRiskThreshold;      // Score above which tx is flagged (e.g., 70)
        uint256 maxTransactionAmount;  // Max safe transaction amount
        uint64 cooldownPeriod;         // Time between transactions from same address
    }
    
    struct FraudPattern {
        uint256 suspiciousCount;       // Number of suspicious transactions
        uint64 lastFlaggedTime;        // Last time address was flagged
        bool isBlacklisted;            // Permanently blocked addresses
    }
    
    // ============ State Variables ============
    
    uint256 private lastTxId;
    mapping(uint256 => Transaction) private transactions;
    mapping(address => FraudPattern) public fraudPatterns;
    mapping(bytes32 => bool) public processedTransactions; // Prevent duplicates
    
    address public owner;
    Rules public rules;
    
    // Statistics for dashboard
    uint256 public totalFlagged;
    uint256 public totalChecked;
    
    // ============ Events ============
    
    event TransactionSubmitted(
        address indexed by,
        uint256 indexed txId,
        bytes32 transactionHash,
        uint256 amount,
        uint16 riskScore
    );
    
    event FraudDetected(
        address indexed submitter,
        bytes32 indexed transactionHash,
        uint16 riskScore,
        string reason
    );
    
    event RulesUpdated(
        address indexed by,
        uint64 timestamp
    );
    
    event AddressBlacklisted(
        address indexed suspiciousAddress,
        uint64 timestamp
    );
    
    // ============ Modifiers ============
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    modifier notBlacklisted() {
        require(!fraudPatterns[msg.sender].isBlacklisted, "Address blacklisted");
        _;
    }
    
    // ============ Constructor ============
    
    constructor(
        uint64 _maxTypingSpeed,
        uint256 _minAmount,
        uint16 _highRiskThreshold,
        uint256 _maxTransactionAmount,
        address _owner
    ) {
        require(_owner != address(0), "Invalid owner");
        require(_highRiskThreshold <= 100, "Threshold must be 0-100");
        
        owner = _owner;
        rules = Rules({
            maxTypingSpeed: _maxTypingSpeed,
            minAmount: _minAmount,
            highRiskThreshold: _highRiskThreshold,
            maxTransactionAmount: _maxTransactionAmount,
            cooldownPeriod: 60 // 60 seconds default
        });
    }
    
    // ============ Main Functions ============
    
    /**
     * @notice Submit transaction for fraud analysis with risk calculation
     * @param _transactionHash Transaction hash to analyze
     * @param _amount Transaction amount
     * @param _recipient Transaction recipient
     * @param _typingSpeed User's typing speed (for form detection)
     */
    function submitTransaction(
        bytes32 _transactionHash,
        uint256 _amount,
        address _recipient,
        uint64 _typingSpeed
    ) public notBlacklisted returns (uint16 riskScore) {
        // 🛑 FIX 1: Reinstate critical security checks
        require(!processedTransactions[_transactionHash], "Already processed");
        require(_recipient != address(0), "Invalid recipient"); 
        
        // Mark as processed
        processedTransactions[_transactionHash] = true;
        totalChecked++;
        
        // Calculate risk score
        riskScore = calculateRiskScore(
            msg.sender,
            _amount,
            _recipient,
            _typingSpeed
        );
        
        // Store transaction
        lastTxId++;
        transactions[lastTxId] = Transaction({
            transactionHash: _transactionHash,
            timeSubmitted: uint64(block.timestamp),
            submittedBy: msg.sender,
            amount: _amount,
            recipient: _recipient,
            riskScore: riskScore,
            isFlagged: riskScore >= rules.highRiskThreshold
        });
        
        // Handle high-risk transactions
        if (riskScore >= rules.highRiskThreshold) {
            _handleFraudDetection(msg.sender, _transactionHash, riskScore);
        }
        
        emit TransactionSubmitted(
            msg.sender,
            lastTxId,
            _transactionHash,
            _amount,
            riskScore
        );
        
        return riskScore;
    }
    
    /**
     * @notice Batch process multiple transactions (BlockDAG parallel processing)
     * @dev Calls submitTransaction (now public) for each entry.
     * @param _hashes Array of transaction hashes
     * @param _amounts Array of amounts
     * @param _recipients Array of recipients
     * @param _typingSpeeds Array of typing speeds
     * @return Array of risk scores
     */
    function batchSubmitTransactions(
        bytes32[] calldata _hashes,
        uint256[] calldata _amounts,
        address[] calldata _recipients,
        uint64[] calldata _typingSpeeds
    ) external notBlacklisted returns (uint16[] memory) {
        require(
            _hashes.length == _amounts.length &&
            _amounts.length == _recipients.length &&
            _recipients.length == _typingSpeeds.length,
            "Array length mismatch"
        );
        
        uint16[] memory riskScores = new uint16[](_hashes.length);
        
        // BlockDAG processes these in parallel!
        for (uint256 i = 0; i < _hashes.length; i++) {
            // Note: submitTransaction now handles the processedTransactions check
            // and the recipient check internally, simplifying this loop.
            riskScores[i] = submitTransaction(
                _hashes[i],
                _amounts[i],
                _recipients[i],
                _typingSpeeds[i]
            );
        }
        
        return riskScores;
    }
    
    /**
     * @notice Calculate risk score based on multiple factors
     * @return Risk score from 0-100
     */
    function calculateRiskScore(
        address _submitter,
        uint256 _amount,
        address _recipient,
        uint64 _typingSpeed
    ) public view returns (uint16) {
        uint16 risk = 0;
        
        // 1. Amount-based risk (0-30 points)
        if (_amount < rules.minAmount) {
            risk += 10; // Suspiciously low amount
        }
        if (_amount > rules.maxTransactionAmount) {
            risk += 30; // Suspiciously high amount
        } else if (_amount > rules.maxTransactionAmount / 2) {
            risk += 15; // Moderately high amount
        }
        
        // 2. Typing speed risk (0-25 points)
        if (_typingSpeed > rules.maxTypingSpeed) {
            risk += 25; // Bot-like typing speed
        } else if (_typingSpeed > rules.maxTypingSpeed * 80 / 100) {
            risk += 15; // Suspiciously fast
        }
        
        // 3. Pattern-based risk (0-25 points)
        FraudPattern memory pattern = fraudPatterns[_submitter];
        if (pattern.suspiciousCount > 0) {
            risk += uint16(pattern.suspiciousCount * 5); // 5 points per previous flag
            if (risk > 25) risk = 25; // Cap at 25
        }
        
        // 4. Timing-based risk (0-20 points)
        if (pattern.lastFlaggedTime > 0) {
            uint64 timeSinceFlag = uint64(block.timestamp) - pattern.lastFlaggedTime;
            if (timeSinceFlag < rules.cooldownPeriod) {
                risk += 20; // Too soon after previous flag
            }
        }
        
        // 5. Address analysis (0-10 points)
        if (_recipient == _submitter) {
            risk += 10; // Self-transactions can be suspicious
        }
        
        // Cap at 100
        if (risk > 100) risk = 100;
        
        return risk;
    }
    
    // ============ Internal Functions ============
    
    function _handleFraudDetection(
        address _submitter,
        bytes32 _txHash,
        uint16 _riskScore
    ) internal {
        totalFlagged++;
        
        FraudPattern storage pattern = fraudPatterns[_submitter];
        pattern.suspiciousCount++;
        pattern.lastFlaggedTime = uint64(block.timestamp);
        
        // Auto-blacklist after 3 flagged transactions
        if (pattern.suspiciousCount >= 3) {
            pattern.isBlacklisted = true;
            emit AddressBlacklisted(_submitter, uint64(block.timestamp));
        }
        
        emit FraudDetected(
            _submitter,
            _txHash,
            _riskScore,
            "High risk score detected"
        );
    }
    
    // ============ Owner Functions ============
    
    function setRules(
        uint64 _maxTypingSpeed,
        uint256 _minAmount,
        uint16 _highRiskThreshold,
        uint256 _maxTransactionAmount,
        uint64 _cooldownPeriod
    ) external onlyOwner {
        require(_highRiskThreshold <= 100, "Invalid threshold");
        
        rules.maxTypingSpeed = _maxTypingSpeed;
        rules.minAmount = _minAmount;
        rules.highRiskThreshold = _highRiskThreshold;
        rules.maxTransactionAmount = _maxTransactionAmount;
        rules.cooldownPeriod = _cooldownPeriod;
        
        emit RulesUpdated(msg.sender, uint64(block.timestamp));
    }
    
    function blacklistAddress(address _address) external onlyOwner {
        fraudPatterns[_address].isBlacklisted = true;
        emit AddressBlacklisted(_address, uint64(block.timestamp));
    }
    
    function removeFromBlacklist(address _address) external onlyOwner {
        fraudPatterns[_address].isBlacklisted = false;
    }
    
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid owner");
        owner = _newOwner;
    }
    
    // ============ View Functions ============
    
    function getTransaction(uint256 _txId) external view returns (Transaction memory) {
        require(_txId > 0 && _txId <= lastTxId, "Invalid ID");
        return transactions[_txId];
    }
    
    function getTransactions() external view returns (Transaction[] memory) {
        Transaction[] memory txArray = new Transaction[](lastTxId);
        for (uint256 i = 1; i <= lastTxId; i++) {
            txArray[i - 1] = transactions[i];
        }
        return txArray;
    }
    
    function getFlaggedTransactions() external view returns (Transaction[] memory) {
        // Count flagged
        uint256 flaggedCount = 0;
        for (uint256 i = 1; i <= lastTxId; i++) {
            if (transactions[i].isFlagged) flaggedCount++;
        }
        
        // Populate array
        Transaction[] memory flagged = new Transaction[](flaggedCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= lastTxId; i++) {
            if (transactions[i].isFlagged) {
                flagged[index] = transactions[i];
                index++;
            }
        }
        return flagged;
    }
    
    function getStatistics() external view returns (
        uint256 total,
        uint256 flagged,
        uint256 flagRate
    ) {
        total = totalChecked;
        flagged = totalFlagged;
        flagRate = total > 0 ? (flagged * 100) / total : 0;
    }
    
    function getRules() external view returns (Rules memory) {
        return rules;
    }
    
    function getTotalTransactions() external view returns (uint256) {
        return lastTxId;
    }
}