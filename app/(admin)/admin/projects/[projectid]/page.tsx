"use client"
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Avatar, ConfigProvider, Popconfirm, Space, Timeline, Tooltip } from 'antd'
import { Edit, FilePlus2, FileText, Globe2, LockKeyhole, Menu, Send, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { motion } from 'framer-motion'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ChangeAccessDocumentDialog from '@/components/staff/ChangeAccessDocumentDialog'
import AddProjectDocDialog from '@/components/staff/AddProjectDocDialog'
import LoaderSpin from '@/components/shared/LoaderSpin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ProjectIdPage = ({ params }: { params: { projectid: string } }) => {
    const router = useRouter();
    const [showFullDescription, setShowFullDescription] = useState(false);
    return (
        <div className='p-4 pb-20'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/projects">All Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>project name</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='mt-2 bg-slate-950/50 p-3 rounded-lg flex justify-between items-center mb-3'>
                <div>
                    <h1 className='text-2xl font-bold flex gap-2 mb-1'>Project Name <Edit size={18} /></h1>
                    <div className="flex gap-1">
                        <Badge className='bg-orange-400 text-xs'>not-approved</Badge>
                        <Badge className='bg-slate-300 text-xs'>current working department</Badge>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <Button>Complete / Post</Button>
                    <Button>Rollback / Issue</Button>
                    {/* Delete Button Only for Admin  */}
                    <Popconfirm title="Delete Project" description="Are you sure want to schedule it for deletion ?"><Button className='bg-red-700 hover:bg-transparent hover:border-2 border-red-700 text-white'>Delete / Archive</Button></Popconfirm>
                </div>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-lg flex flex-wrap items-center gap-2 mb-3">
                <div className='bg-neutral-700/60 p-2 rounded-lg min-w-[280px] hover:bg-slate-800 cursor-pointer' onClick={() => router.push('/admin/staffs/staffid')}>
                    <h1 className='text-xs text-slate-300 mb-1'>Creator:</h1>
                    <div className="flex items-center gap-1">
                        <Avatar src='/avatar.png' />
                        <div>
                            <h1 className='text-sm leading-3'>Creator Name</h1>
                            <h1 className='text-xs'>creator@gmail.com</h1>
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <Tooltip title="2023-06-12"><div className="bg-slate-950/50 p-2 rounded-lg min-w-[150px]">
                        <h1 className='text-xs text-slate-300 leading-3'>Created at:</h1>
                        <h2 className='text-xs'>just now</h2>
                    </div></Tooltip>
                    <Tooltip title="2023-06-12"><div className="bg-slate-950/50 p-2 rounded-lg min-w-[150px]">
                        <h1 className='text-xs text-slate-300 leading-3 flex gap-1'>DeadLine at: <Edit size={12} /></h1>
                        <h2 className='text-xs'>just now</h2>
                    </div></Tooltip>
                    <div className="bg-slate-950/50 p-2 rounded-lg min-w-[150px]">
                        <h1 className='text-xs text-slate-300 leading-3 flex gap-1'>Location: <Globe2 size={12} /></h1>
                        <h2 className='text-xs'>India, Kerala</h2>
                    </div>
                </div>
            </div>
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Project Details</TabsTrigger>
                    <TabsTrigger value="documents">Project Documents</TabsTrigger>
                    <TabsTrigger value="flow">Project Flow</TabsTrigger>
                    <TabsTrigger value="comments">Project Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <div className="bg-slate-950/50 p-3 rounded-lg w-full">
                        <h1 className='text-xs'>Project Details</h1>
                        <Tooltip title={`${showFullDescription ? 'click again to show less' : 'click to read more..'}`} placement='bottomLeft'><pre className={`text-sm cursor-pointer ${!showFullDescription ? 'w-3/4 text-ellipsis overflow-hidden whitespace-nowrap' : 'text-wrap'}`} onClick={() => setShowFullDescription(!showFullDescription)}>
                            {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda nesciunt quas, dignissimos exercitationem reprehenderit pariatur, non omnis libero tempora accusamus cumque mollitia, optio laborum quis cum necessitatibus inventore nemo? Ipsum cupiditate cum velit nam officiis quod beatae distinctio consequuntur repellendus aliquid similique numquam libero in, culpa iste nemo quisquam laboriosam natus accusantium repudiandae vitae quos cumque dicta!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, exercitationem?  Accusamus hic aliquam esse assumenda iure obcaecati officiis eius aspernatur neque dolores non minus aut eos eveniet, incidunt magnam quia maiores, laudantium iusto. Libero in deserunt placeat magnam natus blanditiis accusantium magni mollitia consectetur rerum aliquam voluptates nemo similique rem dolores eos officiis harum culpa, facilis distinctio! Ad non expedita quos, voluptas quasi consectetur nesciunt cumque reiciendis facilis nihil neque atque explicabo dignissimos quibusdam eos ipsam. Qui maiores, itaque voluptatum minima at molestiae harum ipsam. Voluptate ipsum sed iste. Sapiente unde at ea id odit inventore exercitationem ullam dicta laborum iste error quaerat soluta, eveniet quam voluptatibus temporibus veritatis. Fugit quibusdam voluptates eligendi. Voluptatibus sequi odio, vero non ex mollitia? Earum maxime temporibus velit. Fugiat, architecto harum! Consequuntur sapiente dolor, ipsam accusantium harum veritatis modi maxime vero sit delectus aliquid eos, quaerat laboriosam rerum tenetur aut, neque mollitia soluta deserunt vitae eum ut.`}
                        </pre></Tooltip>
                    </div>
                </TabsContent>
                <TabsContent value="documents">
                    <div className="bg-slate-950/50 p-3 rounded-lg">
                        <div className='mb-5'>
                            <h3 className='text-sm mb-1'>Documents:</h3>
                            <div className="flex flex-wrap items-center">
                                <div className="w-full md:w-3/12 p-1">
                                    <div className='w-full bg-slate-800 p-2 rounded-md border border-border cursor-pointer relative'>
                                        <h1 className='text-sm font-medium text-slate-300 flex gap-1'><FileText size={18} />{`doc name`}</h1>
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
                                </div>
                                <div className="w-full md:w-3/12 p-1">
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
                                                    <ChangeAccessDocumentDialog trigger={
                                                        <motion.h1 whileTap={{ scale: 0.98 }} className='w-full bg-slate-600 hover:bg-slate-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Change Access </motion.h1>
                                                    } />
                                                    <Popconfirm title="Remove Document ?" description="Are you sure about removing this document?" okText="Yes" cancelText="No"><motion.button whileTap={{ scale: 0.98 }} className='w-full bg-slate-600 hover:bg-slate-700 rounded-sm p-1 text-sm flex gap-1 items-center justify-center'> Remove File </motion.button></Popconfirm>
                                                </PopoverContent>
                                            </Popover>
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="w-full md:w-2/12 p-1">
                                    <div className="bg-slate-300 p-2 rounded-md">
                                        <AddProjectDocDialog trigger={
                                            <motion.h1 whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className='cursor-pointer bg-white text-black text-sm px-3 p-1 rounded-full flex font-bold gap-1'>Add Document <FilePlus2 size={18} /></motion.h1>
                                        } projectId='' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="flow">
                    <div className="bg-slate-950/50 p-3 rounded-lg flex flex-col justify-start">
                        <h1 className='text-sm font-semibold text-center'>Project Working Tree</h1>
                        <div className='py-4 flex justify-start w-full'>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Timeline: {
                                            tailColor: 'grey'
                                        },
                                    },
                                }}
                            ><Timeline
                                    mode={'right'}
                                    items={[
                                        {
                                            label: <div className='bg-neutral-700/40 p-2 rounded-lg flex gap-4 items-center'>
                                                <div>
                                                    <div className="flex gap-1 justify-start">
                                                        <Avatar src="/avatar.png" size={20} />
                                                        <pre className='text-xs text-slate-300'>gasalgasal246@gmail.com</pre>
                                                    </div>
                                                    <pre className="text-xs text-slate-300">06-12-2024 Sunday 5PM</pre>
                                                </div>
                                                <h1 className='font-semibold text-neutral-300'>Project Creator</h1>
                                            </div>,
                                            children: <div className='bg-neutral-700/40 p-2 rounded-lg'>
                                                <h2 className='text-xs font-medium text-slate-200'>Project Created</h2>
                                                <pre className='text-xs font-medium text-slate-200 text-wrap'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum dolores necessitatibus incidunt quod natus repellat ratione, tempore eveniet repudiandae, voluptas commodi nobis suscipit assumenda. Non similique nobis impedit? Consectetur voluptas quibusdam, harum cumque numquam perspiciatis odio officia! Inventore a in voluptates deleniti ipsam, ipsum natus eligendi commodi ducimus quia. Error.</pre>
                                            </div>,
                                        },
                                        {
                                            label: <div className='bg-neutral-700/40 p-2 rounded-lg flex gap-4 items-center'>
                                                <div>
                                                    <div className="flex gap-1 justify-start">
                                                        <Avatar src="/avatar.png" size={20} />
                                                        <pre className='text-xs text-slate-300'>jannah@gmail.com</pre>
                                                    </div>
                                                    <pre className="text-xs text-slate-300">06-12-2024 Sunday 5PM</pre>
                                                </div>
                                                <h1 className='font-semibold text-neutral-300'>Engineering Department</h1>
                                            </div>,
                                            children: <div className='bg-neutral-700/40 p-2 rounded-lg'>
                                                <h2 className='text-xs font-medium text-slate-200'>Completed Engineering</h2>
                                                <pre className='text-xs font-medium text-slate-200 text-wrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio aut numquam error temporibus, nisi sed ut nam sequi debitis officiis!</pre>
                                            </div>,
                                        },
                                        {
                                            label: <></>,
                                            children: <div className='text-xs flex gap-1 justify-end text-cyan-300'>Working Branch.. <LoaderSpin size={20} /></div>,
                                        },
                                    ]}
                                /></ConfigProvider>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="comments">
                    <div className="bg-slate-950/50 p-3 rounded-lg relative">
                        <h1 className='text-sm font-medium mb-2'>Project Comments</h1>
                        <div className="flex flex-col h-[300px] overflow-y-scroll ">
                            <div className='mb-3'>
                                <div className="flex gap-1 items-center">
                                    <Avatar src="/avatar.png" size={20} />
                                    <h3 className="text-xs font-semibold text-slate-300 leading-3">gasal123@gmail.com</h3>
                                    <Popconfirm title="Delete Comment ?" description="Are you sure you wanna delete this comment ?"><motion.h1 className='cursor-pointer flex justify-center items-center gap-1 text-xs font-medium text-red-700' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>Delete <Trash2 size={14} /></motion.h1></Popconfirm>
                                </div>
                                <p className='text-xs text-slate-300 pl-5 w-full lg:w-1/2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur eligendi unde laudantium quos aliquam saepe, quidem dolor ut rem reprehenderit nam expedita itaque voluptatum, deserunt non quisquam quasi aliquid iste? <i className='text-slate-400 text-xs text-nowrap'>. just now</i></p>
                            </div>
                            {/* some space for input */} <div className="py-5"></div>
                        </div>
                        <Space.Compact style={{ width: '100%' }} className='absolute bottom-0 left-0 lg:px-4'>
                            <Input type='text' placeholder='enter your comment.' className='bg-black/70' />
                            <Button className='bg-slate-800 text-white hover:bg-slate-700'><Send size={16} /></Button>
                        </Space.Compact>
                    </div>
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default ProjectIdPage