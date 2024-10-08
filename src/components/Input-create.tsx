import { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface TypeCreateInput {
  name: string;
  title: string;
  form: any;
  type?: HTMLInputTypeAttribute;
}

export const ItemForm = ({ name, type, title, form }: TypeCreateInput) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-semibold text-slate-700">
            {title}
          </FormLabel>
          <FormControl>
            <Input
              type={type || "text"}
              placeholder={title}
              {...field}
              className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </FormControl>
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
};
