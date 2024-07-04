import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addNewAdmin } from "./fn/superAdminFn";
import { QUERY_KEYS } from "../queryKeys";

// export const useGetUserByUserid = (userid: string) => {
//     return useQuery({
//         queryKey: [QUERY_KEYS.GET_USER_BY_ID, userid],
//         queryFn: async () => getUserById(userid),
//         enabled: !!userid
//     })
// }

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
