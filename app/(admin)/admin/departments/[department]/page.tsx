"use client"
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import AddDepartmentRegion from '@/components/admin/AddDepartmentRegion'
import { Earth } from 'lucide-react'


const Department = ({ params }: { params: { department: string } }) => {
    return (
        <div className='p-4 overflow-y-scroll h-screen pb-20'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/departments">departments</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{'Some Department'}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between">
                <h1 className='font-bold text-2xl'>Some Department</h1>
                <AddDepartmentRegion trigger={
                    <motion.h1 whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='p-2 hover:bg-cyan-950 rounded-full px-6 border-2 border-slate-400 cursor-pointer'>
                        Add Dep Region
                    </motion.h1>
                } />
            </div>
            <h1 className='mt-3'>Department Regions (1)</h1>
            <div className='flex flex-wrap'>
                <div className="w-full md:w-3/12 p-1">
                    <Link href="/admin/departments/ejl1k2jk1/india">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full h-full bg-sky-700 p-2 flex items-center justify-center gap-1 rounded-sm hover:shadow-md cursor-pointer">
                            <Earth size={18} />
                            <h1>India</h1>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Department