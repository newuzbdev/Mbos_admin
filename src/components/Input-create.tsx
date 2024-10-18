import { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TypeCreateInput {
  name: string;
  title: string;
  form: any;
  type?: HTMLInputTypeAttribute;
  enums?: { name: string; value: string }[];
}
import { NumericFormat } from "react-number-format";

export const ItemForm = ({
  name,
  type,
  title,
  form,
  enums,
}: TypeCreateInput) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-semibold text-slate-700">
            {title}
          </FormLabel>
          {type === "enum" ? (
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
                  <SelectValue placeholder="Xarid holat" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {enums?.map((el, index) => (
                    <SelectItem key={index} value={el.name}>
                      {el.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : type === "number" ? (
            <FormControl>
              <NumericFormat
                value={field.value}
                thousandSeparator=" "
                allowNegative={false}
                onValueChange={(values) => {
                  const { value } = values;
                  field.onChange(value);
                }}
                placeholder={title}
                className="w-full px-4 py-1 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </FormControl>
          ) : (
            <FormControl>
              <Input
                type={type || "text"}
                placeholder={title}
                {...field}
                className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </FormControl>
          )}
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
};
