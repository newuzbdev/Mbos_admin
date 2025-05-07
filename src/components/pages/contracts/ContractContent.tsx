import {
  CalendarIcon,
  CreditCardIcon,
  FileTextIcon,
  UserIcon,
} from "lucide-react";
import DetailItem from "./ContractDetailItem";
import DetailSection from "./ContractDetailSection";
import { formatNumber } from "@/components/formNumber";
import { CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useGetContract } from "@/hooks/useContract";

export default function ContractContent() {
  const { contractId } = useParams();
  const { data: contractDetails } = useGetContract(contractId);
  const contract = contractDetails?.data?.data;

  const shartnoma_turi = [
    { name: "one_bay", value: "Birmartalik to'lov" },
    { name: "subscription_fee", value: "Oylik to'lov" },
  ];

  const totalAmount =
    contract?.shartnoma_turi === "subscription_fee"
      ? contract?.monthlyFee?.reduce(
          (sum: number, fee: { amount: unknown }) => sum + Number(fee.amount),
          0
        ) || 0
      : Number(contract?.service?.price * contract?.count) || 0;

  const totalPaid =
    contract?.shartnoma_turi === "subscription_fee"
      ? contract?.monthlyFee?.reduce(
          (sum: number, fee: { paid: unknown }) => sum + Number(fee.paid),
          0
        ) || 0
      : Number(contract?.advancePayment) || 0;

  return (
    <CardContent className="p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <DetailSection
          icon={<UserIcon className="w-5 h-5 text-primary" />}
          title="Mijoz haqida ma'lumot"
        >
          <DetailItem
            label="Mijozning to'liq ismi"
            value={contract.user?.F_I_O}
          />
          <DetailItem
            label="Shartnoma turi"
            value={
              shartnoma_turi.find((el) => el.name === contract.shartnoma_turi)
                ?.value || "N/A"
            }
          />
          <DetailItem
            label="Shartnoma nomeri"
            value={contract.shartnoma_nomer}
          />
          <DetailItem
            label="Mijozning telefon raqami"
            value={contract.user?.phone}
          />
          <DetailItem
            label="Kim yaratdi"
            value={contract?.admin?.user_name || "N/A"}
          />
          <DetailItem
            label="Kim o'zgartirdi"
            value={contract?.admin?.user_name || "N/A"}
          />
          <DetailItem
            label="Balance"
            value={formatNumber(contract?.user?.balance || "N/A")}
          />
        </DetailSection>
        <DetailSection
          icon={<CreditCardIcon className="w-5 h-5 text-green-600" />}
          title="Moliyaviy tafsilotlar"
        >
          <DetailItem
            label="Narx"
            value={
              contract.service && contract.service.price
                ? formatNumber(contract.service.price * contract.count) +
                  " s'om"
                : "N/A"
            }
          />
          <DetailItem
            label="to'langan"
            value={formatNumber(totalPaid) + " s'om"}
          />
          <DetailItem
            label="Umumiy qolgan to'lov"
            value={formatNumber(totalAmount - totalPaid) + " s'om"}
          />
          <DetailItem
            label="Xarid holati"
            value={
              contract.purchase_status === "paid" ? "To'landi" : "To'lanmagan"
            }
          />
        </DetailSection>

        <DetailSection
          icon={<FileTextIcon className="w-5 h-5 text-purple-600" />}
          title="Shartnomaning xususiyatlari"
        >
          <DetailItem label="Miqdori" value={contract.count} />
          <DetailItem
            label="Shartnoma davomiyligi"
            value={new Date(contract.shartnoma_muddati).toLocaleDateString()}
          />
          <DetailItem
            label="Texnik davomiyligi"
            value={new Date(contract.texnik_muddati).toLocaleDateString()}
          />
        </DetailSection>

        <DetailSection
          icon={<CalendarIcon className="w-5 h-5 text-orange-600" />}
          title="Muhim sanalar"
        >
          <DetailItem
            label="Shartnoma kuni"
            value={new Date(contract.sana).toLocaleDateString()}
          />
          <DetailItem
            label="To'lash sanasi"
            value={new Date(contract.tolash_sana).toLocaleDateString()}
          />
        </DetailSection>
      </div>
    </CardContent>
  );
}
