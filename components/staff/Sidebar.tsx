"use client"
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlarmClockCheck, Captions, EllipsisVertical, Home, LogOut } from 'lucide-react'
import { Avatar, Tooltip } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import { useFindUserById } from '@/query/client/userQueries'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

const StaffSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session }: any = useSession();
    const { data: userData, isLoading: userLoading } = useFindUserById(session?.user?.id)
    return (
        <div className='w-full h-full bg-slate-900 relative'>
            <h1 className='text-center justify-center py-4 flex gap-2 items-center text-lg font-semibold'><Image src="/logo.png" alt='logo' width={30} height={30} /> TaskManager</h1>
            <Link href="/staff">
                <Tooltip title="Home" placement='right'><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={`text-sm ${pathname === '/staff' ? 'bg-primary text-primary-foreground font-semibold border-b border-slate-700' : 'dark:bg-slate-800 bg-slate-50'} w-full p-2 font-medium text-start flex gap-2 items-center hover:border-b hover:border-slate-700`}>
                    <Home size={18} /> Home
                </motion.button></Tooltip>
            </Link>
            <Link href="/staff/tasks">
                <Tooltip title="Tasks" placement='right'><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={`text-sm ${pathname.includes('/staff/tasks') ? 'bg-primary text-primary-foreground font-semibold border-b border-slate-700' : 'dark:bg-slate-800 bg-slate-50'} w-full p-2 font-medium text-start flex gap-2 items-center hover:border-b hover:border-slate-700 justify-between`}>
                    <div className="flex gap-1"><AlarmClockCheck size={18} /> Your Tasks</div> <Badge>01</Badge>
                </motion.button></Tooltip>
            </Link>
            <Link href="/staff/projects">
                <Tooltip title="Projects" placement='right'><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={`text-sm ${pathname.includes('/staff/projects') ? 'bg-primary text-primary-foreground font-semibold border-b border-slate-700' : 'dark:bg-slate-800 bg-slate-50'} w-full p-2 font-medium text-start flex gap-2 items-center hover:border-b hover:border-slate-700 justify-between`}>
                    <div className="flex gap-1"><Captions size={18} /> Your Projects</div> <Badge>01</Badge>
                </motion.button></Tooltip>
            </Link>
        </div>
    )
}

export default StaffSidebar