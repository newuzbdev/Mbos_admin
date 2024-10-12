import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetStatistik } from "@/hooks/dashboard";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function ChartList() {
  const chartConfig = {} satisfies ChartConfig;

  // Your complete data
  const { data } = useGetStatistik();
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Transform the data to reflect the current year for future dates
  const transformedData = data?.data?.data.map((item: any) => {
    const [year, month] = item.date.split("-");
    const updatedYear = parseInt(year) > currentYear ? currentYear : year; // Set to current year if greater
    return { ...item, date: `${updatedYear}-${month}` };
  });

  // State for the current offset
  const [offset, setOffset] = useState(0);
  const limit = 6; // Maximum number of bars to display

  // Calculate the data to display
  const displayedData = transformedData?.slice(offset, offset + limit);

  const handleNext = () => {
    if (offset + limit < transformedData?.length) {
      setOffset((prev) => prev + limit);
    }
  };

  const handlePrev = () => {
    if (offset - limit >= 0) {
      setOffset((prev) => prev - limit);
    }
  };

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart accessibilityLayer data={displayedData} barCategoryGap={10}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={5}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="tushum" fill="#77CDFF" radius={4} barSize={30} />
          <Bar dataKey="chikim" fill="#FF8A8A" radius={4} barSize={30} />
        </BarChart>
      </ChartContainer>

      <div className="flex justify-between mt-4">
        <Button onClick={handlePrev} variant="ghost" disabled={offset === 0}>
          <ArrowLeft />
        </Button>
        <Button
          onClick={handleNext}
          variant="ghost"
          disabled={offset + limit >= transformedData?.length}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
