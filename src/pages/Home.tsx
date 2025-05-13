import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Home = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

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
          <span className="text-sm font-medium">Yil:</span>
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
      <div className="flex items-center justify-center mt-4">
        <BarChart width={1400} height={500} data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="pv"
            fill="green"
            activeBar={<Rectangle fill="green" stroke="green" />}
          />
          <Bar
            dataKey="uv"
            fill="red"
            activeBar={<Rectangle fill="red" stroke="red" />}
          />
          <Bar
            dataKey="uv"
            fill="yellow"
            activeBar={<Rectangle fill="yellow" stroke="yellow" />}
          />
        </BarChart>
      </div>
      <div className="flex items-center justify-center mt-4">
        <LineChart width={1400} height={500} data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};
export default Home;
