import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useGetStatistic } from "@/hooks/dashboard";
import {  Hourglass, ReceiptText, TrendingDown } from "lucide-react";

const ServiceStats = () => {
  const { data: homeStats } = useGetStatistic();

  const formatNumber = (num: number) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="p-0">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 px-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
            <Card className="text-white bg-green-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">
                  Tugallangan shartnomalar soni
                </CardTitle>
                <ReceiptText />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {homeStats?.data?.data?.usersCount}
                  <span className="pl-2 text-base">
                    Tugallangan shartnomalar soni (Xizmat miqdori)
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="text-white bg-yellow-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">
                Jarayondagi
                </CardTitle>
                <Hourglass />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {homeStats?.data?.data?.income
                    ? formatNumber(homeStats.data.data.income)
                    : 0}
                  <span className="pl-2 text-base ">
                    Jarayondagi shartnomalar soni(Xizmat miqdori),
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="text-white bg-blue-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">Umumiy</CardTitle>
                <TrendingDown className="items-center w-12 h-12 p-2 text-white rounded-lg bg-red-400/10" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {homeStats?.data?.data?.expend
                    ? formatNumber(homeStats.data.data.expend)
                    : 0}
                  <span className="pl-2 text-base">
                    Ushbu xizmat bo'yicha umumiy tushim(Xizmat miqdori)
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default ServiceStats;
