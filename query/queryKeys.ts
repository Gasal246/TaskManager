export enum QUERY_KEYS {
    // super admin keys
    GET_SUPER_ADMIN_BY_ID = "getSuperAdminById",
    GET_ADMINS = "getSuperAdminById",
    GET_ADMIN_WITHIN = "getAdminsWithin",
    GET_ADMIN_ADMINID = "getAdminByAdminId",
    GET_DEPARTMENT_ID = "getDepartmentById",
    
    // admin keys
    GET_ALL_ADMIN_DATA = "getAllAdminDataForSuperAdmin",
    GET_REGIONS_ADMINID = "getAllRegionsByAdminId",
    GET_REGION_ID = "getRegionById",
    GET_AREAS_REGIONID = "getAreasByRegionId",
    GET_AREA_ID = "getAreaById",

    // user keys
    GET_USER_BY_ID = "getUserByUserid",
}