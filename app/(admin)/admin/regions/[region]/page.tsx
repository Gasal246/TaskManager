"use client"
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { motion } from 'framer-motion'
import AddAreaDialog from '@/components/admin/AddAreaDialog'
import { Earth, LandPlot } from 'lucide-react'

const RegionPage = ({ params }: { params: { region: string } }) => {
    return (
        <div className='p-4 overflow-y-scroll h-full pb-20'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/regions">regions</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{params?.region}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between mt-2">
                <h1 className='font-bold text-2xl'>Region {params?.region}</h1>
                <AddAreaDialog trigger={
                    <motion.h1 whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='p-2 hover:bg-cyan-950 rounded-full px-6 border-2 border-slate-400 cursor-pointer'>
                        Add Area
                    </motion.h1>
                } />
            </div>
            <h1>Added areas:</h1>
            <div className='flex flex-wrap'>
                <div className="w-full md:w-3/12 p-1">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full h-full bg-sky-700 p-2 flex items-center justify-center gap-1 rounded-sm hover:shadow-md cursor-pointer">
                        <LandPlot size={18} />
                        <h1>Kerala</h1>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default RegionPage