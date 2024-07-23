"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAddNewStaffDocument } from '@/query/client/adminQueries';
import { toast } from 'sonner';

const formSchema = z.object({
    DocName: z.string().min(2),
    ExpireAt: z.string().date(),
    RemindAt: z.string().date(),
})

const AddNewDocumentDialog = ({ trigger, staffid }: { trigger: React.ReactNode, staffid: string }) => {
    const { mutateAsync: addNewDocument, isPending: addingNewDocument } = useAddNewStaffDocument();
    const [ file, setFile ] = useState<File | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            DocName: "",
            ExpireAt: "",
            RemindAt: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append("DocName", values.DocName);
        formData.append("ExpireAt", values.ExpireAt);
        formData.append("RemindAt", values.RemindAt);
        formData.append("Document", file as any);
        formData.append("staffid", staffid);
        const response = await addNewDocument({ formData });
        if(response?.existing){
            return toast.error("The Document with same name already exists.")
        }
        return toast.success("Document added successfully.")
    }

    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Document</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="DocName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Document Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter document name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ExpireAt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expire At</FormLabel>
                                    <FormControl>
                                        <Input type='date' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="RemindAt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Remind Me At</FormLabel>
                                    <FormControl>
                                        <Input type='date' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Input type="file" placeholder='select your document' onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                        <Button disabled={addingNewDocument} type="submit">{addingNewDocument ? 'Adding...' : 'Submit'}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewDocumentDialog