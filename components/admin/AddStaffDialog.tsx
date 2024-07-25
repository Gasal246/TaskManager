"use client"
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Avatar } from 'antd';
import { useAddStaffFromDepArea, useGetStaffsRegionArea } from '@/query/client/adminQueries';
import { useSession } from 'next-auth/react';
import LoaderSpin from '../shared/LoaderSpin';
import { toast } from 'sonner';

const formSchema = z.object({
    userid: z.string().min(2).max(50),
})

const AddStaffDialog = ({ trigger, depid, areaid }: { trigger: React.ReactNode, depid: string, areaid: string }) => {
    const { data: session }: any = useSession();
    const { data: staffs, isLoading: loadingStaffs } = useGetStaffsRegionArea(session?.user?.id);
    const { mutateAsync: addStaff, isPending: addingStaff } = useAddStaffFromDepArea();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userid: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await addStaff({ depid: depid, areaid: areaid, staffid: values.userid });
        if(response?._id){
            return toast.success("Staff Successfully Added.")
        }else if(response?.existing){
            return toast.error("Staff Already Exist in this department.")
        }else if(response?.overflow){
            return toast.error("Your Staff Quota is over.", {
                description: "Kindly Contact the Administrator for adding more staff slots."
            })
        }
        return toast.error("Something went wrong.")
    }
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Staff To Area</DialogTitle>
                    <DialogDescription>
                        Ensuring the staff area next to the staff information will result in better selection of staffs.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="userid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{loadingStaffs ? <span className='flex text-sm gap-1'>loading staffs.. <LoaderSpin size={16} /></span> : 'Select Staff'}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {staffs?.map((staff: any) => (
                                                <SelectItem key={staff?._id} value={staff?._id}>
                                                    <div className='flex justify-between w-full items-center'>
                                                        <div className="flex gap-1 items-center">
                                                            <Avatar src={staff?.AvatarUrl ? staff?.AvatarUrl : '/avatar.png'} size={30} />
                                                            <div>
                                                                <h4 className='text-xs leading-3'>{staff?.Name}</h4>
                                                                <h4 className='text-xs'>{staff?.Email}</h4>
                                                            </div>
                                                        </div>
                                                        <h1 className='text-center text-xs font-medium ml-3'>{staff?.Region?.RegionName}, {staff?.Area?.Areaname}</h1>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={addingStaff}>{addingStaff ? 'Adding...' : 'Add Staff'}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddStaffDialog