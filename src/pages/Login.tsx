import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  user_name: z.string().min(1, "Telefon raqami kiritilishi shart"),
  password: z
    .string()
    .min(4, "Parol kamida 4 ta belgidan iborat bo'lishi kerak"),
});

export default function Login() {
  const { data, mutate: login, isSuccess, isError } = useLogin();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: "",
      password: "",
    },
  });
  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values);
  }

  useEffect(() => {
    if (isSuccess && data) {
      console.log("Login Success: ", data);
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      const to = searchParams.get("to");
      toast({
        title: "Muvaffaqiyatli",
        description: "Muvaffaqiyatli qoshildi",
        variant: "success",
      });
      navigate(to ?? "/");
    } else if (isError) {
      console.error("Login Failed");
      toast({
        title: "Xato",
        description: "Noto'g'ri login ma'lumotlari",
        variant: "destructive",
      });
    }
  }, [isSuccess, isError, data, navigate, searchParams, toast]);

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
                  name="user_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Username kiriting"
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
