"use client"
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '../ui/input'
import { Avatar, Tooltip } from 'antd'

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
    DocName: z.string().min(2),
    Private: z.boolean(),
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})

const AddProjectDocDialog = ({ trigger }: { trigger: React.ReactNode }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            DocName: "",
            Private: false,
            items: ["recents", "home"]
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a Project Document.</DialogTitle>
                    <DialogDescription>Adding a project document ?</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="DocName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Document Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="your document name." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Private"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className={`text-base ${form.getValues('Private') === false && 'text-slate-400'}`}> Private File </FormLabel>
                                        <FormDescription className={`${form.getValues('Private') === false && 'text-orange-400'}`}> Switching to private file will make this document only view to you & company. </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        {/* Disable the switching option for the staffs and all the documents added by staff is default added as private document. */}
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {
                            form?.getValues('Private') === false &&
                            <FormField
                                control={form.control}
                                name="items"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-2">
                                            <FormLabel className="text-base">Private File</FormLabel>
                                            <FormDescription>Select the athority in which this document act as public.</FormDescription>
                                        </div>
                                        <div className="h-[200px] overflow-y-scroll">
                                            {items.map((item) => (
                                                <FormField
                                                    key={item.id}
                                                    control={form.control}
                                                    name="items"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem key={item.id} className="flex flex-row items-center space-x-3 space-y-1">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(item.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, item.id])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value !== item.id
                                                                                    )
                                                                                )
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    <div className="flex gap-1 items-center">
                                                                        <Avatar src="/avatar.png" size={24} />
                                                                        <div>
                                                                            <h3 className='text-neutral-200 text-xs leading-3 font-medium'>Muhammed Gasal</h3>
                                                                            <h3 className='text-neutral-300 text-xs '>gasalgasal246@gmail.com</h3>
                                                                        </div>
                                                                        <Tooltip title="Department this staff belong"><h1 className='text-xs text-slate-300 px-4'>{item.label}</h1></Tooltip>
                                                                    </div>
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        }
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default AddProjectDocDialog