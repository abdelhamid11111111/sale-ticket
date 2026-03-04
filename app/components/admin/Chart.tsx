"use client";
import { useEffect, useState } from "react";
import { TrendingUp, BarChart2 } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../components/ui/chart";

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#0ea5e9",
  },
} satisfies ChartConfig;

type DayData = {
  day: string;
  sales: number;
};

const FIXED_HEIGHT = "h-[400px]";

export function ChartAreaLegend() {
  const [chartData, setChartData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/salesTrend");
        const data = await res.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching sales trend:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const peakDay = chartData.reduce(
    (max, d) => (d.sales > max.sales ? d : max),
    { day: "", sales: 0 },
  );

  const today = new Date();
  const monday = new Date();
  monday.setDate(today.getDate() - 6);

  const isEmpty = !loading && chartData.every((d) => d.sales === 0);

  return (
    <Card className="rounded-xl border border-gray-200 w-full">
      <CardHeader>
        <CardTitle>Sales Trend - Last 7 Days</CardTitle>
        <CardDescription>Daily ticket sales performance</CardDescription>
      </CardHeader>

      <CardContent className="px-4">
        {/* LOADING SKELETON — matches chart layout */}
        {loading && (
          <div
            className={`${FIXED_HEIGHT} w-full flex gap-3 items-end px-2 pb-6 pt-4 relative`}
          >
            {/* Y-axis skeleton */}
            <div className="flex flex-col justify-between h-full pb-4 gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-6 bg-slate-200 rounded animate-pulse"
                />
              ))}
            </div>
            {/* Bars skeleton with wave shape */}
            <div className="flex-1 flex flex-col justify-between h-full">
              {/* Horizontal grid lines */}
              <div className="absolute inset-x-12 flex flex-col justify-between h-[260px] top-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-px bg-slate-100" />
                ))}
              </div>
              {/* Simulated area wave */}
              <div className="flex items-end gap-1 h-[260px] mt-auto">
                {[40, 70, 55, 85, 45, 90, 60].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-full rounded-t-sm bg-sky-100 animate-pulse"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
              {/* X-axis labels skeleton */}
              <div className="flex gap-1 mt-3">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="flex-1 flex justify-center">
                    <div className="h-3 w-6 bg-slate-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {isEmpty && (
          <div
            className={`${FIXED_HEIGHT} w-full flex flex-col items-center justify-center gap-3`}
          >
            <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center">
              <BarChart2 className="w-7 h-7 text-sky-400" />
            </div>
            <p className="text-sm font-semibold text-gray-700">
              No sales this week
            </p>
            <p className="text-xs text-gray-400 text-center max-w-[200px]">
              Sales data will appear here once tickets are purchased
            </p>
          </div>
        )}

        {/* CHART */}
        {!loading && !isEmpty && (
          <div className={`${FIXED_HEIGHT} w-full`}>
            <ChartContainer config={chartConfig} className="h-full w-full">
              <AreaChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 12, bottom: 12 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={16}
                  tickCount={5}
                  allowDecimals={false}
                  domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.3)]}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent className="bg-white border border-gray-200" />
                  }
                />
                <defs>
                  <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-sales)"
                      stopOpacity={0.85}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-sales)"
                      stopOpacity={0.15}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="sales"
                  type="monotone"
                  fill="url(#fillSales)"
                  stroke="var(--color-sales)"
                  strokeWidth={3.5}
                  baseValue={0}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {loading ? (
                <div className="h-3 w-48 bg-slate-200 rounded animate-pulse" />
              ) : isEmpty ? (
                "No peak day yet"
              ) : (
                <>
                  Peak: {peakDay.day} with {peakDay.sales.toLocaleString()}{" "}
                  tickets
                  <TrendingUp className="h-4 w-4" />
                </>
              )}
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {loading ? (
                <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
              ) : (
                <>
                  {monday.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  {" - "}
                  {today.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  {", "}
                  {today.getFullYear()}
                </>
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
