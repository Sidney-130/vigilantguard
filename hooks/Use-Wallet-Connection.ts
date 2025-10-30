// "use client";

// import { useState, useEffect } from "react";
// import { connect, disconnect } from "starknetkit";

// interface Wallet {
//   id: string;
//   name: string;
//   icon: string;
// }

// export function useWalletConnection() {
//   const [address, setAddress] = useState<string | null>(null);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [availableWallets] = useState<Wallet[]>([
//     { id: "braavos", name: "Braavos Wallet", icon: "🛡️" },
//     { id: "argentX", name: "Argent X", icon: "🔐" },
//   ]);

//   useEffect(() => {
//     const checkConnection = async () => {
//       try {
//         const storedAddress = localStorage.getItem("starknet_address");
//         if (storedAddress) {
//           setAddress(storedAddress);
//         }
//       } catch (error) {
//         console.error("Error checking connection:", error);
//       }
//     };

//     checkConnection();
//   }, []);

//   const connect_wallet = async (walletId: string) => {
//     setIsConnecting(true);
//     try {
//       const connection = await connect({
//         modalMode: "neverShowModal",
//         connectors: [
//           {
//             id: walletId,
//           },
//         ],
//       });

//       if (connection && connection.address) {
//         setAddress(connection.address);
//         localStorage.setItem("starknet_address", connection.address);
//         console.log(`Connected to ${walletId}: ${connection.address}`);
//       }
//     } catch (error) {
//       console.error("Connection failed:", error);
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const disconnect_wallet = async () => {
//     try {
//       await disconnect();
//       setAddress(null);
//       localStorage.removeItem("starknet_address");
//     } catch (error) {
//       console.error("Disconnection failed:", error);
//     }
//   };

//   return {
//     address,
//     connect: connect_wallet,
//     disconnect: disconnect_wallet,
//     isConnecting,
//     availableWallets,
//   };
// }
