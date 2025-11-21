# VigilantGuard

**A BlockDAG-native fraud detection system** powered by **Solidity smart contracts**, **on-chain ML inference**, and **behavioral biometrics** — delivering **real-time, trustless fraud prevention** in the Web3 era.

## Introduction

**VigilantGuard** is a **fully decentralized fraud detection layer** built on **BlockDAG** — a high-throughput, EVM-compatible Layer 1 blockchain — using **Solidity 0.8.x**. It combines:

- **On-chain risk scoring** via verifiable EVM smart contracts
- **Real-time behavioral biometrics** in the browser
- **EVM-optimized ML models** for pattern detection
- **Next.js + pnpm** frontend for seamless dApp integration

All fraud signals are computed **on-chain**, verified via **EVM execution and BlockDAG’s sub-second finality**, and enforced **without trusted third parties**.

---

## Goals & Objectives

| Goal                          | How We Achieve It                                         |
| ----------------------------- | --------------------------------------------------------- |
| **Detect Fraud in Real-Time** | Parallel on-chain transaction + behavior analysis         |
| **Adapt to New Threats**      | Model weights updated via governance + on-chain training  |
| **Zero False Positives**      | Multi-signal fusion: tx pattern + biometrics + reputation |

---

## Tech Stack

### BlockDAG & Solidity

- **Solidity 0.8.x** smart contracts for risk engine
- **On-chain anomaly detection** using fixed-point math (PRBMath)
- **Parallel execution & sub-second finality** via BlockDAG consensus

### Machine Learning

- **Lightweight models** (decision trees → Solidity via Huff/Yul)
- **Federated updates** from user devices (privacy-preserving)

### Behavioral Biometrics

- **Keystroke, mouse, touch, and timing patterns**
- **Session entropy scoring** in-browser (WebAssembly)

### Frontend & DevOps

| Layer               | Tech                                                                              |
| ------------------- | --------------------------------------------------------------------------------- | ----------------------------------- |
| **Framework**       | [Next.js](https://nextjs.org) (App Router)                                        |
| **Package Manager** | [pnpm](https://pnpm.io) (workspaces)                                              |
| **Wallet**          | [MetaMask](https://metamask.io) / [Phantom](https://phantom.app) / Any EVM Wallet |
| **Deployment**      | Vercel                                                                            | (https://vigilantguard.vercel.app/) |

---

## Functional Requirements

### Real-Time Risk Engine (On-Chain)

> **Core logic runs in Solidity smart contracts deployed on BlockDAG.**  
> Risk assessment fuses transaction patterns, behavioral biometrics, and user reputation — all computed on-chain with EVM precision and BlockDAG parallel execution.

---

## Security & Trustlessness

- **No oracles** — all inputs on-chain or user-signed
- **EVM replayability + BlockDAG finality** = provable execution
- **Upgradable via OpenZeppelin proxy** (governance-minimized)

---

## Development & Contribution

```bash
git clone https://github.com/Sidney-130/vigilantguard.git
cd vigilantguard
pnpm install

# Run frontend
pnpm dev

# Deploy to BlockDAG (Hardhat)
pnpm hardhat run scripts/deploy.ts --network blockdag
```
