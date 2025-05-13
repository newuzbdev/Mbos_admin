import { ChartList } from "@/components/chart";
import { RecentSales } from "@/components/recent-sales";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetStatistic } from "@/hooks/dashboard";
import { TrendingDown, TrendingUp, Users } from "lucide-react";
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
  const { data: homeStats } = useGetStatistic();

  const formatNumber = (num: number) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Statistika</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Umumiy malumotlar</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="dark:text-white dark:bg-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">Mijozlar</CardTitle>
                <Users className="items-center w-12 h-12 p-2 border rounded-lg" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {homeStats?.data?.data?.usersCount}
                  <span className="pl-2 text-base text-muted-foreground">
                    Mavjud mijozlar soni
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="text-white bg-primary">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">
                  Daromadlar
                </CardTitle>
                <TrendingUp className="items-center w-12 h-12 p-2 rounded-lg bg-emerald-400/10" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {homeStats?.data?.data?.income
                    ? formatNumber(homeStats.data.data.income)
                    : 0}
                  <span className="pl-2 text-base ">Daromadlar</span>
                </div>
              </CardContent>
            </Card>
            <Card className="text-white bg-red-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">Chiqimlar</CardTitle>
                <TrendingDown className="items-center w-12 h-12 p-2 text-white rounded-lg bg-red-400/10" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {homeStats?.data?.data?.expend
                    ? formatNumber(homeStats.data.data.expend)
                    : 0}
                  <span className="pl-2 text-base">Chiqimlar</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>So'ngi 5ta sotuvlar</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-4">
              <ChartList />
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-4 flex items-center justify-center">
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
      <div className="mt-4 flex items-center justify-center">
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
