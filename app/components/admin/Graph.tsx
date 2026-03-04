// "use client";
// import React, { useEffect, useState } from "react";
// import { TrendingUp } from "lucide-react";
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   type ChartConfig,
// } from "@/components/ui/chart";
// import { SalesTrendDay } from "@/app/types/types";

// export const description = "An area chart with gradient fill - Last 7 days";

// const chartConfig = {
//   sales: {
//     color: "#3B82F6", // what's this set to currently?
//   },
// };

// const Graph = () => {
//   const [chartData, setChartData] = useState<SalesTrendDay[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/api/admin/salesTrend");
//         const data = await res.json();
//         setChartData(data);
//       } catch (error) {
//         console.error("Error ", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const peakDay = chartData.reduce(
//     (max, d) => (d.sales > max.sales ? d : max),
//     { day: "", sales: 0 },
//   );

//   const today = new Date();
//   const monday = new Date();
//   monday.setDate(today.getDate() - 6);

//   return (
//     <Card className="  rounded-xl border border-gray-200">
//       <CardHeader>
//         <CardTitle>Sales Trend - Last 7 Days</CardTitle>
//         <CardDescription>Daily ticket sales performance</CardDescription>
//       </CardHeader>
//       <CardContent>
//         {isLoading ? (
        //   <div className="h-[420px] w-full flex items-end gap-1 px-3 pt-6 pb-2">
        //     {/* Y-axis fake lines */}
        //     <div className="absolute inset-x-3 flex flex-col justify-between h-[160px] pointer-events-none">
        //       {[...Array(4)].map((_, i) => (
        //         <div key={i} className="w-full h-px bg-gray-100" />
        //       ))}
        //     </div>
        //     {/* Bars that mimic area chart wave */}
        //     {[40, 65, 50, 80, 60, 90, 70].map((height, i) => (
        //       <div key={i} className="flex-1 flex flex-col items-center gap-2">
        //         <div
        //           className="w-full rounded-sm bg-blue-100 animate-pulse"
        //           style={{ height: `${height}%` }}
        //         />
        //         <div className="h-2 w-6 bg-gray-100 rounded animate-pulse" />
        //       </div>
        //     ))}
        //   </div>
//         ) : chartData.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-[400px] gap-3">
//             <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
//               <TrendingUp className="w-6 h-6 text-blue-400" />
//             </div>
//             <p className="text-sm font-semibold text-gray-700">
//               No sales data yet
//             </p>
//             <p className="text-xs text-gray-400">
//               Sales trend will appear once tickets are sold
//             </p>
//           </div>
//         ) : (
        //   <div className="h-[340px] w-full">
        //     <ChartContainer
        //       config={chartConfig}
        //       className="min-h-[340px] w-full"
        //     >
        //       <AreaChart
        //         data={chartData}
        //         margin={{ top: 20, right: 30, left: 12, bottom: 12 }}
        //       >
        //         <CartesianGrid vertical={false} strokeDasharray="3 3" />

        //         <XAxis
        //           dataKey="day"
        //           tickLine={false}
        //           axisLine={false}
        //           tickMargin={10}
        //         />

        //         <YAxis tickLine={false} axisLine={false} tickMargin={10} />

        //         <ChartTooltip
        //           content={
        //             <ChartTooltipContent className="bg-white border border-gray-200" />
        //           }
        //         />

        //         <defs>
        //           <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
        //             <stop
        //               offset="5%"
        //               stopColor="var(--color-sales)"
        //               stopOpacity={0.85}
        //             />
        //             <stop
        //               offset="95%"
        //               stopColor="var(--color-sales)"
        //               stopOpacity={0.15}
        //             />
        //           </linearGradient>
        //         </defs>

        //         <Area
        //           dataKey="sales"
        //           type="monotone"
        //           fill="url(#fillSales)"
        //           stroke="var(--color-sales)"
        //           strokeWidth={3.5}
        //         />
        //       </AreaChart>
        //     </ChartContainer>
//           </div>
//         )}
//       </CardContent>
    //   <CardFooter>
    //     <div className="flex w-full items-start gap-2 text-sm">
    //       <div className="grid gap-2">
    //         <div className="flex items-center gap-2 leading-none font-medium">
    //           Weekend peak: {peakDay.day} with {peakDay.sales.toLocaleString()}{" "}
    //           tickets <TrendingUp className="h-4 w-4" />
    //         </div>
    //         <div className="text-muted-foreground flex items-center gap-2 leading-none">
    //           {monday.toLocaleDateString("en-US", {
    //             month: "short",
    //             day: "numeric",
    //           })}{" "}
    //           -{" "}
    //           {today.toLocaleDateString("en-US", {
    //             month: "short",
    //             day: "numeric",
    //           })}
    //           , {today.getFullYear()}
    //         </div>
    //       </div>
    //     </div>
    //   </CardFooter>
//     </Card>
//   );
// };

// export default Graph;
