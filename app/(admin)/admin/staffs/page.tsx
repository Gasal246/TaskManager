"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useGetAllStaffs } from '@/query/client/adminQueries'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Staffs = () => {
  const { data: session }: any = useSession();
  const { data: allStaffs, isPending: loadingStaffData } = useGetAllStaffs(session?.user?.id);
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
      {loadingStaffData && 
      <div className='flex gap-2 items-center w-full justify-center h-[70dvh]'>
        <h1>loading...</h1>
        <Image src={'/assets/walk.gif'} alt='walkanimation' width={60} height={60} />
        <h1>please wait...</h1>
      </div>
      }
      {allStaffs && <DataTable columns={columns} data={allStaffs} />}
    </div>
  )
}

export default Staffs