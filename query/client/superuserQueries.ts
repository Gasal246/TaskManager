import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addNewAdmin, changeAdminStatus, deleteAdminData, editAdmin, editDepartment, findAdminByAdminid, getAdmins, getAdminsWithin, getDepartmentById, getSuperUserById, searchAdmins } from "./fn/superAdminFn";
import { QUERY_KEYS } from "../queryKeys";
import { DateRange } from "react-day-picker";

export const useGetSuperAdminById = (userid: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, userid],
        queryFn: async () => getSuperUserById(userid),
        enabled: !!userid
    })
}

export const useCreateNewAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: NewAdminType) => addNewAdmin(data),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_ADMIN_DATA]
            })
        }
    })
}

export const useGetAdmins = (filter: AdminDataFilters) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ADMINS, filter],
        queryFn: async () => getAdmins(filter),
        enabled: !!filter
    })
}

export const useGetAdminsAddedWithin = (days: DateRange  | undefined) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ADMIN_WITHIN, days?.from, days?.to],
        queryFn: async () => getAdminsWithin(days),
        enabled: !!days
    })
}

export const useSearchAddedAdmins = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (search: string) => searchAdmins(search),
    })
}

export const useFindAdminByAdminId = (adminid: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ADMIN_ADMINID, adminid],
        queryFn: async () => findAdminByAdminid(adminid),
        enabled: !!adminid
    })
}

export const useChangeAdminStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({adminid, status}: { adminid: string, status: string}) => changeAdminStatus(adminid, status),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ADMIN_ADMINID, data?._id]
            })
        }
    })
}

export const useDeleteAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (adminid: string) => deleteAdminData(adminid),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ADMINS, 'all']
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ADMINS, 'today']
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ADMINS, 'month']
            })
        }
    })
}

export const useGetDepartmentById = (departmentid: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_DEPARTMENT_ID, departmentid],
        queryFn: async () => getDepartmentById(departmentid),
        enabled: !!departmentid
    })
}

export const useEditDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ departmentid, DepartmentName, MaximumStaffs, AllowProjects, AllowTasks }: { departmentid: string, DepartmentName: string, MaximumStaffs: string, AllowProjects: boolean, AllowTasks: boolean }) => editDepartment(departmentid, DepartmentName, MaximumStaffs, AllowProjects, AllowTasks),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_DEPARTMENT_ID, data?._id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ADMIN_ADMINID, data?.AdminId],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ADMIN_ADMINID],
            })
        }
    })
}

export const useEditAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ adminId, email, name }: { adminId: string, email: string, name: string }) => editAdmin(adminId, name, email),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ADMIN_ADMINID, data?._id],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ADMIN_ADMINID],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ADMINS, 'all']
            })
        }
    })
}