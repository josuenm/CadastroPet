import type { PaginatedResponse } from "@/types/pagination.type";
import type { ICreatePet, IPet, IUpdatePet } from "@/types/pet.type";
import { api } from "./index.api";

export interface PetListParams {
    page?: number;
    pageSize?: number;
}

export const PetAPI = {
    getById: async (id: string) => {
        const { data } = await api.get<IPet>(`/pet/${id}`);
        return data;
    },
    deleteById: async (id: string) => {
        await api.delete(`/pet/${id}`);
    },
    list: async (params?: PetListParams) => {
        const { data } = await api.get<PaginatedResponse<IPet>>("/pet", { params });
        return data;
    },
    create: async (params: ICreatePet) => {
        const { data } = await api.post<IPet>("/pet", params);
        return data;
    },
    update: async (id: string, params: IUpdatePet) => {
        const { data } = await api.put<IPet>(`/pet/${id}`, params);
        return data;
    },
};
