import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetStatistik } from "@/hooks/dashboard";

export function ChartList() {
  const chartConfig = {} satisfies ChartConfig;
  const { data } = useGetStatistik();
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <BarChart accessibilityLayer data={data?.data?.data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={5}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="tushum" fill="#4CAF50" radius={4} />
        <Bar dataKey="chikim" fill="#DC2626" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
