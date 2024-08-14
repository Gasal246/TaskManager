"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { useAddNewTask, useGetChoosableStaffs } from "@/query/client/userQueries"
import { useSession } from "next-auth/react"
import { Avatar } from "antd"

const items = [
    {
        id: "recents",
        label: "Recents",
    },
    {
        id: "home",
        label: "Home",
    },
    {
        id: "applications",
        label: "Applications",
    },
    {
        id: "desktop",
        label: "Desktop",
    },
    {
        id: "downloads",
        label: "Downloads",
    },
    {
        id: "documents",
        label: "Documents",
    },
] as const

const formSchema = z.object({
    taskName: z.string().min(2).max(30),
    description: z.string().min(2).max(250),
    projectid: z.string().optional(),
    priority: z.string(),
    selectedUsers: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    deadline: z.string().date().optional()
})

const AddTaskPage = () => {
    const { data: session }: any = useSession();
    const { mutateAsync: addNewTask, isPending: addingNewTask } = useAddNewTask();
    const { data: stafflist, isLoading: loadingStaffList } = useGetChoosableStaffs(session?.user?.id)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            taskName: "",
            description: "",
            projectid: "",
            priority: "low",
            selectedUsers: [],
            deadline: ''
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append('taskName', values.taskName);
        formData.append('description', values.description);
        values?.projectid && formData.append('projectid', values.projectid);
        formData.append('priority', values.priority);
        formData.append('selectedUsers', values.selectedUsers?.join(','));
        formData.append('deadline', values.deadline+'');
        const response = await addNewTask({ formData: formData })
    }
    return (
        <div className="p-4">
            <Breadcrumb className='mb-2'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/staff/tasks">Tasks</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add NewTask</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="taskName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="enter task name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell about task."
                                        className="resize-y border-border"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task Name</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="select the date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority or Importance</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="border-border">
                                            <SelectValue placeholder="how important is this task ?" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="average">Average</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="selectedUsers"
                        render={() => (
                            <FormItem>
                                <div className="mb-1">
                                    <FormLabel className="text-base">Forward To Staffs</FormLabel>
                                    <FormDescription>{stafflist?.length < 0 ? 'You have no forwardable staffs under you' : 'Select the staffs who you wanna send this task.'}</FormDescription>
                                </div>
                                {stafflist?.map((item: any) => (
                                    <FormField
                                        key={item._id}
                                        control={form.control}
                                        name="selectedUsers"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item._id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(item._id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item._id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== item._id
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        <div className="flex gap-1 items-center">
                                                            <Avatar src={item?.AvatarUrl || '/avatar.png'} size={25} />
                                                            <div>
                                                                <h3 className="text-xs leading-3">{item?.Name}</h3>
                                                                <h3 className="text-xs">{item?.Email}</h3>
                                                            </div>
                                                        </div>
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-5">
                        <Button type="submit" className="">Create task</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AddTaskPage