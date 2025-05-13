import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetStatistik, useGetStatistikIncome } from "@/hooks/dashboard";
import { DashboardCards } from "@/components/dashboard-cards";
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  Rectangle,
  Tooltip,
  XAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const { data: statistics } = useGetStatistik();
  const { data: statisticsIncome } = useGetStatistikIncome();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    searchParams.set("year", selectedYear.toString());
    setSearchParams(searchParams);
  }, [selectedYear]);

  const minYear = 2015;
  const maxYear = 2050;
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Statistika</h2>
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium">Yilni tanlang:</span>
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(Number(value))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Yil tanlang" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Umumiy malumotlar</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <DashboardCards year={selectedYear} />
        </TabsContent>
      </Tabs>
      <div className="relative mt-4 flex items-center justify-center">
        {statistics?.data.data.length === 0 && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <h2>Ma&apos;lumot topilmadi</h2>
          </div>
        )}
        <BarChart
          width={1400}
          height={500}
          data={statistics?.data.data.map(
            (item: {
              date: string;
              tushum: number;
              chikim: number;
              duty: number;
            }) => ({
              name: item.date,
              chiqim: item.chikim,
              tushum: item.tushum,
              qarzdorlik: item.duty,
            })
          )}
        >
          <XAxis dataKey="name" />
          {statistics?.data.data.length > 0 && (
            <Tooltip formatter={(value) => `${value.toLocaleString()} so'm`} />
          )}
          <Legend />
          <Bar
            dataKey="tushum"
            fill="green"
            activeBar={<Rectangle fill="green" stroke="green" />}
          />
          <Bar
            dataKey="chiqim"
            fill="orange"
            activeBar={<Rectangle fill="orange" stroke="orange" />}
          />
          <Bar
            dataKey="qarzdorlik"
            fill="red"
            activeBar={<Rectangle fill="red" stroke="red" />}
          />
        </BarChart>
      </div>
      <div className="relative mt-4 flex items-center justify-center">
        {statisticsIncome?.data.data.length === 0 && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <h2>Ma&apos;lumot topilmadi</h2>
          </div>
        )}
        <LineChart
          width={1400}
          height={500}
          data={statisticsIncome?.data.data.map(
            (item: { date: string; duty: number }) => ({
              name: item.date,
              "Kutilayotgan tushum": item.duty,
            })
          )}
        >
          <XAxis dataKey="name" />
          {statisticsIncome?.data.data.length > 0 && (
            <Tooltip formatter={(value) => `${value.toLocaleString()} so'm`} />
          )}
          <Legend />
          <Line
            type="linear"
            dataKey="Kutilayotgan tushum"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};
export default Home;
