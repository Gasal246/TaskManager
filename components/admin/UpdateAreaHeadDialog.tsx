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

const FormSchema = z.object({
    userid: z.string({ required_error: "Please select any staff to update head." }),
})

const UpdateAreaHeadDialog = ({ trigger, areaId }: { trigger: React.ReactNode, areaId: string }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
    }
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Area Head</DialogTitle>
                    <DialogDescription>
                        Select any of your staff as Area Head from below list. better to check the area next to them too.
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
                                            <SelectItem value="m@example.com" className='w-[300px]'>
                                                <div className='w-full flex justify-between items-center'>
                                                    <div className="flex items-center gap-1">
                                                        <Avatar src="/avatar.png" size={30} />
                                                        <div>
                                                            <p className='text-xs'>Muhammed Gasal</p>
                                                            <p className='text-xs'>gasalgasal246@gmail.com</p>
                                                        </div>
                                                    </div>
                                                    {/* add curresponding area of user */}
                                                    <h1 className='ml-10'>Sharjah</h1> 
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateAreaHeadDialog