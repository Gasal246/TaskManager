"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Badge, Tooltip } from 'antd'
import { usePathname } from 'next/navigation'
import { AlarmClockCheck, ClipboardList, FolderGit2, Home } from 'lucide-react'

const MobileBottomBar = () => {
    const pathname = usePathname();
    return (
        <div className="bg-black/90 w-full p-1 pt-2 flex items-center justify-center gap-5">
            <Link href="/staff">
                <Tooltip title="Home"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={`${pathname === '/staff' ? 'text-white border-b-2 border-orange-300' : 'text-slate-500'}`}>
                    <Home size={30} /></motion.button></Tooltip>
            </Link>
            <Link href="/staff/tasks">
                <Tooltip title="Tasks"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Badge count={1} size='small'><ClipboardList size={30} className={`${pathname.includes('/staff/tasks') ? 'text-white border-b-2 border-orange-300' : 'text-slate-500'}`} /></Badge>
                </motion.button></Tooltip>
            </Link>
            <Link href="/staff/projects">
                <Tooltip title="Projects"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Badge count={1} size='small'><FolderGit2 size={30} className={`${pathname.includes('/staff/projects') ? 'text-white border-b-2 border-orange-300' : 'text-slate-500'}`} /></Badge>
                </motion.button></Tooltip>
            </Link>
        </div>
    )
}

export default MobileBottomBar