"use client"
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import { X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useShowDepartmentForHeads } from '@/query/client/depQueries'
import { useSession } from 'next-auth/react'
import { Skeleton } from '../ui/skeleton'

const formSchema = z.object({
    description: z.string().min(2),
    forwardDepId: z.string()
})

const CompleteProjectDialog = ({ trigger }: { trigger: React.ReactNode }) => {
    const { data: session }: any = useSession();
    const { data: departments, isLoading: loadingDepartments } = useShowDepartmentForHeads(session?.user?.id)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            forwardDepId: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Mark Work Completion</DialogTitle>
                    <DialogDescription>This will be recorded and showed in project flow as the department info for completing particular work.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Add Flow</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Brief note on what you have done." className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        { loadingDepartments ? <Skeleton className='w-full h-[40px]' /> :
                            <FormField
                            control={form.control}
                            name="forwardDepId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department To Forward</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a department to forward" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {departments?.map((dep: any) => (
                                                <SelectItem value={dep?._id} key={dep?._id}>{dep?.DepartmentName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        {form.getValues('description') && <div className="flex justify-end"><Button type="submit">{'Continue'}</Button></div>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CompleteProjectDialog
