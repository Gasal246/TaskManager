"use client"
import { Avatar, Popconfirm, Tooltip } from 'antd'
import React from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useGetAcceptedTasks, useGetCompletedTasks, useGetCreatedTasks, useGetNewTasks } from '@/query/client/userQueries'
import { useSession } from 'next-auth/react'
import LoaderSpin from '@/components/shared/LoaderSpin'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { CalendarCheck, CalendarPlus, Flag, LayoutList, Menu, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const TasksPage = () => {
  const { data: session }: any = useSession();
  const router = useRouter();
  const { data: newTasks, isLoading: loadingNewTasks } = useGetNewTasks(session?.user?.id);
  const { data: acceptedTasks, isLoading: loadingAcceptedTasks } = useGetAcceptedTasks(session?.user?.id);
  const { data: createdTasks, isLoading: loadingCreatedTasks } = useGetCreatedTasks(session?.user?.id);
  const { data: completedTasks, isLoading: loadingCompletedTasks } = useGetCompletedTasks(session?.user?.id);

  const handleDeleteTask = (taskid: string) => {

  }

  return (
    <div className='p-4'>
      <div className="flex items-center justify-between bg-slate-950/50 rounded-lg p-3 mb-3">
        <h1 className='font-medium flex gap-1 items-center'><CalendarCheck size={18} /> Manage Tasks</h1>
        <Button onClick={() => router.push(`/staff/tasks/add-task`)} className='flex gap-1'><CalendarPlus size={16} />New Task</Button>
      </div>
      <Tabs defaultValue="accepted" className="w-full bg-slate-950/50 p-3 rounded-lg">
        <TabsList className='flex-wrap md:flex-none mb-2 h-[80px] md:h-10'>
          <TabsTrigger value="new" className='flex gap-2' disabled={loadingNewTasks}>{loadingNewTasks ? <LoaderSpin size={20} /> : <>New Tasks <Badge className={`${newTasks?.length <= 0 && 'bg-slate-500'}`}>{newTasks?.length}</Badge></>}</TabsTrigger>
          <TabsTrigger value="accepted" disabled={loadingAcceptedTasks}>{loadingAcceptedTasks ? <LoaderSpin size={20} /> : 'Accepted Tasks'}</TabsTrigger>
          <TabsTrigger value="forwarded">{loadingCreatedTasks ? <LoaderSpin size={20} /> : 'Created Tasks'}</TabsTrigger>
          <TabsTrigger value="completed">{loadingCompletedTasks ? <LoaderSpin size={20} /> : 'Completed Tasks'}</TabsTrigger>
        </TabsList>
        <TabsContent value="new">
          <div className='w-full'>
            <h1 className="text-sm pl-1 my-1">{newTasks?.length > 0 ? 'Latest Tasks:' : "you don't have any new tasks."}</h1>
            {/* {newTasks?.length <= 0 &&
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} animate={{ scale: 1.2 }} className='w-full flex justify-center items-center h-[55dvh]'>
                <Image src={`/icons/noresults.png`} alt='noresults' width={200} height={200} className='opacity-70' />
              </motion.div>} */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 p-1">
                <Tooltip title="Click To Open This Task">
                  <motion.div onClick={() => router.push(`/staff/tasks/taskid`)} whileTap={{ scale: 0.98 }} className="p-2 rounded-lg bg-neutral-800/90 border border-neutral-800 hover:border-neutral-600 select-none cursor-pointer">
                    <div className="flex justify-between items-center px-1 mb-1">
                      <h1 className='font-semibold'>Task Name</h1>
                      <Popconfirm title="Delete this Task?" description="Are you sure wanna delete this task." onConfirm={() => handleDeleteTask('123')}><motion.div whileHover={{ rotate: -35 }}><Trash2 color='red' size={18} /></motion.div></Popconfirm>
                    </div>
                    <div className="flex gap-1 items-center p-1 mb-1">
                      <Avatar src="/avatar.png" size={20} />
                      <h1 className='text-xs font-medium text-neutral-200'>creator@gmail.com <span className='italic font-normal text-neutral-300'>&#x2022; just now</span></h1>
                    </div>
                    <div className='px-2 mb-2 flex gap-3'>
                      <Tooltip title="priority"><h2 className='text-sm text-red-400 border border-red-400 p-1 px-2 rounded-lg flex items-center gap-1 font-semibold'><Flag fill='tomato' size={12} />2 HIGH</h2></Tooltip>
                      <Tooltip title="activities"><h2 className='text-sm text-blue-300 border border-blue-300 p-1 px-2 rounded-lg flex items-center gap-1'><LayoutList size={12} fill='blue' />5</h2></Tooltip>
                    </div>
                    <div className="flex justify-between gap-1">
                      <div className='bg-slate-950/50 p-2 rounded-lg w-full'>
                        <h3 className='text-xs font-medium leading-3 text-slate-400'>created at</h3>
                        <h4 className='text-xs text-slate-200'>2024-12-06</h4>
                      </div>
                      <div className='bg-slate-950/50 p-2 rounded-lg w-full'>
                        <h3 className='text-xs font-medium leading-3 text-slate-400'>deadline on</h3>
                        <h4 className='text-xs text-slate-200'>2024-12-10</h4>
                      </div>
                      <div className='bg-slate-950/50 p-2 rounded-lg w-full flex justify-center items-center'>
                        <h3 className='text-xs font-medium leading-3 text-slate-400'>2 days</h3>
                      </div>
                    </div>
                    <div className='flex gap-1 items-center mt-2'>
                      <Progress value={67} /> <span className='text-xs'>67%</span>
                    </div>
                  </motion.div>
                </Tooltip>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="accepted">
          <div className='w-full'>
            <h1 className="text-sm pl-1 my-1">{acceptedTasks?.length > 0 ? 'Accepted Tasks:' : "It seems like you haven't accepted any tasks."}</h1>
            {acceptedTasks?.length <= 0 &&
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} animate={{ scale: 1.2 }} className='w-full flex justify-center items-center h-[55dvh]'>
                <Image src={`/icons/noresults.png`} alt='noresults' width={200} height={200} className='opacity-70' />
              </motion.div>}
          </div>
        </TabsContent>
        <TabsContent value="forwarded">
          <div className='w-full'>
            <h1 className="text-sm pl-1 my-1">{createdTasks?.length > 0 ? 'Owned and Created Tasks:' : <>You do not own any tasks, <i className='text-cyan-500 text-sm font-semibold'>Create a task ?</i></>}</h1>
            {createdTasks?.length <= 0 &&
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} animate={{ scale: 1.2 }} className='w-full flex justify-center items-center h-[55dvh]'>
                <Image src={`/icons/noresults.png`} alt='noresults' width={200} height={200} className='opacity-70' />
              </motion.div>}
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className='w-full'>
            <h1 className="text-sm pl-1 my-1">{completedTasks?.length > 0 ? 'Completed Tasks:' : "You haven't completed any tasks."}</h1>
            {completedTasks?.length <= 0 &&
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} animate={{ scale: 1.2 }} className='w-full flex justify-center items-center h-[55dvh]'>
                <Image src={`/icons/noresults.png`} alt='noresults' width={200} height={200} className='opacity-70' />
              </motion.div>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TasksPage