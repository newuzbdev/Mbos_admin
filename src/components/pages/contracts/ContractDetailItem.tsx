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
export default DetailItem  