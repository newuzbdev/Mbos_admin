import { formatNumber } from "@/components/formNumber";
import { useGetIncomeDash } from "@/hooks/dashboard";

function IncomeDashboard() {
  const { data } = useGetIncomeDash();

  const {
    cash,
    translation,
    online,
    other: otherTushum,
  } = data?.data?.data?.tushum || {};
  const {
    delivery,
    salary,
    other: otherChikim,
  } = data?.data?.data?.chikim || {};

  const tushumItems = [
    { label: "Naxt pul", value: cash },
    { label: "Otkazma", value: translation },
    { label: "Online", value: online },
    { label: "Boshqa", value: otherTushum },
  ];

  const chikimItems = [
    { label: "Yetkazib berish", value: delivery },
    { label: "Ish haqi", value: salary },
    { label: "Boshqa", value: otherChikim },
  ];

  return (
    <div className="p-6 mt-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-200">
        Daromad va Chiqim
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Section title="Tushum" items={tushumItems} />

        <Section title="Chiqim" items={chikimItems} />
      </div>
    </div>
  );
}

const Section = ({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: number | undefined }>;
}) => (
  <div className="mb-6">
    <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
      {title}:
    </h3>
    <div className="grid grid-cols-1 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 transition-all duration-300 border border-gray-200 rounded-md dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
        >
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {item.label}
          </p>
          <p className="font-semibold text-gray-600 dark:text-gray-400">
            {formatNumber(item.value ?? 0)} s'om
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default IncomeDashboard;
