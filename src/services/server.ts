import axiosPrivate from "@/config/api";
import { IParams } from "@/types/income";
import { Server, ServerPaid } from "@/types/server";

export const addServers = async (data: Server) => {
    return await axiosPrivate.post("/server", data);
};
export const addServersNotification = async (data: Server) => {
    return await axiosPrivate.post("/server/notification", data);
};
export const getServers = async () => {
    return await axiosPrivate.get("/server");
};

export const getServertById = async (serverId: string) => {
    return await axiosPrivate.get(`/server/${serverId}`);
};
export const deleteServer = async (id: string) => {
    return await axiosPrivate.delete(`/server/${id}`);
};
export async function updateServer({ id, ...data }: Server) {
    return await axiosPrivate.patch(`/server/${id}`, data);
}

export const addServerPaid = async (data: ServerPaid) => {
    return await axiosPrivate.post("/server-paid", data);
};
export const getServerPaid = async ({
    page = 1,
    limit = 10,
    search = "",
}: IParams) => {
    return await axiosPrivate.get(
        `/server-paid?limit=${limit}&page=${page}&search=${search}`
    );
};
export const getServerPaidById = async (serverPaidId: string) => {
    return await axiosPrivate.get(`/server-paid/${serverPaidId}`);
};

export const deleteServerPaid = async (id: string) => {
    return await axiosPrivate.delete(`/server-paid/${id}`);
};
export async function updateServerPaid({ id, ...data }: ServerPaid) {
    return await axiosPrivate.patch(`/server-paid/${id}`, data);
}
