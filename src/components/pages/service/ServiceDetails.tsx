import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon } from "lucide-react";
import { formatNumber } from "@/components/formNumber";
import { DeleteItem } from "./functions/delete";
import { UpdateItem } from "./functions/update";
import { useGetService } from "@/hooks/useService";
import ServiceStats from "./ServiceStats";
import { IService } from "@/types/service";
import { useGetGetAdmin } from "@/hooks/useAdmin";

export default function ServiceDetails() {
  const { id } = useParams();
  const { data: serviceData, isLoading } = useGetService(id!);
  const service = serviceData?.data?.data as IService;

  const { data: createAdmin } = useGetGetAdmin(Number(service?.whoCreated));
  const { data: updateAdmin } = useGetGetAdmin(Number(service?.whoUpdated));

  if (isLoading) return <div>Yuklanmoqda...</div>;

  return (
    <div className="container p-0 mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-blue-800">
          <div className="flex justify-between">
            <CardTitle className="text-2xl font-bold text-white">
              Service / Product
            </CardTitle>
            <div className="flex justify-end space-x-2">
              <UpdateItem service={service} />
              <DeleteItem />
            </div>
          </div>
        </CardHeader>
        <ServiceStats />
        <CardContent className="p-6 ">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-1">
            <DetailSection
              icon={<CreditCardIcon className="w-5 h-5 text-green-600" />}
              title="Moliyaviy tafsilotlar"
            >
              <DetailItem
                label="Narx"
                value={formatNumber(service?.price) + " s'om"}
              />
              <DetailItem label="xizmat nomi" value={service?.title} />
              <DetailItem label="xizmat turi" value={service?.serviceType} />
              <DetailItem label="Dona" value={service?.birliklar} />
              <DetailItem
                label="kim yaratdi"
                value={createAdmin?.data.data.user_name}
              />
              <DetailItem
                label="kim o'zgartirdi"
                value={updateAdmin?.data.data.user_name}
              />
            </DetailSection>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        {icon}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
          {title}
        </span>
      </h3>
      <div className="p-4 space-y-2 overflow-auto rounded-lg shadow-inner bg-gray-50 dark:bg-gray-800 max-h-72">
        {children}
      </div>
    </div>
  );
}
function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-gray-200 last:border-b-0">
      <span className="font-medium dark:text-gray-300">{label}:</span>
      <span className="font-semibold dark:text-gray-300">{value || "N/A"}</span>
    </div>
  );
}
