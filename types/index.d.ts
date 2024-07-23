declare type userTypes = 'admin' | 'staff' | 'regional_head' | 'area_head';

declare type NewDepartment = {
    DepartmentName: string;
    Max_staff_count: string | number | null;
    Allow_project: boolean;
    Allow_tasks: boolean;
}

declare type NewAdminType = {
    name: string;
    email: string;
    departments: NewDepartment[] | []
}

declare type AdminDataFilters = 'today' | 'month' | 'all' | 'days'

declare type AdminWithinDaysType = {
    from: string;
    to: string;
}

declare type DocType = {
    name: string | null, 
    fileUrl: string | null,
    expireAt: Date | null,
    remindMe: Date | null
}

declare type StaffData = {
    Name: string,
    Email: string,
    Region: string,
    Area: string,
    documents: DocType[] | [],
    Skills: string[]
}

declare type StaffStatus = 'active' | 'blocked' | 'unverified'

declare module 'formidable-serverless';