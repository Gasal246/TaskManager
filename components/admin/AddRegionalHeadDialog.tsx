"use client"
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Avatar } from 'antd'
import { useSession } from 'next-auth/react'
import { useAddRegionHead, useGetStaffsRegionArea } from '@/query/client/adminQueries'
import { toast } from 'sonner'

const FormSchema = z.object({
    userid: z.string({ required_error: "Please select any staff to update head." }),
})

const AddRegionalHeadDialog = ({ trigger, regionId }: { trigger: React.ReactNode, regionId: string }) => {
    const { data: session }: any = useSession();
    const { data: staffs, isLoading: loadingStaffs } = useGetStaffsRegionArea(session?.user?.id);
    const { mutateAsync: addHead, isPending: addingHead } = useAddRegionHead()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const response = await addHead({regionid: regionId, staffid: data?.userid });
        if(response?.existing){
            return toast.error("Hey.. You Selected the existing head.")
        }
        return toast.success("Regional Head Successfully Updated.")
    }

    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Regional Head</DialogTitle>
                    <DialogDescription>
                        Select any of your staff as Regional Head from below list. better to check the region next to them too.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="userid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select head</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select form your staffs" />
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
                                                        <h1 className='text-center text-xs font-medium ml-3'>( {staff?.Region?.RegionName} )</h1>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={addingHead} type="submit">{ addingHead ? 'Updating...' : 'Update'}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddRegionalHeadDialog