"use client"
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import AddDepartmentRegion from '@/components/admin/AddDepartmentRegion'
import { Earth, SquareCheckBig, SquareX } from 'lucide-react'
import { useGetDepartmentById } from '@/query/client/adminQueries'
import LoaderSpin from '@/components/shared/LoaderSpin'
import { Avatar, Tooltip } from 'antd'
import AddDepartmentHead from '@/components/admin/AddDepartmentHead'


const Department = ({ params }: { params: { department: string } }) => {
    const { data: department, isLoading: loadingDepartment } = useGetDepartmentById(params?.department);
    return (
        <div className='p-4 overflow-y-scroll h-screen pb-20'>
            {
                loadingDepartment ? <div className="w-full h-full justify-center items-center flex"> <LoaderSpin size={60} /></div> :
                    <>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/departments">Departments</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{loadingDepartment ? <LoaderSpin size={20} /> : department?.DepartmentName}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex justify-between">
                            <div>
                                <div className="">
                                    <h1 className='font-bold text-2xl'>{department?.DepartmentName}</h1>
                                    <div className="flex gap-3 items-center mb-2">
                                        {<h4 className={`${department?.AllowProjects ? 'text-green-300' : 'text-red-300'} text-xs font-medium flex items-center gap-1`}>Allowed Projects {department?.AllowProjects ? <SquareCheckBig size={16} /> : <SquareX size={16} />}</h4>}
                                        {<h4 className={`${department?.AllowTasks ? 'text-green-300' : 'text-red-300'} text-xs font-medium flex items-center gap-1`}>Allowed Tasks {department?.AllowTasks ? <SquareCheckBig size={16} /> : <SquareX size={16} />}</h4>}
                                    </div>
                                </div>
                                <div className="flex gap-1 items-center">
                                    {department?.DepartmentHead && <Avatar src={`${department?.DepartmentHead?.AvatarUrl ? department?.DepartmentHead?.AvatarUrl : '/avatar.png'}`} size={40} />}
                                    {
                                        department?.DepartmentHead ?
                                            <Tooltip title="Department Head" placement='right'>
                                                <div>
                                                    <h1 className='font-medium text-sm leading-3'>{department?.DepartmentHead?.Name}</h1>
                                                    <h1 className='font-medium text-xs'>{department?.DepartmentHead?.Email}</h1>
                                                </div>
                                            </Tooltip>
                                            : <h1 className="text-xs text-orange-500">no head added to this department</h1>
                                    }
                                </div>
                                <div className="flex gap-2 items-center mt-2">
                                    <h1 className='text-xs font-medium bg-black p-2 rounded-sm'>Max Staffs Allowed: <b className='text-blue-400'>{department?.MaximumStaffs}</b></h1>
                                    <h1 className='text-xs font-medium bg-black p-2 rounded-sm'>Total Staffs Added: <b className='text-orange-300'>{department?.Staffs?.length}</b></h1>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <AddDepartmentRegion trigger={
                                    <motion.h1 whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='p-1 hover:bg-cyan-950 rounded-sm px-3 border-2 border-slate-400 cursor-pointer'>
                                        Add Dep Region
                                    </motion.h1>
                                } depid={department?._id} />
                                <AddDepartmentHead trigger={
                                    <motion.h1 whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='p-1 hover:bg-cyan-950 rounded-sm px-3 border-2 border-slate-400 cursor-pointer'>
                                        Add Dep Head
                                    </motion.h1>
                                } departmentId={department?._id} />
                            </div>
                        </div>
                        <h1 className='mt-3'>Department Regions ({department?.Regions?.length})</h1>
                        <div className='flex flex-wrap'>
                            {department?.Regions?.map((region: any) => (
                                <div className="w-full md:w-3/12 p-1" key={region?._id}>
                                    <Link href={`/admin/departments/${department?._id}/${region?.RegionId?._id}`}>
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full h-full bg-sky-700 p-2 flex items-center justify-center gap-1 rounded-sm hover:shadow-md cursor-pointer">
                                            <Earth size={18} />
                                            <h1>{region?.RegionId?.RegionName}</h1>
                                        </motion.div>
                                    </Link>
                                </div>
                            ))}
                        </div></>
            }
        </div>
    )
}

export default Department