import { QUERY_KEYS } from "../queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addNewArea, addNewRegion, deleteArea, deleteRegion, editAreaName, editRegionName, getAllAreas, getAllRegions, getAreaById, getRegionById } from "./fn/adminFn";

export const useGetAllRegions = (adminid: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_REGIONS_ADMINID, adminid],
        queryFn: async () => getAllRegions(adminid),
        enabled: !!adminid
    })
}

export const useAddNewRegion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (name: string) => addNewRegion(name),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_REGIONS_ADMINID, data?.Administrator]
            })
        }
    })
}

export const useGetRegionById = (regid: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_REGION_ID, regid],
        queryFn: async () => getRegionById(regid),
        enabled: !!regid
    })
}

export const useGetAllAreas = (regionId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_AREAS_REGIONID, regionId],
        queryFn: async () => getAllAreas(regionId),
        enabled: !!regionId
    })
}

export const useAddNewArea = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ name, regionId }:{name: string, regionId: string}) => addNewArea(name, regionId),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_AREAS_REGIONID, data?.RegionId]
            })
        }
    })
}

export const useEditRegionName = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ name, regionId }:{name: string, regionId: string}) => editRegionName(name, regionId),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_REGION_ID, data?._id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_REGIONS_ADMINID, data?.Administrator]
            })
        }
    })
}

export const useDeleteRegion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (regionId: string) => deleteRegion(regionId),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_REGIONS_ADMINID, data?.Administrator]
            })
        }
    }) 
}

export const useGetAreaById = (areaid: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_AREA_ID, areaid],
        queryFn: async () => getAreaById(areaid),
        enabled: !!areaid
    })
}

export const useEditAreaName = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ name, areaid }:{ name: string, areaid: string }) => editAreaName(name, areaid),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_AREA_ID, data?._id]
            })
        }
    })
}

export const useDeleteArea = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (areaid: string) => deleteArea(areaid),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_AREA_ID, data?._id]
            })
        }
    })
}