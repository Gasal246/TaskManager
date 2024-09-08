import { QUERY_KEYS } from "../queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllProjectAnalytics } from "./fn/projectFn";

export const useGetAllProjectAnalytics = (userid: string, filter: ProjectGetFilters) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_PROJECTS_ANALYTICS, userid, filter],
        queryFn: async () => await getAllProjectAnalytics(userid, filter),
        enabled: !!userid
    })
}