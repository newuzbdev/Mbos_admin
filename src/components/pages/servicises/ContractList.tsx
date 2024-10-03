import { ColumnDef } from "@tanstack/react-table";

import DataTable from "@/components/data-table";

const makeColumns = (): ColumnDef<any>[] => [
  {
    header: "№",
    cell: (c) => <div>{c.row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Xizmat nomi",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.name || "N/A"}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Narxi",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.price || "N/A"}</div>
    ),
  },
];

const ServicesList = () => {
  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <h1 className="font-bold ">Shartnomalar ro'yhati</h1>
        <DataTable columns={makeColumns()} data={[]} />
      </div>
    </div>
  );
};

export default ServicesList;
