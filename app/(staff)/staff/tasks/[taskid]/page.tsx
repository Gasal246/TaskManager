"use client"
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { motion } from 'framer-motion';
import { Menu, Send } from 'lucide-react';
import { Avatar, ConfigProvider, Popconfirm, Space, Timeline, Tooltip } from 'antd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"


const TaskPage = ({ params }: { params: { taskid: string } }) => {
  return (
    <div className='p-4'>
      <Breadcrumb className='mb-2'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/staff/tasks">Tasks</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Task Name</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between">
        <div>
          <h1 className='font-semibold text-xl leading-4'>Task Name</h1>
          <h1 className='font-medium text-xs text-slate-400'>just now</h1>
        </div>
        <Popover>
          <PopoverTrigger><Tooltip title="Click To Accept/Forward"><Menu /></Tooltip></PopoverTrigger>
          <PopoverContent className='w-[120px] p-1 space-y-1'>
            <Popconfirm
              title="Accept This Task"
              description="Are You Sure To Accept This Task ?"
              // onConfirm={confirm}
              okText="Yes"
              cancelText="No"
              placement='bottomRight'
            ><motion.button whileTap={{ scale: 0.98 }} className='w-full bg-green-700 hover:bg-green-800 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Accept </motion.button></Popconfirm>
            <motion.button whileTap={{ scale: 0.98 }} className='w-full bg-slate-600 hover:bg-slate-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Forward </motion.button>
            <motion.button whileTap={{ scale: 0.98 }} className='w-full bg-slate-600 hover:bg-slate-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Completed </motion.button>
          </PopoverContent>
        </Popover>
      </div>
      <div className='mt-3'>
        <h1 className="font-semibold text-xs text-slate-300">from.</h1>
        <div className="flex gap-1 items-center mb-1">
          <Avatar src='/avatar.png' />
          <div>
            <h3 className='text-xs leading-3 font-medium'>John Doe</h3>
            <h3 className='text-xs '>johndoe@gmail.com</h3>
          </div>
          <h1 className="font-medium text-sm text-red-300 px-3">IMPORTANT</h1>
        </div>
      </div>
      <div className='mt-3'>
        <h1 className="font-semibold text-xs text-slate-300">Description.</h1>
        <p className='text-sm text-slate-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum illum iste dignissimos voluptates blanditiis itaque nostrum eum magni voluptate eos, accusamus delectus nobis nihil inventore in corrupti? Ad officia, tenetur soluta unde placeat labore officiis distinctio nulla odit, veniam, perspiciatis saepe magni eligendi eius quo excepturi neque repellendus sed dolorum. nemo corporis inventore at aut quia nisi obcaecati quis, nostrum iure rerum laudantium voluptatibus hic error possimus quo eaque, totam dicta aliquam, placeat rem. Quos libero esse, veniam, quis cumque officiis magni excepturi obcaecati recusandae voluptatem earum quisquam delectus nostrum labore hic ipsam dicta pariatur eligendi natus fugiat! Repellendus commodi ut ab? Illo alias ad dolor eaque inventore quisquam quis, necessitatibus repellat quas maxime nisi enim asperiores laboriosam reprehenderit repudiandae nobis corrupti beatae voluptate harum? Corrupti enim voluptas vel? Amet laudantium nulla numquam optio quaerat perspiciatis assumenda neque reprehenderit unde, velit aperiam? Numquam consequatur commodi quidem voluptatibus eos maiores cum tempora explicabo blanditiis optio iste saepe quis veniam, at iure facere aspernatur fuga ratione distinctio doloribus nam delectus placeat. Iusto praesentium culpa fugit animi hic adipisci aperiam. Deleniti, quas nemo eum corrupti architecto ducimus consequatur minus nisi facere reprehenderit maiores autem voluptas, doloremque eos rem, repellat iure officia? Beatae ratione officiis, incidunt quaerat possimus quia consequuntur, voluptate in magnam ut qui reprehenderit illo dolor dicta impedit doloremque? Incidunt, soluta iste maiores modi magnam est quia consectetur! Ullam unde nisi sit, rerum nostrum necessitatibus, dolores consequatur officia vitae commodi ea tempora perspiciatis!</p>
      </div>

      <div className="flex flex-wrap mt-5">
        <div className="w-full lg:w-1/2 lg:border-r border-border min-h-[300px] p-3 bg-black/40 rounded-md relative">
          <h1 className="font-semibold text-xs text-slate-300 mb-2">Comments.</h1>
          <div className='h-[250px] overflow-y-scroll pb-10 flex flex-col gap-3'>
            <div className="">
              <div className="flex gap-1">
                <Avatar src='/avatar.png' size={20} />
                <h4 className='text-xs flex items-center gap-1 font-medium'>johndoe@gmail.com <Badge className='p-0 px-2'>creator</Badge></h4>
              </div>
              <p className='text-xs text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, sequi! Error perspiciatis cum nesciunt, sapiente quod accusamus ut nulla maiores porro incidunt deserunt molestiae nam illum velit, natus eos modi consequuntur praesentium. <i className='pl-5 text-nowrap text-[10px]'>1 min ago</i></p>
            </div>
            <div className="">
              <div className="flex gap-1">
                <Avatar src='/avatar.png' size={20} />
                <h4 className='text-xs flex items-center gap-1 font-medium'>gasal@gmail.com <Badge className='p-0 px-2'>you</Badge></h4>
              </div>
              <p className='text-xs text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. natus eos modi consequuntur praesentium. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, magnam. <i className='pl-5 text-nowrap text-[10px]'>just now</i></p>
            </div>
          </div>
          <Space.Compact style={{ width: '100%' }} className='absolute bottom-0 left-0'>
            <Input type='text' placeholder='enter your comment.' className='bg-black/70' />
            <Button className='bg-slate-800 text-white hover:bg-slate-700'><Send size={16} /></Button>
          </Space.Compact>
        </div>
        
        <div className="w-full lg:w-1/2 p-3">
          <h1 className="font-semibold text-xs text-slate-300 mb-3">Forwarded Flow.</h1>
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Timeline: {
                    tailColor: 'grey'
                  },
                },
              }}
            >
              <Timeline
                items={[
                  {
                    children:
                      <div>
                        <div className="flex gap-1 items-center">
                          <Avatar src='/avatar.png' />
                          <div>
                            <h4 className='text-xs flex items-center gap-2 font-medium text-slate-300 leading-3'>John Doe</h4>
                            <h4 className='text-xs flex items-center gap-2 text-slate-300'>johndoe@gmail.com</h4>
                          </div>
                          <Badge className='p-0 px-2 font-bold text-slate-700'>Creator</Badge>
                        </div>
                      </div>,
                  },
                  {
                    children: 
                    <div>
                        <div className="flex gap-1 items-center">
                          <Avatar src='/avatar.png' />
                          <div>
                            <h4 className='text-xs flex items-center gap-2 font-medium text-slate-300 leading-3'>Zal Dude</h4>
                            <h4 className='text-xs flex items-center gap-2 text-slate-300'>gasal@gmail.com</h4>
                          </div>
                          <Badge className='p-0 px-2 font-bold text-slate-700'>You</Badge>
                        </div>
                      </div>,
                  },
                ]}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskPage