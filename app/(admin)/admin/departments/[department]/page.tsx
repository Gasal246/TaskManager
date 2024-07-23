"use client"
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import AddDepartmentRegion from '@/components/admin/AddDepartmentRegion'
import { Earth } from 'lucide-react'
import { useGetDepartmentById } from '@/query/client/adminQueries'
import LoaderSpin from '@/components/shared/LoaderSpin'
import { Avatar, Tooltip } from 'antd'
import AddDepartmentHead from '@/components/admin/AddDepartmentHead'


const Department = ({ params }: { params: { department: string } }) => {
    const { data: department, isLoading: loadingDepartment } = useGetDepartmentById(params?.department);
    return (
        <div className='p-4 overflow-y-scroll h-screen pb-20'>
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
                    <h1 className='font-bold text-2xl'>{department?.DepartmentName}</h1>
                    <div className="flex gap-1 items-center">
                        {department?.DepartmentHead && <Avatar src={`${department?.DepartmentHead?.AvatarUrl ? department?.DepartmentHead?.AvatarUrl : '/avatar.png'}`} size={40} />}
                        {
                            department?.DepartmentHead ?
                                <Tooltip title="Department Head" placement='right'>
                                    <div>
                                        <h1 className='text-xs'>{department?.DepartmentHead?.Name}</h1>
                                        <h1 className='text-xs'>{department?.DepartmentHead?.Email}</h1>
                                    </div>
                                </Tooltip>
                                : <h1 className="text-xs text-orange-500">no head added to this department</h1>
                        }

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
            </div>
        </div>
    )
}

export default Department