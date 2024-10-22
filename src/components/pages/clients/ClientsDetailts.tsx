import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactRoundIcon, PictureInPictureIcon, UserIcon } from "lucide-react";
import { useGetClient } from "@/hooks/useClients";
import { DeleteItem } from "@/components/pages/clients/functions/clients-delete";
import { UpdateItem } from "@/components/pages/clients/functions/clients-edit";
import { Income } from "@/types/income";
import { Clients } from "@/types/clients";
import DataTable from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Contract } from "@/types/contract";
import { formatNumber } from "@/components/formNumber";
import IncomeCreate from "../income/IncomeCreate";
import ContractCreate from "../contracts/ContractCreate";
import { useGetGetAdmin } from "@/hooks/useAdmin";
import { AdminType } from "@/types/auth";

const makeColumns = (): ColumnDef<Income>[] => [
  {
    header: "№",
    cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
  },
  {
    accessorKey: "amount",
    header: "Narx",
    cell: ({ row }) => <div>{formatNumber(row.original.amount)} s'om</div>,
  },
  {
    accessorKey: "description",
    header: "izoh",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "vaqt",
    cell: ({ row }) => (
      <div className="cursor-pointer">
        {new Date(row.original.date).toLocaleDateString()}
      </div>
    ),
  },
];

const makeColumnsShartnoma = (
  navigate: (path: string) => void
): ColumnDef<Contract>[] => [
  {
    header: "№",
    cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
  },
  {
    accessorKey: "service",
    header: "Xizmat / Product",
    cell: ({ row }) => (
      <div
        className="underline cursor-pointer text-primary"
        onClick={() => navigate(`/contract/${row.original.id}`)}
      >
        {row.original.service?.title || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "advancePayment",
    header: "Tolangan",
    cell: ({ row }) => (
      <div>{formatNumber(row.original.advancePayment)} s'om</div>
    ),
  },
  {
    accessorKey: "remainingPayment",
    header: "qolgan to'lov",
    cell: ({ row }) => (
      <div className="cursor-pointer">
        {formatNumber(row.original.remainingPayment)} s'om
      </div>
    ),
  },
  {
    accessorKey: "count",
    header: "miktor",
    cell: ({ row }) => (
      <div className="cursor-pointer">{formatNumber(row.original.count)}</div>
    ),
  },
  {
    accessorKey: "sana",
    header: "vaqt",
    cell: ({ row }) => (
      <div className="cursor-pointer">
        {new Date(row.original.sana).toLocaleDateString()}
      </div>
    ),
  },
];

export default function ClientsDetails() {
  const { clientsId } = useParams();
  const { data: clientsDetails, isLoading } = useGetClient(clientsId);
  const clients: Clients | undefined = clientsDetails?.data.data;
  const admins: AdminType | undefined = clientsDetails?.data.data;

  const { data: createAdmin } = useGetGetAdmin(Number(admins?.whoCreated));
  const { data: updateAdmin } = useGetGetAdmin(Number(admins?.whoUpdated));

  const navigate = useNavigate();

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (!clients) return <div>Mijoz ma'lumotlari topilmadi</div>;

  const totalDebt = clients.income
    ? clients.income
        .filter((income) => income.is_paid === "no_paid")
        .reduce((sum, income) => sum + income.amount, 0)
    : 0;

  return (
    <div className="container p-0 mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-blue-800">
          <div className="flex justify-between">
            <CardTitle className="text-2xl font-bold text-white">
              Mijoz malumotlari
            </CardTitle>
            <div className="flex justify-end">
              <UpdateItem clients={clients} />
              <DeleteItem />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <DetailSection
              icon={<UserIcon className="w-5 h-5 text-primary" />}
              title="Mijoz haqida ma'lumot"
            >
              <DetailItem label="Mijozning to'liq ismi" value={clients.F_I_O} />
              <DetailItem label="Telefon raqami" value={clients.phone} />
              <DetailItem label="Manzil" value={clients.adress} />
              <DetailItem label="Inni raqami" value={clients.INN_number} />
              <DetailItem
                label="Kim yaratdi"
                value={createAdmin?.data.data.user_name}
              />
              <DetailItem
                label="Kim o'zgartirdi"
                value={updateAdmin?.data.data.user_name}
              />
              <DetailItem
                label="Barcha qarzlari"
                value={`${formatNumber(totalDebt)} s'om`}
              />
            </DetailSection>

            <div>
              <div className="flex justify-between">
                <p className="flex items-center gap-2 text-lg font-semibold mb-1.5">
                  <ContactRoundIcon className="flex text-primary" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                    daromat haqida ma'lumot
                  </span>
                </p>
                <IncomeCreate />
              </div>
              <DataTable
                data={{ pagination: {}, data: clients.income || [] }}
                columns={makeColumns()}
                search={false}
                defaultPagination
              />
            </div>
            <div className="col-span-2">
              <div className="flex justify-between">
                <p className="flex items-center gap-2 text-lg font-semibold mb-1.5">
                  <PictureInPictureIcon className="text-primary" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                    shartnoma haqida ma'lumot
                  </span>
                </p>
                <ContractCreate />
              </div>
              <DataTable
                data={{ pagination: {}, data: clients.shartnome || [] }}
                columns={makeColumnsShartnoma(navigate)}
                search={false}
                defaultPagination
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailSection({  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <p className="flex items-center gap-2 text-lg font-semibold">
        {icon}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
          {title}
        </span>
      </p>
      <div className="p-4 space-y-2 rounded-lg shadow-inner bg-gray-50 dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number | undefined;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between py-1 border-b border-gray-200 last:border-b-0 ${className}`}
    >
      <span className="font-medium dark:text-gray-300">{label}:</span>
      <span className="font-semibold dark:text-gray-300">{value || "N/A"}</span>
    </div>
  );
}