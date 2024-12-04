import { addServerPaid, addServers, deleteServer, deleteServerPaid, getServerPaid, getServers, getServertById, updateServer, updateServerPaid } from "@/services/server";
import { IParams } from "@/types/income";
import { Server, ServerPaid } from "@/types/server";
import { useMutation, useQuery, } from "@tanstack/react-query";

export const useAddServer = () => {
    return useMutation({
        mutationFn: addServers,
    });
};

export const useGetServers = () => {
    return useQuery({
        queryKey: ["servers" as string],
        queryFn: () => getServers(),
    });
};

export const useGetServer = (serverId?: string) => {
    return useQuery({
        queryKey: ["serverId", serverId],
        queryFn: () => {
            if (!serverId) throw new Error("Contract ID is required");
            return getServertById(serverId);
        },
        enabled: !!serverId,
    });
};
export function useServerDelete() {
    return useMutation({
        mutationFn: (id: string) => deleteServer(id),
    });
}
export function useServerUpdate() {
    return useMutation({
        mutationFn: (data: Server) => updateServer(data),
    });
}

export const useAddServerPaid = () => {
    return useMutation({
        mutationFn: addServerPaid,
    });
};

export const useGetServersPaid = (params: IParams) => {
    return useQuery({
        queryKey: ["serverpaid"],
        queryFn: () => getServerPaid(params),
    });
};

export const useGetServerPaid = (serverPaidId?: string) => {
    return useQuery({
        queryKey: ["serverPaidId", serverPaidId],
        queryFn: () => {
            if (!serverPaidId) throw new Error("Contract ID is required");
            return getServertById(serverPaidId);
        },
        enabled: !!serverPaidId,
    });
};
export function useServerPaidDelete() {
    return useMutation({
        mutationFn: (id: string) => deleteServerPaid(id),
    });
}
export function useServerPaidUpdate() {
    return useMutation({
        mutationFn: (data: ServerPaid) => updateServerPaid(data),
    });
}