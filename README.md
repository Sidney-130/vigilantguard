# VigilantGuard

**A Starknet-native fraud detection system** powered by **Cairo smart contracts**, **on-chain ML inference**, and **behavioral biometrics** — delivering **real-time, trustless fraud prevention** in the Web3 era.


## 🚀 Introduction

**VigilantGuard** is a **fully decentralized fraud detection layer** built on **Starknet** using **Cairo 1.0**. It combines:

- **On-chain risk scoring** via provable Cairo contracts
- **Real-time behavioral biometrics** in the browser
- **ZK-friendly ML models** for pattern detection
- **Next.js + pnpm** frontend for seamless dApp integration

All fraud signals are computed **on-chain**, verified via **STARK proofs**, and enforced **without trusted third parties**.

---

## 🎯 Goals & Objectives

| Goal                        | How We Achieve It |
|---------------------------|-------------------|
| **Detect Fraud in Real-Time** | On-chain transaction + behavior analysis |
| **Adapt to New Threats**     | Model weights updated via governance + on-chain training |
| **Zero False Positives**     | Multi-signal fusion: tx pattern + biometrics + reputation |

---

## 🛠 Tech Stack

### Starknet & Cairo
- **Cairo 1.0** smart contracts for risk engine
- **On-chain anomaly detection** using fixed-point math
- **Provable execution** via STARKs

### Machine Learning
- **Lightweight models** (decision trees → Cairo conversion)
- **Federated updates** from user devices (privacy-preserving)

### Behavioral Biometrics
- **Keystroke, mouse, touch, and timing patterns**
- **Session entropy scoring** in-browser (WebAssembly)

### Frontend & DevOps
| Layer       | Tech |
|------------|------|
| **Framework** | [Next.js](https://nextjs.org) (App Router) |
| **Package Manager** | [pnpm](https://pnpm.io) (workspaces) |
| **Wallet** | [Argent X](https://www.argent.xyz) / [Braavos](https://braavos.app) |
| **Deployment** | Vercel | (https://vigilantguard.vercel.app/)

---

## ✅ Functional Requirements

### Real-Time Risk Engine (On-Chain)
```cairo
