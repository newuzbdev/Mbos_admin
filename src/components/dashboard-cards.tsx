import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetStatistic } from "@/hooks/dashboard";
import { FileText, TrendingDown, TrendingUp, Users } from "lucide-react";

interface DashboardCardsProps {
  year?: number;
}

export const DashboardCards = ({ year }: DashboardCardsProps) => {
  const { data: homeStats } = useGetStatistic(year);

  const formatNumber = (num: number) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dark:text-white dark:bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="text-2xl font-bold dark:text-white">
              {homeStats?.data?.data?.usersCount}
            </div>
            <Users className="items-center w-12 h-12 p-2 border rounded-lg" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-medium">Mijozlar</CardTitle>
          </CardContent>
        </Card>
        <Card className="text-white bg-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="text-2xl font-bold">
              {homeStats?.data?.data?.income
                ? formatNumber(homeStats.data.data.income)
                : 0}
            </div>
            <TrendingUp className="items-center w-12 h-12 p-2 rounded-lg bg-emerald-400/10" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-medium">Daromadlar</CardTitle>
          </CardContent>
        </Card>
        <Card className="text-white bg-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="text-2xl font-bold">
              {homeStats?.data?.data?.confirm
                ? formatNumber(homeStats.data.data.confirm)
                : 0}
            </div>
            <TrendingDown className="items-center w-12 h-12 p-2 text-white rounded-lg bg-red-400/10" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-medium">Chiqimlar</CardTitle>
          </CardContent>
        </Card>
        <Card className="text-white bg-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="text-2xl font-bold">
              {homeStats?.data?.data?.duty
                ? formatNumber(homeStats.data.data.duty)
                : 0}
            </div>
            <TrendingDown className="items-center w-12 h-12 p-2 text-white rounded-lg bg-yellow-400/10" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-medium">Qarzlar</CardTitle>
          </CardContent>
        </Card>
        <Card className="text-white bg-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="text-2xl font-bold">
              {homeStats?.data?.data?.contractCount || 0}
            </div>
            <FileText className="items-center w-12 h-12 p-2 text-white rounded-lg bg-blue-400/10" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-medium">Shartnomalar</CardTitle>
          </CardContent>
        </Card>
        <Card className="text-white bg-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="text-2xl font-bold">
              {homeStats?.data?.data?.activeMonth?.income
                ? formatNumber(homeStats.data.data.activeMonth.income)
                : 0}
            </div>
            <TrendingUp className="items-center w-12 h-12 p-2 text-white rounded-lg bg-green-400/10" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-medium">
              {currentMonth}dagi daromadlar
            </CardTitle>
          </CardContent>
        </Card>
        <Card className="text-white bg-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="text-2xl font-bold">
              {homeStats?.data?.data?.activeMonth?.confirm
                ? formatNumber(homeStats.data.data.activeMonth.confirm)
                : 0}
            </div>
            <TrendingUp className="items-center w-12 h-12 p-2 text-white rounded-lg bg-purple-400/10" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-medium">
              {currentMonth}dagi chiqimlar
            </CardTitle>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
