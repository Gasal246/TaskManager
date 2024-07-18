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