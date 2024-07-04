import axios from "axios"

export async function addNewAdmin(data: NewAdminType) {
    try {
        const res = await axios.post('/api/admin/create', data);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}