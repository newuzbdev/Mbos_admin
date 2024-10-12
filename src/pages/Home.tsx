import { ChartList } from "@/components/chart";
import { RecentSales } from "@/components/recent-sales";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetStatistic } from "@/hooks/dashboard";
import { TrendingDown, TrendingUp, Users } from "lucide-react";

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
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Mijozlar</CardTitle>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Income Count
                </CardTitle>
                <TrendingUp className="items-center w-12 h-12 p-2 rounded-lg bg-emerald-400/10 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {homeStats?.data?.data?.income
                    ? formatNumber(homeStats.data.data.income)
                    : ""}
                  <span className="pl-2 text-base text-muted-foreground">
                    Daromadlar
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Expend Count
                </CardTitle>
                <TrendingDown className="items-center w-12 h-12 p-2 text-red-500 rounded-lg bg-red-400/10" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {homeStats?.data?.data?.expend
                    ? formatNumber(homeStats.data.data.expend)
                    : ""}
                  <span className="pl-2 text-base text-muted-foreground">
                    Chiqimlar
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>So'ngi sotuvlar</CardTitle>
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
    </div>
  );
};
export default Home;
