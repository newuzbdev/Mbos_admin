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


const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Uzunliki 4 ta belgidan kam bo'lmasin.",
  }),
  price: z.string().min(1, {
    message: "Telefon raqami 5 ta raqamdan kam bo'lmasin",
  }),
});
// type ServicesInput = {
//   name: string;
//   price: number;
// };
const ClientsCreateInput = () => {
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
        <div className="grid grid-cols-1 gap-6  md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700 dark:text-white">
                  Mijoz nomi
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Mijoz Ismi"
                    {...field}
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-primary focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700 dark:text-white">
                  Companya nomi
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Comanya nomi"
                    {...field}
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-primary focus:ring focus:ring-blue-200"
                  />
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
                <FormLabel className="text-lg font-semibold text-slate-700 dark:text-white">
                  Telefon Nomeri
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Telefon nomer"
                    {...field}
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-primary focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700 dark:text-white">
                  Email Manzili
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email Manzili"
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
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default ClientsCreateInput;
