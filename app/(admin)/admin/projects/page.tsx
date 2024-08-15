"use client"
import React from 'react'
import { ArrowUpWideNarrow, Circle, Dot, Menu, SortAsc, SortDesc, Trash2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { motion } from 'framer-motion';
import { Avatar, Badge, ConfigProvider, GetProps, Input, Popconfirm, Tooltip } from 'antd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress"
import Link from 'next/link';
import { useRouter } from 'next/navigation';


type SearchProps = GetProps<typeof Input.Search>;

const ProjectsPage = () => {
  const { Search } = Input;
  const router = useRouter();
  const handleSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    console.log(info?.source, value)
  }

  const handleDeleteProject = async (projectid: string) => {
    // SOFT DELETE PROJECT AND DELETE PERMENENTLY AFTER 7DAYS
  }
  return (
    <div className='p-4'>
      <div className="flex justify-between bg-slate-950/50 p-3 rounded-lg items-center">
        <h1 className='font-bold'>Project Management</h1>
        {/* ADD PROJECT OPTION FOR STAFFS AND ADMIN IN COMMMON WAY HERE GOES BACK IN TIME HERE GO FOR MOSQUE */}
        <Popover>
          <PopoverTrigger className='p-2 bg-slate-600 rounded-lg hover:bg-slate-700 cursor-pointer'><ArrowUpWideNarrow /></PopoverTrigger>
          <PopoverContent className='w-[140px] p-1 mr-3'>
            <div className="flex flex-col gap-1">
              <h4 className='flex items-center justify-between text-sm text-black bg-neutral-100 p-1 px-2 rounded-sm font-medium hover:bg-neutral-300 cursor-pointer'>High Priority <SortAsc color='black' /></h4>
              <h4 className='flex items-center justify-between text-sm text-black bg-neutral-100 p-1 px-2 rounded-sm font-medium hover:bg-neutral-300 cursor-pointer'>Low Priority <SortDesc color='black' /></h4>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="bg-slate-950/50 p-3 rounded-lg mt-3">
        <div className='mb-5'>
          <ConfigProvider
            theme={{
              token: { colorTextPlaceholder: 'gray' },
            }}
          ><Search placeholder="search projects" onSearch={handleSearch} className='w-full lg:w-1/2' /></ConfigProvider>
        </div>

        <Tabs defaultValue="new" className="w-full">
          <TabsList className="grid w-full grid-cols-5 gap-1 border border-slate-700">
            <div className='px-2'><Badge count={1} size='small' className='w-full text-neutral-400 '><TabsTrigger value="new" className='flex items-center gap-3 w-full border border-slate-950'>New Projects</TabsTrigger></Badge></div>
            <div className='px-2'><TabsTrigger value="ongoing" className='flex items-center gap-3 w-full border border-slate-950'>Ongoing Projects</TabsTrigger></div>
            <div className='px-2'><TabsTrigger value="owned" className='flex items-center gap-3 w-full border border-slate-950'>Owned Projects</TabsTrigger></div>
            <div className='px-2'><TabsTrigger value="deleted" className='flex items-center gap-3 w-full border border-slate-950'>Deleted Projects</TabsTrigger></div>
            <div className='px-2'><TabsTrigger value="ended" className='flex items-center gap-3 w-full border border-slate-950'>Ended Projects</TabsTrigger></div>
          </TabsList>
          <TabsContent value="new">
            <Card className='border-slate-700'>
              <CardHeader className='p-3 px-4'><CardTitle>Newest Projects</CardTitle></CardHeader>
              <CardContent className="p-3 w-full flex flex-wrap">
                <div className="w-full lg:w-4/12 p-1">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => router.push('/admin/projects/projectid')} className="bg-neutral-700/70 p-3 rounded-lg cursor-pointer select-none">
                    <div className="flex justify-between px-1">
                      <h1 className='text-sm font-medium'>Project Name</h1>
                      <Popconfirm title="Delete this project?" description="deleted projects will be in your trash for 7days, and deleted permenently." onConfirm={() => handleDeleteProject('123')}><motion.div whileHover={{ rotate: -35 }}><Trash2 color='red' size={18} /></motion.div></Popconfirm>
                    </div>
                    <Link href={`/admin/staff/${'staffid'}`}><div className="flex gap-1 bg-slate-950/50 p-2 rounded-lg items-center mt-2 mb-1">
                      <Avatar src="/avatar.png" size={26} />
                      <div>
                        <h1 className='text-xs font-medium leading-3'>Creator Name</h1>
                        <h1 className='text-xs'>creator@gmail.com</h1>
                      </div>
                    </div></Link>
                    <div className='flex justify-between gap-1 mb-1'>
                      <Tooltip title="2023-12-06"><div className='bg-slate-950/60 p-1 px-2 rounded-lg w-1/2'>
                        <h2 className='text-neutral-300 text-[11px] leading-3'>Created On</h2>
                        <h2 className='text-slate-300 text-[10px]'>just now</h2>
                      </div></Tooltip>
                      <Tooltip title="2023-12-06"><div className='bg-slate-950/60 p-1 px-2 rounded-lg w-1/2'>
                        <h2 className='text-neutral-300 text-[11px] leading-3'>Created On</h2>
                        <h2 className='text-slate-300 text-[10px]'>just now</h2>
                      </div></Tooltip>
                    </div>
                    <div className='px-2 mb-2'>
                      <h2 className='text-xs text-red-400 flex items-center gap-1 font-medium'><Circle size={10} fill="" strokeWidth={5} />HIGH priority</h2>
                      <h2 className='text-xs text-orange-400 flex items-center gap-1 font-medium'><Circle size={10} fill="" strokeWidth={5} />waiting approval</h2>
                    </div>
                    <div className='flex gap-1 items-center'>
                      <Progress value={67} /> <span className='text-xs'>67%</span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ongoing">
            <Card className='border-slate-700'>
              <CardHeader className='p-3'><CardTitle>Ongoing Projects</CardTitle></CardHeader>
              <CardContent className="p-3 w-full flex flex-wrap">
                <div className="w-full lg:w-4/12 p-1">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-neutral-700/70 p-3 rounded-lg cursor-pointer select-none">
                    <div className="flex justify-between px-1">
                      <h1 className='text-sm font-medium'>Project Name</h1>
                      <Popconfirm title="Delete this project?" description="deleted projects will be in your trash for 7days, and deleted permenently." onConfirm={() => handleDeleteProject('123')}><motion.div whileHover={{ rotate: -35 }}><Trash2 color='red' size={18} /></motion.div></Popconfirm>
                    </div>
                    <Link href={`/admin/staff/${'staffid'}`}><div className="flex gap-1 bg-slate-950/50 p-2 rounded-lg items-center mt-2 mb-1">
                      <Avatar src="/avatar.png" size={26} />
                      <div>
                        <h1 className='text-xs font-medium leading-3'>Creator Name</h1>
                        <h1 className='text-xs'>creator@gmail.com</h1>
                      </div>
                    </div></Link>
                    <div className='flex justify-between gap-1 mb-1'>
                      <Tooltip title="2023-12-06"><div className='bg-slate-950/60 p-1 px-2 rounded-lg w-1/2'>
                        <h2 className='text-neutral-300 text-[11px] leading-3'>Created On</h2>
                        <h2 className='text-slate-300 text-[10px]'>just now</h2>
                      </div></Tooltip>
                      <Tooltip title="2023-12-06"><div className='bg-slate-950/60 p-1 px-2 rounded-lg w-1/2'>
                        <h2 className='text-neutral-300 text-[11px] leading-3'>Created On</h2>
                        <h2 className='text-slate-300 text-[10px]'>just now</h2>
                      </div></Tooltip>
                    </div>
                    <div className='px-2 mb-2'>
                      <h2 className='text-xs text-red-400 flex items-center gap-1 font-medium'><Circle size={10} fill="" strokeWidth={5} />HIGH priority</h2>
                      <h2 className='text-xs text-orange-400 flex items-center gap-1 font-medium'><Circle size={10} fill="" strokeWidth={5} />waiting approval</h2>
                    </div>
                    <div className='flex gap-1 items-center'>
                      <Progress value={67} /> <span className='text-xs'>67%</span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="owned">
            <Card className='border-slate-700'>
              <CardHeader className='p-3'><CardTitle>Owned Projects</CardTitle></CardHeader>
              <CardContent className="p-3 w-full flex flex-wrap">
                <div className="w-full lg:w-4/12 p-1">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-neutral-700/70 p-3 rounded-lg cursor-pointer select-none">
                    <div className="flex justify-between px-1">
                      <h1 className='text-sm font-medium'>Project Name</h1>
                      <Popconfirm title="Delete this project?" description="deleted projects will be in your trash for 7days, and deleted permenently." onConfirm={() => handleDeleteProject('123')}><motion.div whileHover={{ rotate: -35 }}><Trash2 color='red' size={18} /></motion.div></Popconfirm>
                    </div>
                    <Link href={`/admin/staff/${'staffid'}`}><div className="flex gap-1 bg-slate-950/50 p-2 rounded-lg items-center mt-2 mb-1">
                      <Avatar src="/avatar.png" size={26} />
                      <div>
                        <h1 className='text-xs font-medium leading-3'>Creator Name</h1>
                        <h1 className='text-xs'>creator@gmail.com</h1>
                      </div>
                    </div></Link>
                    <div className='flex justify-between gap-1 mb-1'>
                      <Tooltip title="2023-12-06"><div className='bg-slate-950/60 p-1 px-2 rounded-lg w-1/2'>
                        <h2 className='text-neutral-300 text-[11px] leading-3'>Created On</h2>
                        <h2 className='text-slate-300 text-[10px]'>just now</h2>
                      </div></Tooltip>
                      <Tooltip title="2023-12-06"><div className='bg-slate-950/60 p-1 px-2 rounded-lg w-1/2'>
                        <h2 className='text-neutral-300 text-[11px] leading-3'>Created On</h2>
                        <h2 className='text-slate-300 text-[10px]'>just now</h2>
                      </div></Tooltip>
                    </div>
                    <div className='px-2 mb-2'>
                      <h2 className='text-xs text-red-400 flex items-center gap-1 font-medium'><Circle size={10} fill="" strokeWidth={5} />HIGH priority</h2>
                      <h2 className='text-xs text-orange-400 flex items-center gap-1 font-medium'><Circle size={10} fill="" strokeWidth={5} />waiting approval</h2>
                    </div>
                    <div className='flex gap-1 items-center'>
                      <Progress value={67} /> <span className='text-xs'>67%</span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="deleted">
            <Card className='border-slate-700'>
              <CardHeader className='p-3'><CardTitle>Deleted Projects</CardTitle></CardHeader>
              <CardContent className="p-3 w-full flex flex-wrap">
                <div className="w-full lg:w-4/12 p-1">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-neutral-700/70 p-3 rounded-lg cursor-pointer select-none">
                    <div className="flex justify-between px-1">
                      <h1 className='text-sm font-medium'>Project Name</h1>
                      <Popconfirm title="Delete this project?" description="deleted projects will be in your trash for 7days, and deleted permenently." onConfirm={() => handleDeleteProject('123')}><motion.div whileHover={{ rotate: -35 }}><Trash2 color='red' size={18} /></motion.div></Popconfirm>
                    </div>
                    <Link href={`/admin/staff/${'staffid'}`}><div className="flex gap-1 bg-slate-950/50 p-2 rounded-lg items-center mt-2 mb-1">
                      <Avatar src="/avatar.png" size={26} />
                      <div>
                        <h1 className='text-xs font-medium leading-3'>Creator Name</h1>
                        <h1 className='text-xs'>creator@gmail.com</h1>
                      </div>
                    </div></Link>
                    <div className='flex justify-between gap-1 mb-1'>
                      <Tooltip title="2023-12-06"><div className='bg-slate-950/60 p-1 px-2 rounded-lg w-1/2'>
                        <h2 className='text-neutral-300 text-[11px] leading-3'>Created On</h2>
                        <h2 className='text-slate-300 text-[10px]'>just now</h2>
                      </div></Tooltip>
                      <Tooltip title="2023-12-06"><div className='bg-slate-950/60 p-1 px-2 rounded-lg w-1/2'>
                        <h2 className='text-neutral-300 text-[11px] leading-3'>Created On</h2>
                        <h2 className='text-slate-300 text-[10px]'>just now</h2>
                      </div></Tooltip>
                    </div>
                    <div className='px-2 mb-2'>
                      <h2 className='text-xs text-red-400 flex items-center gap-1 font-medium'><Circle size={10} fill="" strokeWidth={5} />HIGH priority</h2>
                      <h2 className='text-xs text-orange-400 flex items-center gap-1 font-medium'><Circle size={10} fill="" strokeWidth={5} />waiting approval</h2>
                    </div>
                    <div className='flex gap-1 items-center'>
                      <Progress value={67} /> <span className='text-xs'>67%</span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ended">
            <Card className='border-slate-700'>
              <CardHeader className='p-3'><CardTitle>Deleted Projects</CardTitle></CardHeader>
              <CardContent className="p-3 w-full flex flex-wrap">
                <div className="w-full lg:w-4/12 p-1">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-neutral-700/70 p-3 rounded-lg cursor-pointer select-none">
                    <div className="flex justify-between px-1">
                      <h1 className='text-sm font-medium'>Project Name</h1>
                      <Popconfirm title="Delete this project?" description="deleted projects will be in your trash for 7days, and deleted permenently." onConfirm={() => handleDeleteProject('123')}><motion.div whileHover={{ rotate: -35 }}><Trash2 color='red' size={18} /></motion.div></Popconfirm>
                    </div>
                    <Link href={`/admin/staff/${'staffid'}`}><div className="flex gap-1 bg-slate-950/50 p-2 rounded-lg items-center mt-2 mb-1">
                      <Avatar src="/avatar.png" size={26} />
                      <div>
                        <h1 className='text-xs font-medium leading-3'>Creator Name</h1>
                        <h1 className='text-xs'>creator@gmail.com</h1>
                      </div>
                    </div></Link>
                    <div className='flex justify-between gap-1 mb-1'>
                      <Tooltip title="2023-12-06"><div className='bg-slate-950/60 p-1 px-2 rounded-lg w-1/2'>
                        <h2 className='text-neutral-300 text-[11px] leading-3'>Created On</h2>
                        <h2 className='text-slate-300 text-[10px]'>just now</h2>
                      </div></Tooltip>
                      <Tooltip title="2023-12-06"><div className='bg-slate-950/60 p-1 px-2 rounded-lg w-1/2'>
                        <h2 className='text-neutral-300 text-[11px] leading-3'>Created On</h2>
                        <h2 className='text-slate-300 text-[10px]'>just now</h2>
                      </div></Tooltip>
                    </div>
                    <div className='px-2 mb-2'>
                      <h2 className='text-xs text-red-400 flex items-center gap-1 font-medium'><Circle size={10} fill="" strokeWidth={5} />HIGH priority</h2>
                      <h2 className='text-xs text-orange-400 flex items-center gap-1 font-medium'><Circle size={10} fill="" strokeWidth={5} />waiting approval</h2>
                    </div>
                    <div className='flex gap-1 items-center'>
                      <Progress value={67} /> <span className='text-xs'>67%</span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProjectsPage