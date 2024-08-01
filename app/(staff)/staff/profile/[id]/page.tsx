"use client"
import ProfilPageSkeleton from '@/components/skeletons/ProfilPageSkeleton'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useFindUserById } from '@/query/client/userQueries'
import { Avatar } from 'antd'
import { EllipsisVertical } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'
import { motion } from 'framer-motion'
import EditUserInfoDialog from '@/components/staff/EditUserInfoDialog'
import ChangeDpDialog from '@/components/admin/ChangeDpDialog'

const ProfilPage = ({ params }: { params: { id: string } }) => {
    const { data: session }: any = useSession();
    const { data: userData, isLoading: loadingUserData } = useFindUserById(session?.user?.id);
    return (
        <div className='w-full h-full'>
            {loadingUserData ?
                <div className="flex w-full h-[70dvh] justify-center items-center">
                    <ProfilPageSkeleton />
                </div> : (userData ?
                    <>

                        <div className="flex flex-col pt-10 w-full items-center justify-center">
                            <div className="flex gap-1 justify-start">
                                <Avatar size={150} src={userData?.AvatarUrl || '/avatar.png'} />
                                {userData && userData?._id == session?.user?.id && <div>
                                    <Popover>
                                        <PopoverTrigger className='bg-black p-1 rounded-full'><EllipsisVertical size={16} /></PopoverTrigger>
                                        <PopoverContent className='w-[130px] p-1 space-y-1'>
                                            <ChangeDpDialog trigger={
                                                <motion.h1 className='bg-slate-800 text-sm text-center p-1 rounded-sm hover:bg-slate-900 cursor-pointer border border-slate-700'>Edit Pic</motion.h1>
                                            } userid={session?.user?.id} prevAvatar={userData?.AvatarUrl || '/avatar.png'} />
                                            <EditUserInfoDialog trigger={
                                                <motion.h1 className='bg-slate-800 text-sm text-center p-1 rounded-sm hover:bg-slate-900 cursor-pointer border border-slate-700'>Edit Info</motion.h1>
                                            } userData={userData} />
                                            <motion.h1 className='bg-slate-800 text-sm text-center p-1 rounded-sm hover:bg-slate-900 cursor-pointer border border-slate-700'>Reset Password</motion.h1>
                                        </PopoverContent>
                                    </Popover>
                                </div>}
                            </div>
                            <div className='flex justify-center flex-col items-center mt-1'>
                                <h1 className='font-medium'>{userData?.Name}</h1>
                                <h1 className='text-sm font-medium leading-3'>{userData?.Email}</h1>
                            </div>
                        </div>
                    </> : <h1 className='text-center'>No User Found</h1>
                )}
        </div>
    )
}

export default ProfilPage