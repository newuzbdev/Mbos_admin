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
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const { data: statistics } = useGetStatistik();
  const { data: statisticsIncome } = useGetStatistikIncome();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const statisticsData = useMemo(() => {
    return [
      {
        date: "01",
        tushum: 0,
        chikim: 0,
        duty: 0,
      },
      {
        date: "02",
        tushum: 0,
        chikim: 0,
        duty: 0,
      },
      {
        date: "03",
        tushum: 0,
        chikim: 0,
        duty: 0,
      },
      {
        date: "04",
        tushum: 0,
        chikim: 0,
        duty: 0,
      },
      {
        date: "05",
        tushum: 0,
        chikim: 0,
        duty: 0,
      },
      {
        date: "06",
        tushum: 0,
        chikim: 0,
        duty: 0,
      },
      {
        date: "07",
        tushum: 0,
        chikim: 0,
        duty: 0,
      },
      {
        date: "08",
        tushum: 0,
        chikim: 0,
        duty: 0,
      },
      {
        date: "09",
        tushum: 0,
        chikim: 0,
        duty: 0,
      },
      {
        date: "10",
        tushum: 0,
        chikim: 0,
        duty: 0,
      },
      {
        date: "11",
        tushum: 0,
        chikim: 0,
        duty: 0,
      },
      {
        date: "12",
        tushum: 0,
        chikim: 0,
        duty: 0,
      },
    ].map((item) =>
      statistics?.data.data.find(
        (stat: { date: string }) => stat.date.split("-")[1] === item.date
      )
        ? statistics?.data.data.find(
            (stat: { date: string }) => stat.date.split("-")[1] === item.date
          )
        : item
    );
  }, [statistics]);

  const lastIncomeMonth = useMemo(() => {
    return statisticsIncome?.data.data.at(-1);
  }, [statisticsIncome]);

  const statisticsIncomeData = useMemo(() => {
    return [
      {
        date: "01",
        duty: 0,
      },
      {
        date: "02",
        duty: 0,
      },
      {
        date: "03",
        duty: 0,
      },
      {
        date: "04",
        duty: 0,
      },
      {
        date: "05",
        duty: 0,
      },
      {
        date: "06",
        duty: 0,
      },
      {
        date: "07",
        duty: 0,
      },
      {
        date: "08",
        duty: 0,
      },
      {
        date: "09",
        duty: 0,
      },
      {
        date: "10",
        duty: 0,
      },
      {
        date: "11",
        duty: 0,
      },
      {
        date: "12",
        duty: 0,
      },
    ]
      .map((item) =>
        statisticsIncome?.data.data.find(
          (stat: { date: string }) => stat.date === item.date
        )
          ? statisticsIncome?.data.data.find(
              (stat: { date: string }) => stat.date === item.date
            )
          : item
      )
      .map((item) =>
        +item.date > +lastIncomeMonth?.date
          ? { ...item, duty: lastIncomeMonth?.duty }
          : item
      );
  }, [statisticsIncome, lastIncomeMonth]);

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
          data={statisticsData.map(
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
          data={statisticsIncomeData.map(
            (item: { date: string; duty: number }) => ({
              name: item.date,
              "Kutilayotgan tushum": item.duty,
            })
          )}
        >
          <XAxis dataKey="name" />
          {statisticsIncomeData.length > 0 && (
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
