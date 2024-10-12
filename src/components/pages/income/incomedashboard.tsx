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

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-3">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Daromad va Chikim
      </h2>

      <Section
        title="Tushum"
        items={[
          { label: "Naxt pul", value: cash },
          { label: "Otkazma", value: translation },
          { label: "Online", value: online },
          { label: "Boshqa", value: otherTushum },
        ]}
      />

      <Section
        title="Chikim"
        items={[
          { label: "Yetkazib berish", value: delivery },
          { label: "Ish haqi", value: salary },
          { label: "Boshqa", value: otherChikim },
        ]}
      />
    </div>
  );
}

const Section = ({ title, items }: any) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
      {title}:
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {items.map((item: any, index: any) => (
        <div
          key={index}
          className="p-3 flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900"
        >
          <p className="font-medium text-gray-800 text-sm dark:text-gray-200">
            {item.label}:
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {formatNumber(item.value) || 0} s'om
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default IncomeDashboard;
