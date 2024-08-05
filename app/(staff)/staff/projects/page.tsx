"use client"
import { Menu } from 'lucide-react'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { motion } from 'framer-motion';
import { Avatar, Tooltip } from 'antd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';
import AddProjectDialog from '@/components/staff/AddProjectDialog';

const ProjectsPage = () => {
  return (
    <div className='p-4'>
      <div className="flex justify-between mb-4">
        <h1 className='font-semibold'>Your Projects</h1>
        <Popover>
          <PopoverTrigger><Tooltip title="Project Actions"><Menu /></Tooltip></PopoverTrigger>
          <PopoverContent className='w-[120px] p-1 space-y-1'>
            <AddProjectDialog trigger={
              <motion.h1 whileTap={{ scale: 0.98 }} className='w-full bg-slate-700 hover:bg-slate-800 rounded-sm p-1 text-sm flex gap-1 items-center justify-center cursor-pointer'> Create Project </motion.h1>
            } />
          </PopoverContent>
        </Popover>
      </div>
      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className='flex-wrap h-[80px] md:flex-nowrap md:h-auto w-[360px] lg:w-auto'>
          <TabsTrigger value="new">New Projects</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="owned">Owned</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="deleted">Deleted</TabsTrigger>
        </TabsList>
        <TabsContent value="new">New Projects here.</TabsContent>
        <TabsContent value="ongoing" className='w-full'>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-3/12 p-1">
              <Link href={`/staff/projects/1234`}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="bg-slate-900 border border-slate-700 p-2 rounded-md shadow-md">
                  <h2 className='font-medium mb-1'>Project Name</h2>
                  <Tooltip title="Project Creator" placement='topLeft'>
                    <div className="flex gap-1 items-center mb-1">
                      <Avatar src="/avatar.png" size={25} />
                      <div>
                        <h1 className="text-xs font-medium leading-3">Creator Name</h1>
                        <h1 className="text-xs">creator@email.com</h1>
                      </div>
                    </div>
                  </Tooltip>
                  <p className='text-xs mb-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet. Lorem, ipsum dolor. Error vel tenetur corrupti aliquid inventore voluptatum impedit itaque incidunt ut illo...</p>
                  <div className="flex justify-between items-center">
                    <h3 className='text-xs text-slate-400'>just now</h3>
                    <h3 className='px-3 p-1 bg-slate-800 rounded-full text-xs'>aprooved</h3>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="owned">The Projects You Owned here.</TabsContent>
        <TabsContent value="completed">All The Completed Projects here.</TabsContent>
        <TabsContent value="deleted">Your Deleted Projects here.</TabsContent>
      </Tabs>
    </div>
  )
}

export default ProjectsPage