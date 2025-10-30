// import { Metric } from "./types";

// export default function MetricCard({
//   title,
//   value,
//   change,
//   changeColor,
//   icon: Icon,
// }: Metric) {
//   return (
//     <div className="p-4 border rounded-xl shadow-sm bg-white flex items-start justify-between w-full">
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <h2 className="text-2xl font-semibold mt-1">{value}</h2>
//         <p
//           className={`text-sm mt-1 ${
//             changeColor === "green" ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {change}
//         </p>
//       </div>
//       <div className="bg-gray-100 p-2 rounded-md">
//         <Icon className="w-6 h-6" />
//       </div>
//     </div>
//   );
// }
