// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// const data = [
//   { date: "Oct 23", Total: 15, Flagged: 1 },
//   { date: "Oct 24", Total: 21, Flagged: 2 },
//   { date: "Oct 25", Total: 14, Flagged: 0 },
//   { date: "Oct 26", Total: 21, Flagged: 1 },
//   { date: "Oct 27", Total: 24, Flagged: 2 },
//   { date: "Oct 28", Total: 18, Flagged: 1 },
//   { date: "Oct 29", Total: 25, Flagged: 2 },
// ];

// export default function TransactionVolume() {
//   return (
//     <div className="w-full p-6 bg-white rounded-lg shadow-sm">
//       <h2 className="text-xl font-semibold mb-4">Transaction Volume</h2>
//       <div className="w-full h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis
//               dataKey="date"
//               tick={{ fill: "#6B7280" }}
//               tickLine={false}
//               axisLine={{ stroke: "#E5E7EB" }}
//             />
//             <YAxis
//               tick={{ fill: "#6B7280" }}
//               tickLine={false}
//               axisLine={{ stroke: "#E5E7EB" }}
//               tickFormatter={(value) => `${value}`}
//             />
//             <Bar
//               dataKey="Total"
//               fill="#3B82F6"
//               radius={[4, 4, 0, 0]}
//               maxBarSize={40}
//             />
//             <Bar
//               dataKey="Flagged"
//               fill="#EF4444"
//               radius={[4, 4, 0, 0]}
//               maxBarSize={40}
//             />
//             <Legend
//               wrapperStyle={{
//                 paddingTop: "20px",
//               }}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }
