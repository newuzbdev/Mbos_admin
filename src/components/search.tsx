import { useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { ChangeEvent } from "react";

export function Search({ title }: { title?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ page: "1", search: e.target.value });
  };
  return (
    <Input
      placeholder={title || "izlash"}
      value={searchParams.get("search") || ""}
      onChange={handleSearch}
    />
  );
}
