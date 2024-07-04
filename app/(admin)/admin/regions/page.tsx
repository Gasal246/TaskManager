"use client"
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import AddRegionDialog from '@/components/admin/AddRegionDialog'
import { Earth } from 'lucide-react'

const Regions = () => {
  return (
    <div className="p-4 overflow-y-scroll h-full pb-20">
      <div className="flex justify-between">
        <h1 className='font-semibold text-xl'>Region Management</h1>
        <AddRegionDialog trigger={
          <motion.h1 whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='p-2 hover:bg-cyan-950 rounded-full px-6 border-2 border-slate-400 cursor-pointer'>
            Add Region
          </motion.h1>
        } />
      </div>
      <h1>Added regions:</h1>
      <div className='flex flex-wrap'>
        <div className="w-full md:w-3/12 p-1">
          <Link href="/admin/regions/india">
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

export default Regions