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
  enums?: string[];
}

export const ItemForm = ({
  name,
  type,
  title,
  form,
  enums,
}: TypeCreateInput) => {
  console.log(enums);

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
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {enums?.map((el) => (
                    <SelectItem value={el}>{el}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
