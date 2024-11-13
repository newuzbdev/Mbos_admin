import axiosPrivate from "@/config/api";

export const addMonthlyFee = async (data: any) => {
    return await axiosPrivate.post("/montly-fee", data);
};
export const getMonthlyFee = async () => {
    return await axiosPrivate.get(`/monthly-fee`);
};
export async function updateMonthlyFee({ id, ...data }: { id: string | number, [key: string]: any }) {
    return await axiosPrivate.patch(`/monthly-fee/${id}`, data);
}  