"use client"
import { useFindUserById, useGetAllNotifications } from '@/query/client/userQueries';
import { Avatar, Badge, Popconfirm, Tooltip } from 'antd';
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { motion } from 'framer-motion';
import { Bell, CircleUser } from 'lucide-react';
import { ExitIcon } from '@radix-ui/react-icons';
import NotificationPane from '../shared/NotificationPane';

const StaffTopbar = () => {
    const router = useRouter();
    const { data: session }: any = useSession();
    const { data: userData, isLoading: userLoading } = useFindUserById(session?.user?.id);
    const { data: notifications, isLoading: notificationsLoading } = useGetAllNotifications(session?.user?.id);
    const [newNotifications, setNewNotifications] = useState(0);
    useEffect(() => {
        if(notifications){
            const newest = notifications?.filter((notification: any) => notification?.IsOpened == false );
            setNewNotifications(newest?.length);
        }else{
            setNewNotifications(0);
        }
    }, [notifications])
    return (
        <div className='w-full bg-slate-900 p-1 flex justify-between items-center px-3'>
            <div></div>
            <div className='flex gap-5 items-center'>
                <NotificationPane trigger={
                    <div className='pt-2 cursor-pointer'>
                        <Tooltip title={newNotifications <= 0 ? 'no new notifications.' : `${newNotifications} new notifications`}>
                            <Badge count={newNotifications} size='small'>
                                <Bell className='text-primary' size={20} />
                            </Badge>
                        </Tooltip>
                    </div>
                } />
                {userData && <Popover>
                    <PopoverTrigger>
                        <div className='flex gap-1 items-center cursor-pointer'>
                            <div>
                                <h1 className='text-slate-400 text-end text-sm leading-3'>{userData?.Name}</h1>
                                <h2 className='text-slate-400 text-end text-xs'>{userData?.Email}</h2>
                            </div>
                            <Avatar src={userData?.AvatarUrl || '/avatar.png'} />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className='w-[120px] p-1 space-y-1'>
                        <motion.button onClick={() => router.push(`/staff/profile/${session?.user?.id}`)} whileTap={{ scale: 0.98 }} className='w-full bg-secondary hover:bg-slate-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'><CircleUser size={16} strokeWidth={2} /> Profile </motion.button>
                        <Popconfirm
                            title="SignOut  TaskManager"
                            description={`Hey!! ${userData?.Name?.split(' ')[0]}, Are you trying to signOut of application ?`}
                            onConfirm={() => signOut()}
                            okText="Yes"
                            cancelText="No"
                            placement='bottomRight'
                        ><motion.h1 whileTap={{ scale: 0.98 }} className='w-full bg-destructive text-destructive-foreground hover:bg-red-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'><ExitIcon /> Sign Out</motion.h1></Popconfirm>
                    </PopoverContent>
                </Popover>}
            </div>
        </div>
    )
}

export default StaffTopbar