import { QUERY_KEYS } from "../queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addDepartmentHead, addDepartmentRegion, addNewArea, addNewRegion, addNewStaff, addStaffDocument, addStaffSkill, deleteArea, deleteRegion, deleteStaff, deleteStaffDocument, editAreaName, editRegionName, getAllAreas, getAllDepartments, getAllRegions, getAllStaffs, getAreaById, getDepartmentById, getOneStaff, getRegionById, removeStaffSkill, updateStaff, updateStaffStatus } from "./fn/adminFn";

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
        mutationFn: ({ name, regionId }: { name: string, regionId: string }) => addNewArea(name, regionId),
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
        mutationFn: ({ name, regionId }: { name: string, regionId: string }) => editRegionName(name, regionId),
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
        mutationFn: ({ name, areaid }: { name: string, areaid: string }) => editAreaName(name, areaid),
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

export const useGetAllStaffs = (adminid: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_STAFF, adminid],
        queryFn: async () => getAllStaffs(adminid),
        enabled: !!adminid
    })
}

export const useAddNewStaff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ formData }: { formData: FormData }) => addNewStaff(formData),
    })
}

export const useGetStaff = (staffid: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_STAFF, staffid],
        queryFn: async () => getOneStaff(staffid),
        enabled: !!staffid
    })
}

export const useAddSkillToStaff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ staffId, skill }: { staffId: string, skill: string }) => addStaffSkill(staffId, skill),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_STAFF, data?._id]
            })
        }
    })
}

export const useRemoveSkill = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ staffId, skill }: { staffId: string, skill: string }) => removeStaffSkill(staffId, skill),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_STAFF, data?._id]
            })
        }
    })
}

export const useAddNewStaffDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ formData }: { formData: FormData }) => addStaffDocument(formData),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_STAFF, data?._id]
            })
        }
    })
}

export const useDeleteStaffDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ staffid, docid }: { staffid: string, docid: string }) => deleteStaffDocument(staffid, docid),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_STAFF, data?._id]
            })
        }
    })
}

export const useDeleteStaff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (staffid: string) => deleteStaff(staffid),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_STAFF, data?.Addedby]
            })
        }
    })
}

export const useUpdateStaff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ staffid, Email, Name, Region, Area }: { staffid: string, Email: string, Name: string, Region: string, Area: string }) => updateStaff(staffid, Email, Name, Region, Area),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_STAFF, data?._id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_STAFF, data?.Addedby]
            })
        }
    })
}

export const useUpdateUserStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ staffid, status }: { staffid: string, status: StaffStatus }) => updateStaffStatus(staffid, status),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_STAFF, data?._id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_STAFF, data?.Addedby]
            })
        }
    })
}

// ######## D E P A R T M E N T Quries #############
export const useGetAllDepartments = (adminid: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_DEPARTMENTS, adminid],
        queryFn: async () => getAllDepartments(adminid),
        enabled: !!adminid
    })
}

export const useGetDepartmentById = (departmentid: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_DEPARTMENT_BY_ID, departmentid],
        queryFn: async () => getDepartmentById(departmentid),
        enabled: !!departmentid
    })
}

export const useAddDepartmentHead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ depid, staffid }: { depid: string, staffid: string }) => addDepartmentHead(depid, staffid),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_DEPARTMENT_BY_ID, data?._id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_DEPARTMENTS, data?.AdminId],
            })
        }
    })
}

export const useAddDepartmentRegion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ depid, regionid }: { depid: string, regionid: string }) => addDepartmentRegion(depid, regionid),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_DEPARTMENT_BY_ID, data?._id]
            })
        }
    })
}