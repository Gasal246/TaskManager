import { QUERY_KEYS } from "../queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addNewProject, getAllProjectsAdmin, getAllUserProjects } from "./fn/projectFn";

export const useGetAllProjectsAdmin = (adminid: string, filter: ProjectGetFilters) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_PROJECTS, filter],
        queryFn: async () => await getAllProjectsAdmin(adminid, filter),
        enabled: !!adminid
    })
}

export const useGetUserProjects = (userid: string, filter: ProjectGetFilters) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_PROJECTS, filter],
        queryFn: async () => await getAllUserProjects(userid, filter),
        enabled: !!userid
    })
}

export const useAddNewProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formData: FormData) => addNewProject(formData),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_PROJECTS]
            })
        }
    })
}

