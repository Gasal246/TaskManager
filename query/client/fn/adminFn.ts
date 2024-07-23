import axios from "axios";

export async function addNewRegion(name: string){
    try {
        const res = await axios.post('/api/region/add-region', { name });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllRegions(adminid: string){
    try {
        const res = await axios.get(`/api/region/get-all/${adminid}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getRegionById(regid: string){
    try {
        const res = await axios.get(`/api/region/get-id/${regid}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addNewArea(name: string, regionId: string){
    try {
        const res = await axios.post('/api/area/add-area', { name, regionId });
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getAllAreas(regionId: string){
    try {
        const res = await axios.get(`/api/area/get-all/${regionId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function editRegionName(name: string, regionId: string){
    try {
        const res = await axios.post('/api/region/edit-name', { name, regionId });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteRegion(regionId: string){
    try {
        const res = await axios.post('/api/region/delete', { regionId });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAreaById(areaid: string){
    try {
        const res = await axios.get(`/api/area/get-id/${areaid}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function editAreaName(name: string, areaid: string){
    try {
        const res = await axios.post('/api/area/edit-name', { name, areaid });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteArea(areaid: string){
    try {
        const res = await axios.post('/api/area/delete', { areaid });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllStaffs(adminid: string){
    try {
        const res = await axios.get(`/api/staff/of-admin/${adminid}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addNewStaff(formData: FormData){
    try {
        const res = await axios.post('/api/staff/add', formData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getOneStaff(staffid: string){
    try {
        const res = await axios.get(`/api/staff/get-staff/${staffid}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addStaffSkill(staffId: string, skill: string){
    try {
        const res = await axios.post(`/api/staff/add-skill`, { staffId, skill });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function removeStaffSkill(staffId: string, skill: string){
    try {
        const res = await axios.post(`/api/staff/delete-skill`, { staffId, skill });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addStaffDocument(formData: FormData){
    try {
        const res = await axios.post('/api/staff/add-doc', formData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteStaffDocument(staffid: string, docid: string){
    try {
        const res = await axios.post('/api/staff/delete-doc', { staffid, docid });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteStaff(staffid: string){
    try {
        const res = await axios.post('/api/staff/delete', { staffid });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateStaff(staffid: string, Email: string, Name: string, Region: string, Area: string ){
    try {
        const res = await axios.post('/api/staff/edit-staff', { staffid, Email, Name, Region, Area });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateStaffStatus(staffid: string, status: StaffStatus){
    try {
        const res = await axios.post('/api/staff/status', { staffid, status });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

// ######### DEPARTMENT ROUTES ########

export async function getAllDepartments(adminid: string){
    try {
        const res = await axios.get(`/api/department/get-all/${adminid}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getDepartmentById(departmentid: string){
    try {
        const res = await axios.get(`/api/department/get-id/${departmentid}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addDepartmentHead(depid: string, staffid: string){
    try {
        const res = await axios.post('/api/department/add-head', { depid, staffid });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addDepartmentRegion(depid: string, regionid: string){
    try {
        const res = await axios.post('/api/department/add-region', { depid, regionid });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}