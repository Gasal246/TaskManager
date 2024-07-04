import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../queryKeys";
import { findByMail, sendEmailVerificationOtp, setupNewPassword, verifyOTP } from "./fn/userFunctions";

export const useFindByMailId = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ( email: string ) => findByMail(email),
    })
}

export const useSendEmailVerification = () => {
    return useMutation({
        mutationFn: ( email: string ) => sendEmailVerificationOtp(email),
    })
}

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: ( { email, otp }:{ email: string, otp: string } ) => verifyOTP(email, otp),
    })
}

export const useSetupUserPassword = () => {
    return useMutation({
        mutationFn: ({ email, password }:{ email: string, password: string }) => setupNewPassword(email, password),
    })
}