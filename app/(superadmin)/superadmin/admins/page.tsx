"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const AdminsManaging = () => {

    return (
        <div className='p-4'>
            <div className="flex justify-between">
                <h1 className='font-semibold text-xl'>Admin Management</h1>
                <Link href="/superadmin/admins/add-admin">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='p-2 hover:bg-cyan-950 rounded-full px-6 border-2 border-slate-400 cursor-pointer'>
                        Add Admins
                    </motion.button>
                </Link>
            </div>
        </div>
    )
}

export default AdminsManaging