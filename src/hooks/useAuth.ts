import { login, logout } from "@/services/auth"
import { ApiResponse } from "@/types/auth"
import { LoginData, LoginResponse } from "@/types/auth"
import { useMutation } from "@tanstack/react-query"

export const useLogin = () => {
    return useMutation<ApiResponse<LoginResponse>, Error, LoginData>({
        mutationFn: async (data: LoginData) => {
            const res = await login(data)
            return res.data
        }
    })
}
export function useLogout() {
    return useMutation({
        mutationFn: () => logout(),
    });
}
