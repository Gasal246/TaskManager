"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DashboardIcon } from '@radix-ui/react-icons'
import { Bone, CalendarCheck, EarthIcon, PanelsTopLeft, Pyramid, SquareLibrary, UsersIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { useGetAllProjectAnalytics } from '@/query/client/analyticsQueries'
import { useSession } from 'next-auth/react'

const AdminSidebar = () => {
    const { data: session }: any = useSession();
    const pathname = usePathname();
    const { data: projectsAnalytics, isLoading: loadingProjectAnalytics }: any = useGetAllProjectAnalytics(session?.user?.id, 'all');
    return (
        <div className={`w-full h-full dark:bg-slate-900 bg-slate-400 relative overflow-hidden`}>
            <Link href="/admin">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${pathname === '/admin' ? 'dark:bg-cyan-950 bg-blue-400 border-b border-slate-700' : 'dark:bg-slate-800 bg-slate-50'} w-full p-2 font-medium text-start flex gap-2 items-center hover:border-b hover:border-slate-700`}>
                    <DashboardIcon /> Admin Dashboard
                </motion.button>
            </Link>
            <Link href="/admin/staffs">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${pathname.includes('/staffs') ? 'dark:bg-cyan-950 bg-blue-400 border-b border-slate-700' : 'dark:bg-slate-800 bg-slate-50'} w-full p-2 font-medium text-start flex gap-2 items-center hover:border-b hover:border-slate-700`}>
                    <UsersIcon size={18} /> Manage Staffs
                </motion.button>
            </Link>
            <Link href="/admin/clients">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${pathname.includes('/clients') ? 'dark:bg-cyan-950 bg-blue-400 border-b border-slate-700' : 'dark:bg-slate-800 bg-slate-50'} w-full p-2 font-medium text-start flex items-center justify-between hover:border-b hover:border-slate-700`}>
                    <div className="flex gap-2 items-center"><Pyramid size={18} /> Manage Clients</div> <Badge className='p-0 px-2'>0</Badge>
                </motion.button>
            </Link>
            <Link href="/admin/departments">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${pathname.includes('/departments') ? 'dark:bg-cyan-950 bg-blue-400 border-b border-slate-700' : 'dark:bg-slate-800 bg-slate-50'} w-full p-2 font-medium text-start flex gap-2 items-center hover:border-b hover:border-slate-700`}>
                    <SquareLibrary size={18} /> Manage Departments
                </motion.button>
            </Link>
            <Link href="/admin/projects">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${pathname.includes('/projects') ? 'dark:bg-cyan-950 bg-blue-400 border-b border-slate-700' : 'dark:bg-slate-800 bg-slate-50'} w-full p-2 font-medium text-start flex items-center justify-between hover:border-b hover:border-slate-700`}>
                    <div className="flex gap-2 items-center"><PanelsTopLeft size={18} /> Manage Projects</div> {projectsAnalytics?.unopenedProjects?.length > 0 && <Badge className='p-0 px-2'>{projectsAnalytics?.unopenedProjects?.length}</Badge>}
                </motion.button>
            </Link>
            <Link href="/admin/tasks">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${pathname.includes('/tasks') ? 'dark:bg-cyan-950 bg-blue-400 border-b border-slate-700' : 'dark:bg-slate-800 bg-slate-50'} w-full p-2 font-medium text-start flex gap-2 items-center hover:border-b hover:border-slate-700`}>
                    <CalendarCheck size={18} /> Manage Tasks
                </motion.button>
            </Link>
            <Link href="/admin/regions">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${pathname.includes('/regions') ? 'dark:bg-cyan-950 bg-blue-400 border-b border-slate-700' : 'dark:bg-slate-800 bg-slate-50'} w-full p-2 font-medium text-start flex gap-2 items-center hover:border-b hover:border-slate-700`}>
                    <EarthIcon size={18} /> Manage Regions
                </motion.button>
            </Link>
            <Link href="/admin/skills">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${pathname.includes('/skills') ? 'dark:bg-cyan-950 bg-blue-400 border-b border-slate-700' : 'dark:bg-slate-800 bg-slate-50'} w-full p-2 font-medium text-start flex gap-2 items-center hover:border-b hover:border-slate-700`}>
                    <Bone size={18} /> Manage Skills
                </motion.button>
            </Link>
        </div>
    )
}

export default AdminSidebar