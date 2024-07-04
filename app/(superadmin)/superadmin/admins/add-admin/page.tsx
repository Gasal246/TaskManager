/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import { CircleCheckBig, OctagonX, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useCreateNewAdmin } from "@/query/client/superuserQueries"
import { Tooltip } from "antd";
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email().max(60)
})

type Department = {
    Allow_project: boolean;
    Allow_tasks: boolean;
    DepartmentName: string;
    Max_staff_count: string;
}

const AddAdmin = () => {
    const router = useRouter()
    const [departments, setDepartments] = useState<Department[]>([])
    const { mutateAsync: addNewAdmin, isPending: addingNewAdmin, isSuccess: addedNewAdmin } = useCreateNewAdmin()
    const [departmentInput, setDepartmentInput] = useState<Department>({
        DepartmentName: '',
        Max_staff_count: '',
        Allow_project: false,
        Allow_tasks: false
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: ""
        },
    })

    useEffect(() => {
        if(addedNewAdmin){
            toast.success("New Admin Added Successfully", { description: "You have added a new admin, just now!", onDismiss: () => router.replace('/superadmin/admins')})
        }
    }, [addedNewAdmin])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await addNewAdmin({ name: values.name, email: values.email, departments: departments });
    }

    const handleAddDepartment = () => {
        if (departments.some((dep) => dep?.DepartmentName === departmentInput?.DepartmentName)) {
            return toast.error("Please make sure you haven't repeated the same department name.")
        }
        if (!departmentInput?.DepartmentName || !departmentInput?.Max_staff_count) {
            return toast.error("Please confirm your fields are not empty before you add department.")
        }
        setDepartments([...departments, departmentInput]);
        setDepartmentInput({
            DepartmentName: '',
            Max_staff_count: '',
            Allow_project: false,
            Allow_tasks: false
        })
    }

    const handleDeleteDepartment = (index: number) => {
        setDepartments(prevDepartments => {
            const newDepartments = [...prevDepartments];
            newDepartments.splice(index, 1);
            return newDepartments;
        });
    }

    return (
        <div className='p-5 overflow-y-scroll h-full pb-20'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/superadmin/admins">Admins</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>add admin</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-3">
                <h1 className='text-xl font-bold mb-3'>Add New Admin</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Admin Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="admin name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Admin Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="admin email id" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <h1 className="font-medium">Add Departments & Rules</h1>
                        <div className="flex flex-wrap">
                            {
                                departments?.length > 0 &&
                                departments?.map((dep: Department, index: number) => (
                                    <div className="p-1 w-full lg:w-3/12" key={dep?.DepartmentName}>
                                        <div className="p-2 rounded-sm bg-pink-950 relative">
                                            <h1 className="font-medium text-base">{dep?.DepartmentName}</h1>
                                            <div className="flex justify-between p-1">
                                                <h2 className="text-xs">{dep?.Max_staff_count} staffs</h2>
                                                <h3 className="text-xs flex gap-1 items-center">{dep?.Allow_project ? <CircleCheckBig size={14} strokeWidth={2} /> : <OctagonX size={14} strokeWidth={2} />} projects </h3>
                                                <h3 className="text-xs flex gap-1 items-center">{dep?.Allow_tasks ? <CircleCheckBig size={14} strokeWidth={2} /> : <OctagonX size={14} strokeWidth={2} />} tasks </h3>
                                            </div>
                                            <Tooltip title="Delete this department">
                                                <motion.div onClick={() => handleDeleteDepartment(index)} whileHover={{ rotate: -20 }} whileTap={{ scale: 0.9 }} className="absolute right-1 top-1 cursor-pointer">
                                                    <Trash2 size={18} />
                                                </motion.div>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex flex-wrap items-center border border-border p-2 rounded-md">
                            <div className="w-full lg:w-6/12 p-1">
                                <label className="text-sm">Department Name</label>
                                <Input placeholder="department name" value={departmentInput?.DepartmentName} onChange={(e) => setDepartmentInput({ ...departmentInput, DepartmentName: e.target.value })} />
                            </div>
                            <div className="w-full lg:w-6/12 p-1">
                                <label className="text-sm">Maximum Staff Count</label>
                                <Input type="number" placeholder="number of staffs this department should have." value={departmentInput?.Max_staff_count} onChange={(e) => setDepartmentInput({ ...departmentInput, Max_staff_count: e.target.value })} />
                            </div>
                            <div className="w-full p-1 gap-3 items-center flex px-4">
                                <Checkbox checked={departmentInput?.Allow_project} onCheckedChange={(change: boolean) => setDepartmentInput({ ...departmentInput, Allow_project: change })} />
                                <label className="text-sm">Allow Project Management</label>
                            </div>
                            <div className="w-full p-1 gap-3 items-center flex px-4">
                                <Checkbox checked={departmentInput?.Allow_tasks} onCheckedChange={(change: boolean) => setDepartmentInput({ ...departmentInput, Allow_tasks: change })} />
                                <label className="text-sm">Allow Task Creation</label>
                                <Tooltip title="add document">
                                    <Button onClick={handleAddDepartment} type="button" className="ml-auto border border-slate-600 px-10 mr-10" variant="ghost">Add</Button>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="flex justify-end px-4">
                            {departments?.length > 0 &&
                                <Button type="submit" className="bg-pink-900 hover:bg-pink-800/70 text-foreground"><Tooltip title={addingNewAdmin ? 'wait! untill the creation complete' : 'click to create new admin'}>{addingNewAdmin ? 'wait! creating..' : 'create one'}</Tooltip></Button>
                            }
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AddAdmin
