"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import AddDepartmentArea from '@/components/admin/AddDepartmentArea'
import Link from 'next/link'
import { Earth, LandPlot } from 'lucide-react'
import { useRouter } from 'next/navigation'

const DepartmentRegion = ({ params }: { params: { department: string, region: string } }) => {
  const router = useRouter()
  return (
    <div className='p-4 overflow-y-scroll h-screen pb-20'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/departments">departments</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/admin/departments/${params?.department}`}>{'Some Department'}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{'region India'}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between">
        <h1 className='font-bold text-2xl'>Region India</h1>
        <AddDepartmentArea trigger={
          <motion.h1 whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='p-2 hover:bg-cyan-950 rounded-full px-6 border-2 border-slate-400 cursor-pointer'>
            Add Dep Area
          </motion.h1>
        } />
      </div>
      <h1 className='mt-3'>Regional Areas (1)</h1>
      <div className='flex flex-wrap'>
        <div className="w-full md:w-3/12 p-1">
          <Link href={`/admin/departments/${params?.department}/${params?.region}/kerala`}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full h-full bg-sky-700 p-2 flex items-center justify-center gap-1 rounded-sm hover:shadow-md cursor-pointer">
              <LandPlot size={18} />
              <h1>Kerala</h1>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DepartmentRegion