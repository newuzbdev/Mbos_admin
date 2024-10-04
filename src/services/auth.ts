import axiosPrivate from "@/config/api";
import { LoginData, LoginResponse, ApiResponse } from "@/types/auth";
import { compareAsc } from "date-fns";
import { jwtDecode, JwtPayload } from "jwt-decode"

export const login = async (data: LoginData) => {
    return (await axiosPrivate.post<ApiResponse<LoginResponse>>("/admin/login", data))
}
export async function logout() {
    return await axiosPrivate.post("/admin/logout").then(() => {
        localStorage.removeItem("accessToken");
    });
}

export function isLoggedIn(): boolean {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;
    const decoded = jwtDecode<JwtPayload>(token);
    return compareAsc(Number(decoded.exp) * 1000, new Date()) === 1;
}

