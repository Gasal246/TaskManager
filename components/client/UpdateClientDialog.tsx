/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import PhoneInput from 'react-phone-number-input'
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useGetAllAreas, useGetAllRegions } from '@/query/client/adminQueries';
import { Skeleton } from '../ui/skeleton';
import { useUpdateClient } from '@/query/client/clientQueries';
import { toast } from 'sonner';

const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    address: z.string(),
    region: z.string(),
    area: z.string()
})

const UpdateClientDialog = ({ clientData, currentUser }: { clientData: any, currentUser: any }) => {
    const [phone, setPhone] = useState<any>(clientData?.Phone)
    const [selectedRegion, setSelectedRegion] = useState(clientData?.Region?._id)
    const { data: adminRegions, isLoading: loadingRegions } = useGetAllRegions(currentUser?._id);
    const { data: areas, isLoading: loadingAreas, refetch: refechAreas } = useGetAllAreas(selectedRegion);
    const { mutateAsync: updateClient, isPending: updatingClient } = useUpdateClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: clientData?.Name,
            email: clientData?.Email,
            address: clientData?.Details,
            region: clientData?.Region?._id,
            area: clientData?.Area?._id
        },
    })

    useEffect(() => {
        if (form.getValues('region')) {
            setSelectedRegion(form.getValues('region'))
            refechAreas()
        }
    }, [form.getValues('region')])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append('clientId', clientData?._id)
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('details', values.address);
        formData.append('region', values.region);
        formData.append('area', values.area);
        formData.append('phone', phone);
        try {
            const response = await updateClient(formData);
            if(response._id){
                return toast.success("Client Has been updated successfully.")
            }else{
                throw new Error(response)
            }
        } catch (error) {
            return toast.error("Some thing went wrong on updating client.", { description: `${error}` })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}><Button>Update</Button></motion.div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Client</DialogTitle>
                    <DialogDescription>This will update this client details until your next update.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Client Name" {...field} />
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
                                    <FormLabel>Client Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Client Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <label className='text-sm'>Phone</label>
                            <div className='border-2 p-2 rounded-lg'>
                                <PhoneInput placeholder="Enter phone number" value={phone} onChange={setPhone} className='bg-transparent' />
                            </div>
                        </div>
                        {(loadingRegions || loadingAreas) && <Skeleton className='w-[180px] h-[35px] rounded-lg' />}
                        {adminRegions?.length > 0 && <FormField
                            control={form.control}
                            name="region"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Region</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select a region" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {adminRegions?.map((region: any) => (
                                                <SelectItem key={region?._id} value={region?._id} >{region?.RegionName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        {areas?.length > 0 && <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select a area" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {areas?.map((area: any) => (
                                                <SelectItem key={area?._id} value={area?._id} >{area?.Areaname}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Address & Details.." className='overscroll-y-contain' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">{updatingClient ? 'Updating..' : 'Continue'}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateClientDialog