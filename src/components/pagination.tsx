import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router-dom";

interface TableProps {
  page: number;
  totalPages: number;
  limit: number;
}

export function Pagination({ table }: { table: TableProps }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePage = (page: string) => {
    setSearchParams({ page: page, limit: "10" });
  };
  const paramsPage = Number(searchParams.get("page")) || table?.page || 1;
  const totalPages = table?.totalPages || 1;
  return (
    <div className="flex items-center justify-between mt-2">
      <Button
        onClick={() => handlePage((paramsPage - 1).toString())}
        disabled={paramsPage <= 1}
        className="px-4 py-2 text-white rounded"
      >
        <ArrowLeft />
      </Button>
      <span>
        {paramsPage} / {totalPages}
      </span>
      <Button
        onClick={() => handlePage((paramsPage + 1).toString())}
        disabled={paramsPage >= totalPages}
        className="px-5 py-2 text-white"
      >
        <ArrowRight />
      </Button>
    </div>
  );
}