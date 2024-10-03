import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  price: z.string().min(1, {
    message: "Price must be at least 1 character.",
  }),
});
// type ServicesInput = {
//   name: string;
//   price: number;
// };

interface ServicesCreateInputs {
  closeDialog?: () => void;
}

const ServicesCreateInputs = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    
    // const ServicesData: ServicesInput = {
    //   name: data.name,
    //   price: Number(data.price),
    // };
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-auto my-10 mt-4 space-y-5 "
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  Xizmat nomi
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Xizmatlar ro'yhati" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GPS">GPS</SelectItem>
                      <SelectItem value="CRM">SRM</SelectItem>
                      <SelectItem value="Landing pages">
                        Landing pages
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  Narxi
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Xizmat narxini kiriting"
                    {...field}
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-primary focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="py-2 text-white transition duration-200 rounded-md x-6 bg-primary hover:bg-green-700"
        >
          submit
        </Button>
      </form>
    </Form>
  );
};
export default ServicesCreateInputs;
