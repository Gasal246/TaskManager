import axios from "axios";

export async function getAllProjectsAdmin(adminid: string, filter: string){
    try {
        const res = await axios.get(`/api/project/get-all?adminid=${adminid}&filter=${filter}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addNewProject(formData:FormData){
    try {
        const res = await axios.post('/api/project/add-project', formData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllUserProjects(userid: string, filter: ProjectGetFilters){
    try {
        const res = await axios.get(`/api/project/get-projects?userid=${userid}&filter=${filter}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}