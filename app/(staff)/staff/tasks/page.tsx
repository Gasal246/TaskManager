"use client"
import { Avatar, Tooltip } from 'antd'
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
import { Menu } from 'lucide-react'
import Image from 'next/image'

const TasksPage = () => {
  const { data: session }: any = useSession();
  const router = useRouter();
  const { data: newTasks, isLoading: loadingNewTasks } = useGetNewTasks(session?.user?.id);
  const { data: acceptedTasks, isLoading: loadingAcceptedTasks } = useGetAcceptedTasks(session?.user?.id);
  const { data: createdTasks, isLoading: loadingCreatedTasks } = useGetCreatedTasks(session?.user?.id);
  const { data: completedTasks, isLoading: loadingCompletedTasks } = useGetCompletedTasks(session?.user?.id);

  return (
    <div className='p-4'>
      <div className="flex items-center justify-between">
        <h1 className='mb-2'>Your Tasks</h1>
        <Popover>
          <PopoverTrigger><Tooltip title="Click To Add New Task"><Menu /></Tooltip></PopoverTrigger>
          <PopoverContent className='w-[120px] p-1 space-y-1'>
            <Link href={`/staff/tasks/add-task`}><motion.button whileTap={{ scale: 0.98 }} className='w-full bg-slate-600 hover:bg-slate-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Add New Task </motion.button></Link>
          </PopoverContent>
        </Popover>
      </div>
      <Tabs defaultValue="accepted" className="w-full">
        <TabsList className='flex-wrap md:flex-none mb-2 h-[80px] md:h-10'>
          <TabsTrigger value="new" className='flex gap-2' disabled={loadingNewTasks}>{loadingNewTasks ? <LoaderSpin size={20} /> : <>New Tasks <Badge className={`${newTasks?.length <= 0 && 'bg-slate-500'}`}>{newTasks?.length}</Badge></>}</TabsTrigger>
          <TabsTrigger value="accepted" disabled={loadingAcceptedTasks}>{loadingAcceptedTasks ? <LoaderSpin size={20} /> : 'Accepted Tasks'}</TabsTrigger>
          <TabsTrigger value="forwarded">{loadingCreatedTasks ? <LoaderSpin size={20} /> : 'Created Tasks'}</TabsTrigger>
          <TabsTrigger value="completed">{loadingCompletedTasks ? <LoaderSpin size={20} /> : 'Completed Tasks'}</TabsTrigger>
        </TabsList>
        <TabsContent value="new">
          <div className='w-full'>
            <h1 className="text-sm pl-1 my-1">{newTasks?.length > 0 ? 'Latest Tasks:' : "you don't have any new tasks."}</h1>
            {newTasks?.length <= 0 &&
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} animate={{ scale: 1.2 }} className='w-full flex justify-center items-center h-[55dvh]'>
                <Image src={`/icons/noresults.png`} alt='noresults' width={200} height={200} className='opacity-70' />
              </motion.div>}
            <div className="flex flex-wrap">
              {
                newTasks?.map((task: any) => (
                  <div className="w-full lg:w-3/12 p-1" key={task?._id}>
                    <Tooltip title="Click To Open This Task">
                      <Link href={`/staff/tasks/${task?._id}`}>
                        <motion.div whileTap={{ scale: 0.98 }} className="bg-slate-800 border border-slate-600 p-2 rounded-md cursor-pointer shadow-md hover:shadow-lg">
                          <div className="flex gap-1 items-center">
                            <h1>{task?.TaskName}</h1>
                            <h2 className='text-xs text-slate-400'>. just now</h2>
                          </div>
                          <div className='mt-1'>
                            <h1 className='text-xs text-slate-400'>from:</h1>
                            <div className="flex gap-1 items-center mb-1">
                              <Avatar src={task?.Creator?.AvatarUrl || '/avatar.png'} />
                              <div>
                                <h3 className='text-xs leading-3 font-medium flex gap-1 items-center'>{task?.Creator?.Name} <Badge className={`p-0 px-2 ${task?.Priority === 'high' ? 'bg-red-300' : (task?.Priority == 'average' ? 'bg-slate-100' : 'bg-slate-400')} text-[10px] font-bold`}>priority: {task?.Priority}</Badge></h3>
                                <h3 className='text-xs '>{task?.Creator?.Email}</h3>
                              </div>
                            </div>
                            <p className='text-xs text-slate-300'>{task?.Description}<i className='text-slate-400 text-nowrap'>open to view full</i></p>
                          </div>
                        </motion.div>
                      </Link>
                    </Tooltip>
                  </div>
                ))
              }
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
            <div className="flex flex-wrap">
              {
                acceptedTasks?.map((task: any) => (
                  <div className="w-full lg:w-3/12 p-1" key={task?._id}>
                    <Tooltip title="Click To Open This Task">
                      <Link href={`/staff/tasks/${task?._id}`}>
                        <motion.div whileTap={{ scale: 0.98 }} className="bg-slate-800 border border-slate-600 p-2 rounded-md cursor-pointer shadow-md hover:shadow-lg">
                          <div className="flex gap-1 items-center">
                            <h1>{task?.TaskName}</h1>
                            <h2 className='text-xs text-slate-400'>. just now</h2>
                          </div>
                          <div className='mt-1'>
                            <h1 className='text-xs text-slate-400'>from:</h1>
                            <div className="flex gap-1 items-center mb-1">
                              <Avatar src={task?.Creator?.AvatarUrl || '/avatar.png'} />
                              <div>
                                <h3 className='text-xs leading-3 font-medium flex gap-1 items-center'>{task?.Creator?.Name} <Badge className={`p-0 px-2 ${task?.Priority === 'high' ? 'bg-red-300' : (task?.Priority == 'average' ? 'bg-slate-100' : 'bg-slate-400')} text-[10px] font-bold`}>priority: {task?.Priority}</Badge></h3>
                                <h3 className='text-xs '>{task?.Creator?.Email}</h3>
                              </div>
                            </div>
                            <p className='text-xs text-slate-300'>{task?.Description}<i className='text-slate-400 text-nowrap'>open to view full</i></p>
                          </div>
                        </motion.div>
                      </Link>
                    </Tooltip>
                  </div>
                ))
              }
            </div>
          </div>
        </TabsContent>
        <TabsContent value="forwarded">
          <div className='w-full'>
            <h1 className="text-sm pl-1 my-1">{createdTasks?.length > 0 ? 'Owned and Created Tasks:' : <>You do not own any tasks, <i className='text-cyan-500 text-sm font-semibold'>Create a task ?</i></>}</h1>
            {createdTasks?.length <= 0 &&
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} animate={{ scale: 1.2 }} className='w-full flex justify-center items-center h-[55dvh]'>
                <Image src={`/icons/noresults.png`} alt='noresults' width={200} height={200} className='opacity-70' />
              </motion.div>}
            <div className="flex flex-wrap">
              {
                createdTasks?.map((task: any) => (
                  <div className="w-full lg:w-3/12 p-1" key={task?._id}>
                    <Tooltip title="Click To Open This Task">
                      <Link href={`/staff/tasks/${task?._id}`}>
                        <motion.div whileTap={{ scale: 0.98 }} className="bg-slate-800 border border-slate-600 p-2 rounded-md cursor-pointer shadow-md hover:shadow-lg">
                          <div className="flex gap-1 items-center">
                            <h1>{task?.TaskName}</h1>
                            <h2 className='text-xs text-slate-400'>. just now</h2>
                          </div>
                          <div className='mt-1'>
                            <h1 className='text-xs text-slate-400'>from:</h1>
                            <div className="flex gap-1 items-center mb-1">
                              <Avatar src={task?.Creator?.AvatarUrl || '/avatar.png'} />
                              <div>
                                <h3 className='text-xs leading-3 font-medium flex gap-1 items-center'>{task?.Creator?.Name} <Badge className={`p-0 px-2 ${task?.Priority === 'high' ? 'bg-red-300' : (task?.Priority == 'average' ? 'bg-slate-100' : 'bg-slate-400')} text-[10px] font-bold`}>priority: {task?.Priority}</Badge></h3>
                                <h3 className='text-xs '>{task?.Creator?.Email}</h3>
                              </div>
                            </div>
                            <p className='text-xs text-slate-300'>{task?.Description}<i className='text-slate-400 text-nowrap'>open to view full</i></p>
                          </div>
                        </motion.div>
                      </Link>
                    </Tooltip>
                  </div>
                ))
              }
            </div>
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className='w-full'>
            <h1 className="text-sm pl-1 my-1">{completedTasks?.length > 0 ? 'Completed Tasks:' : "You haven't completed any tasks."}</h1>
            {completedTasks?.length <= 0 &&
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} animate={{ scale: 1.2 }} className='w-full flex justify-center items-center h-[55dvh]'>
                <Image src={`/icons/noresults.png`} alt='noresults' width={200} height={200} className='opacity-70' />
              </motion.div>}
            <div className="flex flex-wrap">
              {
                completedTasks?.map((task: any) => (
                  <div className="w-full lg:w-3/12 p-1" key={task?._id}>
                    <Tooltip title="Click To Open This Task">
                      <Link href={`/staff/tasks/${task?._id}`}>
                        <motion.div whileTap={{ scale: 0.98 }} className="bg-slate-800 border border-slate-600 p-2 rounded-md cursor-pointer shadow-md hover:shadow-lg">
                          <div className="flex gap-1 items-center">
                            <h1>{task?.TaskName}</h1>
                            <h2 className='text-xs text-slate-400'>. just now</h2>
                          </div>
                          <div className='mt-1'>
                            <h1 className='text-xs text-slate-400'>from:</h1>
                            <div className="flex gap-1 items-center mb-1">
                              <Avatar src={task?.Creator?.AvatarUrl || '/avatar.png'} />
                              <div>
                                <h3 className='text-xs leading-3 font-medium flex gap-1 items-center'>{task?.Creator?.Name} <Badge className={`p-0 px-2 ${task?.Priority === 'high' ? 'bg-red-300' : (task?.Priority == 'average' ? 'bg-slate-100' : 'bg-slate-400')} text-[10px] font-bold`}>priority: {task?.Priority}</Badge></h3>
                                <h3 className='text-xs '>{task?.Creator?.Email}</h3>
                              </div>
                            </div>
                            <p className='text-xs text-slate-300'>{task?.Description}<i className='text-slate-400 text-nowrap'>open to view full</i></p>
                          </div>
                        </motion.div>
                      </Link>
                    </Tooltip>
                  </div>
                ))
              }
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TasksPage