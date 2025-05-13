import { ChartList } from "@/components/chart";
import { RecentSales } from "@/components/recent-sales";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetStatistic,
  useGetStatistik,
  useGetStatistikIncome,
} from "@/hooks/dashboard";
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

const Home = () => {
  const { data: homeStats } = useGetStatistic();
  const { data: statistics } = useGetStatistik();
  const { data: statisticsIncome } = useGetStatistikIncome();

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
              ...item,
            })
          )}
        >
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="tushum"
            fill="green"
            activeBar={<Rectangle fill="green" stroke="green" />}
          />
          <Bar
            dataKey="chikim"
            fill="orange"
            activeBar={<Rectangle fill="orange" stroke="orange" />}
          />
          <Bar
            dataKey="duty"
            fill="red"
            activeBar={<Rectangle fill="red" stroke="red" />}
          />
        </BarChart>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <LineChart
          width={1400}
          height={500}
          data={statisticsIncome?.data.data.map(
            (item: { date: string; duty: number }) => ({
              name: item.date,
              ...item,
            })
          )}
        >
          <XAxis dataKey="name" />
          <Tooltip formatter={(value) => `${value.toLocaleString()} so'm`} />
          <Legend />
          <Line
            type="linear"
            dataKey="duty"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};
export default Home;
