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