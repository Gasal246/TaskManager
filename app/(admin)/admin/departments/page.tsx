"use client"
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const Departments = () => {
  return (
    <div className='p-4'>
      <div className="flex justify-between">
        <h1 className='font-bold text-2xl'>Department Management</h1>
      </div>
      <h1 className='mt-3'>Your Departments:</h1>
      <div className='flex flex-wrap'>
        <div className="w-full md:w-3/12 p-1">
          <Link href="/admin/departments/ejl1k2jk1">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full h-full bg-sky-700 p-2 flex items-center justify-center gap-1 rounded-sm hover:shadow-md cursor-pointer">
              <h1 className='font-bold '>Sales Department</h1>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Departments
