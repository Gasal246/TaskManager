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
    GET_ALL_STAFF = "getAllStaffByAdminId",
    GET_STAFF = "getStaffByStaffId",
    GET_ALL_DEPARTMENTS = "getAllDepartmentsByAdminId",
    GET_DEPARTMENT_BY_ID = "getDepartmentById",
    GET_DEPARTMENT_REGION = "getDepartmentRegion",
    GET_STAFFS_REGION_AREA = "getStaffsAreaAndRegion",
    GET_DEPARTMENT_STAFFS = "getDepartmentStaffs",
    GET_REGION_STAFFS = "getRegionStaffs",
    GET_AREA_STAFFS = "getAreaStaffs",

    // user keys
    GET_USER_BY_ID = "getUserByUserid",
}