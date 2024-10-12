import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router-dom";

export function Pagination({ table }: { table: any }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePage = (page: string, limit: string) => {
    setSearchParams({ page: page, limit: limit });
  };
  const paramsPage = Number(searchParams.get("page") || table?.page);
  return (
    <div className="flex items-center justify-between mt-2">
      <Button
        onClick={() => handlePage((+paramsPage - 1).toString(), table?.limit)}
        disabled={paramsPage <= 1}
        className="px-4 py-2 rounded text-white"
      >
        <ArrowLeft />
      </Button>
      <span>
        Page {paramsPage || 1} of {table?.totalPages}
      </span>
      <Button
        onClick={() => handlePage((+paramsPage + 1).toString(), table.limit)}
        disabled={paramsPage >= table?.totalPages}
        className="px-5 py-2 text-white"
      >
        <ArrowRight />
      </Button>
    </div>
  );
}
