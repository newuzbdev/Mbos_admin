import DataTable from "@/components/data-table.tsx";
import {ColumnDef} from "@tanstack/react-table";

const ClientsList = () => {
  const makeColumns = (): ColumnDef<any>[] => [
    {
      header: "№",
      cell: (c) => <div>{c.row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: "Mijoz nomi",
      cell: ({ row }) => (
        <div className="cursor-pointer">{row.original.name || "N/A"}</div>
      ),
    },
    {
      accessorKey: "Companya",
      header: "Companya nomi",
      cell: ({ row }) => (
        <div className="cursor-pointer">{row.original.price || "N/A"}</div>
      ),
    },
    {
      accessorKey: "Telefon raqami",
      header: "Telefon raqami",
      cell: ({ row }) => (
        <div className="cursor-pointer">{row.original.price || "N/A"}</div>
      ),
    },
    {
      accessorKey: "Email",
      header: "Email manzili",
      cell: ({ row }) => (
        <div className="cursor-pointer">{row.original.price || "N/A"}</div>
      ),
    },
  ];
  return (
    <div className='w-full'>
      <div className='border rounded-md p-4'>
        <h1 className='font-bold'>Mijozlar Ro'yxati</h1>

        <DataTable columns={makeColumns()} data={[]} />
      </div>

    </div>
  );
};

export default ClientsList;