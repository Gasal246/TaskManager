"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { IUsers } from "@/models/userCollection"
import { Avatar, Tooltip } from "antd"
import Link from "next/link"
import { useRemoveDepartmentStaff } from "@/query/client/adminQueries"
import { usePathname } from "next/navigation"
import { toast } from "sonner"

const RemoveStaffButton = ({ staffid }:{ staffid: string }) => {
    const { mutateAsync: removeStaff, isPending: removingStaff } = useRemoveDepartmentStaff();
    const pathname = usePathname();
    const splited = pathname.split('/');
    const depid = splited[splited.indexOf('departments')+1];
    const handleRemoveStaff = async () => {
        const response = await removeStaff({ staffid: staffid, depid: depid });
        if(response?._id){
            return toast.success("Successfully removed.")
        }
        return toast.error("Some Unexpected Error")
    }
    return (
        <Tooltip title="Remove this staff from area" placement="left"><DropdownMenuItem onClick={handleRemoveStaff}>{removingStaff ? 'Removing...' : 'Remove'}</DropdownMenuItem></Tooltip>
    )
}

export const columns: ColumnDef<IUsers>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "AvatarUrl",
        header: () => <div className="text-left">Avatar</div>,
        cell: ({ row }) => {
            const avatarUrl = row.getValue("AvatarUrl[0]");
            return (
                <Tooltip title={avatarUrl ? 'user-profile' : 'default avatar'}>
                    <Avatar src={avatarUrl ? `${avatarUrl}` : '/avatar.png'} />
                </Tooltip>
            )
        },
    },
    {
        accessorKey: "Name",
        header: ({ column }) => {
            return (
                <h1
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </h1>
            )
        },
    },
    {
        accessorKey: "Email",
        header: ({ column }) => {
            return (
                <h1
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </h1>
            )
        },
    },
    {
        accessorKey: "RegionName",
        header: ({ column }) => {
            return (
                <h1
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Region
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </h1>
            )
        },
    },
    {
        accessorKey: "AreaName",
        header: ({ column }) => {
            return (
                <h1
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Area
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </h1>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const staff: any = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(staff?.StaffId)}
                        >
                            <Tooltip title={staff?.StaffId}>Copy Staff ID</Tooltip>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Tooltip title="Click to view staff in detail" placement="left"><Link href={`/admin/staffs/${staff?.StaffId}`}><DropdownMenuItem>View staff</DropdownMenuItem></Link></Tooltip>
                        <RemoveStaffButton staffid={staff?.StaffId} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
