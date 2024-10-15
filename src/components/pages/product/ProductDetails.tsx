import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon, FileTextIcon } from "lucide-react";
import { formatNumber } from "@/components/formNumber";
import { DeleteItem } from "./functions/delete";
import { UpdateItem } from "./functions/update";
import { useGetService } from "@/hooks/useService";
import { Contract } from "@/types/contract";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: serviceData, isLoading } = useGetService(id!);

  if (isLoading) return <div>Yuklanmoqda...</div>;

  const service = serviceData?.data?.data;

  return (
    <div className="container px-4 py-8 mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-blue-800">
          <CardTitle className="text-2xl font-bold text-white">
            Service malumotlari
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <DetailSection
              icon={<CreditCardIcon className="w-5 h-5 text-green-600" />}
              title="Moliyaviy tafsilotlar"
            >
              <DetailItem
                label="Narx"
                value={formatNumber(service?.price) + " s'om"}
              />
              <DetailItem
                label="xizmat nomi"
                value={formatNumber(service?.title)}
              />
              <DetailItem
                label="xizmat turi"
                value={formatNumber(service?.serviceType)}
              />
            </DetailSection>

            <DetailSection
              icon={<FileTextIcon className="w-5 h-5 text-purple-600" />}
              title="Shartnomalar ro'yxati"
            >
              {!service?.shartnoma && (
                <p className="text-center">contractlar royxati</p>
              )}
              {service?.shartnoma.map((el: Contract) => (
                <DetailItem
                  key={el.id}
                  label="shartnoma_id"
                  value={el?.shartnoma_id}
                />
              ))}
            </DetailSection>
          </div>
          <div>
            <div className="space-x-2 flex justify-end pt-5">
              <UpdateItem service={service} />
              <DeleteItem />
            </div>
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
      <div className="p-4 space-y-2 rounded-lg shadow-inner bg-gray-50 dark:bg-gray-800 max-h-72 overflow-auto">
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
