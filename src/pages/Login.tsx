import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
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
// import { useLogin } from "@/hooks/useAuth";
// import { useToast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
// import { PhoneInput } from "@/components/common/PhoneInput.tsx";

const formSchema = z.object({
  phone: z.string().regex(/\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}/),
  password: z.string(),
});

export default function Login() {
  // const { data, mutate: login, isSuccess, isError } = useLogin();
  // const { toast } = useToast();
  // const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    // login({ ...values, phone: values.phone.replace(/([() -])/g, "") });
  }

  // useEffect(() => {
  //   if (isSuccess) {
  //     localStorage.setItem("access_token", data.data.value);
  //     const to = searchParams.get("to");
  //     navigate(to ?? "/");
  //   } else if (isError) {
  //     toast({ title: "Incorrect login details", variant: "destructive" });
  //   } else return;
  // }, [ isSuccess, isError, data?.data.value, toast, navigate, searchParams]);

  return (
    <>
      <main className="flex items-center justify-center w-[100vw] h-screen overflow-hidden ">
        <div className="flex flex-col w-full max-w-2xl px-4 mx-auto sm:px-6 ">
          <div className="flex items-center justify-center space-x-2">
            <img
              src="https://mbos-landing.vercel.app/_next/image?url=%2Fimages%2Fmbos.png&w=96&q=75"
              alt="logo"
              className="w-12"
            />
            <div className="text-2xl font-bold leading-none text-slate-900 dark:text-white whitespace-nowrap">
              Mbos Admin
            </div>
          </div>
          <div className="relative mt-12 sm:mt-16 z-[1]">
            <h1 className="text-2xl font-medium tracking-tight text-center text-slate-900 dark:text-white">
              Kirish
            </h1>
          </div>
          <div className="mx-2 z-[2] mt-10 flex-auto px-10 py-5 shadow-2xl shadow-slate-900/10 dark:shadow-slate-500/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:p-24 rounded-3xl w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base">
                        Telefon raqami
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Telefon raqamingizni kiriting"
                          {...field}
                          className="w-full h-10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base">Parol</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            placeholder="Parolni kiriting"
                            {...field}
                            className="w-full h-10"
                            type={showPassword ? "text" : "password"}
                          />
                          <div
                            className="absolute -translate-y-1/2 cursor-pointer right-2 top-1/2"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeOffIcon className="text-slate-500" />
                            ) : (
                              <EyeIcon className="text-slate-500" />
                            )}
                          </div>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                variant={"default"}
                  type="submit"
                  className="h-10 dark:text-white"
                >
                  Kirish
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
}
