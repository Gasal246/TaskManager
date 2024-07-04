"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Staffs = () => {
  return (
    <div className='p-4'>
      <div className="flex justify-between">
        <h1 className='font-semibold text-xl'>Staff Management</h1>
        <Link href="/admin/staffs/add-staff">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='p-2 hover:bg-cyan-950 rounded-full px-6 border-2 border-slate-400 cursor-pointer'>
            Add staff
          </motion.button>
        </Link>
      </div>
      {/* ADD STAFF LISTING TABLE ONCE YOU ADDED THEM ALL.. */}
    </div>
  )
}

export default Staffs