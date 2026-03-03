"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { SalesTrendDay } from "@/app/types/types";

export const description = "An area chart with gradient fill - Last 7 days";

const chartConfig = {
  sales: {
    color: "#3B82F6", // what's this set to currently?
  },
};

const Graph = () => {
  const [chartData, setChartData] = useState<SalesTrendDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/salesTrend");
        const data = await res.json();
        setChartData(data);
      } catch (error) {
        console.error("Error ", error);
      } finally {
        setIsLoading(false);
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

  return (
    <Card className="text-gray-800 bg-white rounded-xl border border-gray-200">
      <CardHeader>
        <CardTitle>Sales Trend - Last 7 Days</CardTitle>
        <CardDescription>Daily ticket sales performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="bg-white" />}
            />
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="sales"
              type="monotone"
              fill="url(#fillSales)"
              fillOpacity={0.4}
              stroke="var(--color-sales)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Weekend peak: {peakDay.day} with {peakDay.sales.toLocaleString()}{" "}
              tickets <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {monday.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {today.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
              , {today.getFullYear()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Graph;
