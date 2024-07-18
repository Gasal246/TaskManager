"use client"
import { Button } from '@/components/ui/button'
import { useChangeAdminStatus, useDeleteAdmin, useFindAdminByAdminId } from '@/query/client/superuserQueries'
import { Avatar, Tooltip } from 'antd'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { CircleCheckBig, MapPinned, OctagonX, PencilRuler, Trash2Icon, Users } from 'lucide-react'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import EditDepartmentDialog from '@/components/super/EditDepartmentDialog'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import EditAdminDialog from '@/components/super/EditAdminDialog'

const AdminPage = ({ params }: { params: { adminid: string } }) => {
  const router = useRouter();
  const { data: adminData, isLoading: adminDataLoading } = useFindAdminByAdminId(params.adminid);
  const { mutateAsync: changeAdminStatus, isPending: changingAdminStatus } = useChangeAdminStatus();
  const { mutateAsync: deleteAdmin, isPending: deletingAdmin } = useDeleteAdmin()

  const handleStatusChange = async (value: any) => {
    const response = await changeAdminStatus({ adminid: params.adminid, status: value });
  }

  const handleDeleteAdmin = async () => {
    const response = await deleteAdmin(params.adminid);
    if (response?._id) {
      router.replace('/superadmin/admins');
      return toast.success("Complete Admin Data Erased...")
    } else {
      return toast.error("Delete failed some steps.")
    }
  }

  return (
    <div className="w-full h-screen overflow-y-scroll p-5 pb-20">
      <Breadcrumb className='mb-2'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/superadmin/admins">Admin Management</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{adminData?.AdminId?.Name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <div className='flex items-center gap-1'>
          <Avatar src={adminData?.AdminId?.AvatarUrl} size={45} />
          <div>
            <h1 className='font-bold text-xl'>{adminData?.AdminId?.Name} <Badge variant={adminData?.AdminId?.Status == 'active' ? "outline" : "destructive"}>{changingAdminStatus ? 'changing...' : (adminData?.AdminId?.InitialEntry ? 'initial' : adminData?.AdminId?.Status)}</Badge></h1>
            <h2 className="text-sm">{adminData?.AdminId?.Email}</h2>
          </div>
        </div>
        <div className="flex">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline"><DotsHorizontalIcon /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-32 p-1 space-y-1">
              <EditAdminDialog
                trigger={<span> Edit Admin</span>}
                adminData={adminData?.AdminId}
              />
              <DropdownMenu>
                <DropdownMenuTrigger className='text-sm font-medium bg-slate-800 hover:bg-slate-700 p-1 w-full rounded-sm'>Change Status</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={adminData?.AdminId?.Status} onValueChange={handleStatusChange}>
                    <DropdownMenuRadioItem value="active">active</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="blocked">blocked</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialog>
                <AlertDialogTrigger className='text-sm font-light bg-red-900 hover:bg-red-800 p-1 w-full rounded-sm flex gap-1 items-center justify-center'>Delete <Trash2Icon size={16} /></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to Delete Admin?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your admin account
                      and remove all data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAdmin}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-wrap mt-5">
        {
          adminData?.Departments?.map((department: any) => (
            <div className="w-3/12 p-1" key={department?._id}>
              <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} className="w-full bg-slate-800 rounded-md p-2 hover:shadow-md border-slate-600 border cursor-pointer relative">
                <div className="absolute top-2 right-2 z-20"><EditDepartmentDialog
                  trigger={<Tooltip title="Edit" placement='left'><PencilRuler size={18} /></Tooltip>}
                  departmentId={department?._id}
                /></div>
                <h1 className='text-sm font-semibold'>{department?.DepartmentName}</h1>
                <h3 className='text-xs text-slate-300 mb-1'>{department?.DepartmentHead ? department?.DepartmentHead?.Email : 'no head added'}</h3>
                <li className='text-xs flex gap-1 text-slate-400'>{department?.AllowProjects ? <CircleCheckBig size={14} strokeWidth={2} /> : <OctagonX size={14} strokeWidth={2} />} - Allow Projects </li>
                <li className='text-xs flex gap-1 text-slate-400'>{department?.AllowTasks ? <CircleCheckBig size={14} strokeWidth={2} /> : <OctagonX size={14} strokeWidth={2} />} - Allow Tasks </li>
                <li className='text-xs flex gap-1 text-slate-400'><Users size={12} /> - total staffs: {department?.MaximumStaffs} </li>
                <div className="flex justify-end space-x-2 mr-1">
                  <Tooltip title={`${department?.Staffs?.length} staffs`}><li className='text-xs flex gap-1 text-slate-400'><Users size={14} /> {department?.Staffs?.length},</li></Tooltip>
                  <Tooltip title={`${department?.Regions?.length} regions`}><li className='text-xs flex gap-1 text-slate-400'><MapPinned size={14} /> {department?.Regions?.length}</li></Tooltip>
                </div>
              </motion.div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AdminPage