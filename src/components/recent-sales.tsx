import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetStatistic } from "@/hooks/dashboard";
 import { RecentSale } from "@/types/contract";
import { Banknote } from "lucide-react";

export function RecentSales() {
  const { data: homeStats } = useGetStatistic();
  const formatNumber = (num: number) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="space-y-8">
      {homeStats?.data.data.recentContract?.map(
        (contract: RecentSale, index: number) => (
          <div key={contract.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/avatars/0${index + 2}.png`} alt="Avatar" />
              <AvatarFallback>CT</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              {/* <p className="text-sm font-medium leading-none">Contract {contract.id}</p> */}
              <p className="text-sm text-muted-foreground">
                Sanasi: {contract.sana}
              </p>
              <p className="text-sm">
                Mijoz ismi: <span className="text-base">{contract.user.F_I_O.charAt(0).toUpperCase() +
                  contract.user.F_I_O.slice(1)}</span>
              </p>
            </div>
            <div className="flex gap-2 ml-auto font-medium">
              <Banknote />
              {formatNumber(Number(contract.service.price))} so'm
            </div>
          </div>
        )
      )}
    </div>
  );
}
