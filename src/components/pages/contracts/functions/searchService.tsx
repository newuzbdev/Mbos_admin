import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IService } from "@/types/service";
import { useState } from "react";

export function SearchService({
  form,
  service,
  title,
}: {
  form: any;
  service: any;
  title: string;
}) {
  const [search, setSearch] = useState("");

  const filteredServices = service?.data?.data.filter(
    (el: IService) =>
      el.title.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
      !search
  );

  return (
    <FormField
      control={form.control}
      name={"service_id"}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-semibold text-slate-700">
            {title}
          </FormLabel>
          <Select
            onValueChange={(value) => field.onChange(+value)}
            value={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
                <SelectValue placeholder="Mijozni tanlang">
                  {field.value
                    ? service?.data?.data.find(
                        (service: IService) => service.id === +field.value
                      )?.title
                    : "Xizmat tanlang"}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <div>
                  <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Ism boyicha izlash"
                    className="w-full mb-2"
                    autoFocus
                  />
                </div>
                {filteredServices?.map((el: IService) => (
                  <SelectItem key={el.id} value={el.id.toString()}>
                    {el.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
}
