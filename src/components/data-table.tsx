import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowDownNarrowWide,
  ArrowLeft,
  ArrowRight,
  ArrowUpIcon,
} from "lucide-react";
import { Pagination } from "./pagination";
import { Search } from "./search";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router-dom";
interface DataTableProps<TData, TValue> {
  title?: string;
  search?: boolean;
  filter?: boolean;
  defaultPagination?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: { pagination: any; data: TData[] };
}

export default function DataTable<TData, TValue>({
  title,
  columns,
  search = true,
  defaultPagination = false,
  filter = false,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [searchParams, setSearchParams] = useSearchParams();

  const table = useReactTable({
    data: data?.data || data,
    columns,
    state: {
      columnVisibility,
      sorting,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <>
      <div className="flex flex-col w-full h-full space-y-2">
        <div className="flex justify-between">
          {search && (
            <div className="mt-2 w-80">
              <Search title={title} />
            </div>
          )}
          {filter && (
            <Button
              variant="default"
              onClick={() =>
                setSearchParams({
                  filter: searchParams.get("filter") === "ASC" ? "DESC" : "ASC",
                })
              }
            >
              <ArrowDownNarrowWide className="text-white" />
            </Button>
          )}
        </div>
        <div className="border rounded-lg ">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="text-base">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className="px-4 font-bold"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={
                              header.column.getCanSort()
                                ? "cursor-pointer select-none flex items-center gap-2.5"
                                : ""
                            }
                            onClick={header.column.getToggleSortingHandler()}
                            title={
                              header.column.getCanSort()
                                ? header.column.getNextSortingOrder() === "asc"
                                  ? "Sort ascending"
                                  : header.column.getNextSortingOrder() ===
                                    "desc"
                                  ? "Sort descending"
                                  : "Clear sort"
                                : undefined
                            }
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <ArrowUpIcon size={16} />,
                              desc: <ArrowDownIcon size={16} />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Natija yoʻq
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {defaultPagination ? (
          <div className="flex items-center justify-end py-4 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ArrowRight />
            </Button>
          </div>
        ) : (
          <Pagination table={data?.pagination} />
        )}
      </div>
    </>
  );
}
