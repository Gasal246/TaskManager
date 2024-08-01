"use client"
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Avatar, ConfigProvider, Popconfirm, Space, Timeline, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import { FilePlus2, FileText, GitGraph, LockKeyhole, Menu, MessageSquareMore, Send, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoaderSpin from '@/components/shared/LoaderSpin';
import Link from 'next/link';

const ProjectPage = ({ params }: { params: { projectid: string } }) => {
  return (
    <div className='p-4'>
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/staff/projects">All Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Project Name</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-xs'>just now</h1>
      </div>
      <div className="mt-2 flex justify-between mb-2">
        <h1 className='font-semibold text-2xl'>The Project Name Lorem, ipsum dolor.</h1>
        <div className='flex items-center gap-2'>
          <Popover>
            <PopoverTrigger><Tooltip title="Project Actions"><Menu className='hover:text-slate-400 cursor-pointer' /></Tooltip></PopoverTrigger>
            <PopoverContent className='w-[120px] p-1 space-y-1'>
              <motion.button whileTap={{ scale: 0.98 }} className='w-full bg-green-600 hover:bg-green-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Complete & Forward </motion.button>
              <motion.button whileTap={{ scale: 0.98 }} className='w-full bg-slate-600 hover:bg-slate-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Edit Project </motion.button>
              <motion.button whileTap={{ scale: 0.98 }} className='w-full bg-red-600 hover:bg-red-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Delete Project </motion.button>
            </PopoverContent>
          </Popover>
          <Link href="#project-comments"><Tooltip title="View Comments"><MessageSquareMore className='hover:text-slate-400 cursor-pointer' /></Tooltip></Link>
          <Link href="#project-flow"><Tooltip title="View Graphical Flow"><GitGraph className='hover:text-slate-400 cursor-pointer' /></Tooltip></Link>
        </div>
      </div>
      <div className='flex gap-1 items-center mb-3'>
        <Avatar src='/avatar.png' />
        <div>
          <h1 className="text-xs font-medium leading-3">Creator Name</h1>
          <h1 className="text-xs">creator123@gmail.com</h1>
        </div>
      </div>
      <div className='mb-3'>
        <h3 className='text-xs mb-1'>Description:</h3>
        <pre className='text-sm text-slate-300 text-wrap'>
          {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda nesciunt quas, dignissimos exercitationem reprehenderit pariatur, non omnis libero tempora accusamus cumque mollitia, optio laborum quis cum necessitatibus inventore nemo? Ipsum cupiditate cum velit nam officiis quod beatae distinctio consequuntur repellendus aliquid similique numquam libero in, culpa iste nemo quisquam laboriosam natus accusantium repudiandae vitae quos cumque dicta!
        
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, exercitationem?  Accusamus hic aliquam esse assumenda iure obcaecati officiis eius aspernatur neque dolores non minus aut eos eveniet, incidunt magnam quia maiores, laudantium iusto. Libero in deserunt placeat magnam natus blanditiis accusantium magni mollitia consectetur rerum aliquam voluptates nemo similique rem dolores eos officiis harum culpa, facilis distinctio! Ad non expedita quos, voluptas quasi consectetur nesciunt cumque reiciendis facilis nihil neque atque explicabo dignissimos quibusdam eos ipsam. Qui maiores, itaque voluptatum minima at molestiae harum ipsam. Voluptate ipsum sed iste. Sapiente unde at ea id odit inventore exercitationem ullam dicta laborum iste error quaerat soluta, eveniet quam voluptatibus temporibus veritatis. Fugit quibusdam voluptates eligendi. Voluptatibus sequi odio, vero non ex mollitia? Earum maxime temporibus velit. Fugiat, architecto harum! Consequuntur sapiente dolor, ipsam accusantium harum veritatis modi maxime vero sit delectus aliquid eos, quaerat laboriosam rerum tenetur aut, neque mollitia soluta deserunt vitae eum ut.`}
        </pre>
      </div>
      <div className='mb-5'>
        <h3 className='text-sm mb-1'>Documents:</h3>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-3/12 p-1">
            <Tooltip title="Click The Filename To View File" placement='topLeft'>
              <div className='w-full bg-slate-800 p-2 rounded-md border border-border cursor-pointer relative'>
                <h1 className='text-sm font-medium text-slate-300 flex gap-1'><FileText size={18} />{`doc name`}</h1>
                {/* <h3 className='text-xs font-medium text-slate-400 flex items-center gap-2'>Access To:
                  <Avatar.Group max={{ count: 3 }} size={20}>
                    <Tooltip title="Ant User" placement="top"><Avatar src='/avatar.png' /></Tooltip>
                    <Tooltip title="Ant User" placement="top"><Avatar src='/avatar.png' /></Tooltip>
                    <Tooltip title="Ant User" placement="top"><Avatar src='/avatar.png' /></Tooltip>
                    <Tooltip title="Ant User" placement="top"><Avatar src='/avatar.png' /></Tooltip>
                  </Avatar.Group>
                </h3> */}
                <Tooltip title="private files are only accessable to you"><h3 className="text-xs font-medium text-slate-400 flex items-center gap-1">Access: Private<LockKeyhole size={14} /></h3></Tooltip>
                <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.05 }} className='absolute top-2 right-2'>
                  <Popover>
                    <PopoverTrigger><Tooltip title="Document Actions"><Menu size={18} className='hover:text-cyan-600' /></Tooltip></PopoverTrigger>
                    <PopoverContent className='w-[120px] p-1 space-y-1'>
                      <motion.button whileTap={{ scale: 0.98 }} className='w-full bg-slate-600 hover:bg-slate-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Change Access </motion.button>
                      <Popconfirm title="Remove Document ?" description="Are you sure about removing this document?" okText="Yes" cancelText="No"><motion.button whileTap={{ scale: 0.98 }} className='w-full bg-slate-600 hover:bg-slate-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Remove File </motion.button></Popconfirm>
                    </PopoverContent>
                  </Popover>
                </motion.div>
              </div>
            </Tooltip>
          </div>
          <div className="w-full md:w-3/12 p-1">
            <Tooltip title="Click The Filename To View File" placement='topLeft'>
              <div className='w-full bg-slate-800 p-2 rounded-md border border-border cursor-pointer relative'>
                <h1 className='text-sm font-medium text-slate-300 flex gap-1'><FileText size={18} />{`doc name`}</h1>
                <h3 className='text-xs font-medium text-slate-400 flex items-center gap-2'>Access To:
                  <Avatar.Group max={{ count: 3 }} size={20}>
                    <Tooltip title="Ant User" placement="top"><Avatar src='/avatar.png' /></Tooltip>
                    <Tooltip title="Ant User" placement="top"><Avatar src='/avatar.png' /></Tooltip>
                    <Tooltip title="Ant User" placement="top"><Avatar src='/avatar.png' /></Tooltip>
                    <Tooltip title="Ant User" placement="top"><Avatar src='/avatar.png' /></Tooltip>
                  </Avatar.Group>
                </h3>
                <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.05 }} className='absolute top-2 right-2'>
                  <Popover>
                    <PopoverTrigger><Tooltip title="Document Actions"><Menu size={18} className='hover:text-cyan-600' /></Tooltip></PopoverTrigger>
                    <PopoverContent className='w-[120px] p-1 space-y-1'>
                      <motion.button whileTap={{ scale: 0.98 }} className='w-full bg-slate-600 hover:bg-slate-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Change Access </motion.button>
                      <Popconfirm title="Remove Document ?" description="Are you sure about removing this document?" okText="Yes" cancelText="No"><motion.button whileTap={{ scale: 0.98 }} className='w-full bg-slate-600 hover:bg-slate-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Remove File </motion.button></Popconfirm>
                    </PopoverContent>
                  </Popover>
                </motion.div>
              </div>
            </Tooltip>
          </div>
          <div className="w-full md:w-2/12 p-1">
            <div className="bg-slate-300 p-2 rounded-md">
              <motion.h1 whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className='cursor-pointer bg-white text-black text-sm px-3 p-1 rounded-full flex font-bold gap-1'>Add Document <FilePlus2 size={18} /></motion.h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 bg-black/80 rounded-md p-2 relative" id='project-comments'>
          <h1 className='text-sm font-medium mb-2'>Project Comments</h1>
          <div className="flex flex-col h-[400px] overflow-y-scroll ">
            <div className='mb-3'>
              <div className="flex gap-1 items-center">
                <Avatar src="/avatar.png" size={20} />
                <h3 className="text-xs font-semibold text-slate-300 leading-3">gasal123@gmail.com</h3>
              </div>
              <p className='text-xs text-slate-300 pl-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur eligendi unde laudantium quos aliquam saepe, quidem dolor ut rem reprehenderit nam expedita itaque voluptatum, deserunt non quisquam quasi aliquid iste? <i className='text-slate-400 text-xs text-nowrap'>. just now</i></p>
            </div>
            {/* some space for input */} <div className="py-5"></div>
          </div>
          <Space.Compact style={{ width: '100%' }} className='absolute bottom-0 left-0'>
            <Input type='text' placeholder='enter your comment.' className='bg-black/70' />
            <Button className='bg-slate-800 text-white hover:bg-slate-700'><Send size={16} /></Button>
          </Space.Compact>
        </div>
        <div className="w-full lg:w-1/2 p-2" id='project-flow'>
          <h1 className='text-sm font-semibold text-center'>Project Work Flow</h1>
          <div className='py-4'>
            <ConfigProvider
              theme={{
                components: {
                  Timeline: {
                    tailColor: 'grey'
                  },
                },
              }}
            ><Timeline
                mode={'left'}
                items={[
                  {
                    label: <div>
                      <div className="flex gap-1 justify-end">
                        <Avatar src="/avatar.png" size={20} />
                        <pre className='text-xs text-slate-300'>gasalgasal246@gmail.com</pre>
                      </div>
                      <pre className="text-xs text-slate-300">06-12-2024 Sunday 5PM</pre>
                    </div>,
                    children: <pre className='text-xs font-medium text-slate-200 text-wrap'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum dolores necessitatibus incidunt quod natus repellat ratione, tempore eveniet repudiandae, voluptas commodi nobis suscipit assumenda. Non similique nobis impedit? Consectetur voluptas quibusdam, harum cumque numquam perspiciatis odio officia! Inventore a in voluptates deleniti ipsam, ipsum natus eligendi commodi ducimus quia. Error.</pre>,
                  },
                  {
                    label: <div>
                      <div className="flex gap-1 justify-end">
                        <Avatar src="/avatar.png" size={20} />
                        <pre className='text-xs text-slate-300'>jannah@gmail.com</pre>
                      </div>
                      <pre className="text-xs text-slate-300">06-12-2024 Sunday 5PM</pre>
                    </div>,
                    children: <pre className='text-xs font-medium text-slate-200 text-wrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio aut numquam error temporibus, nisi sed ut nam sequi debitis officiis!</pre>,
                  },
                  {
                    label: <></>,
                    children: <div className='text-xs flex gap-1 text-cyan-300'>Working Branch.. <LoaderSpin size={20} /></div>,
                  },
                ]}
              /></ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage