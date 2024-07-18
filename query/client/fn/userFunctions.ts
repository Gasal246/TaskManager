import axios from "axios"

export async function findByMail(email: string){
    try {
        const res = await axios.get(`/api/users/get-email/${email}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export async function sendEmailVerificationOtp(email: string){
    try {
        const res = await axios.post(`/api/auth/send-email-vcode/${email}`);
        return res;
    } catch (error) {
        console.log(error)
    }
}

export async function verifyOTP(email: string, otp: string){
    try {
        const res = await axios.post(`/api/auth/verifyotp`, { email, otp });
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export async function setupNewPassword(email: string, password: string){
    try {
        const res = await axios.post('/api/users/setup-pass', { email, password });
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export async function findUserById(id: string){
    try {
        const res = await axios.get(`/api/users/get-id/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

