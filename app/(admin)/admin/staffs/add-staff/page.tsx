/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

import CreatableReactSelect from "react-select/creatable"
import makeAnimated from 'react-select/animated';
import { PlusCircleIcon, SquareX } from 'lucide-react'

import { motion } from 'framer-motion'
import { formatDate } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useAddNewStaff, useGetAllAreas, useGetAllRegions } from '@/query/client/adminQueries'
import LoaderSpin from '@/components/shared/LoaderSpin'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    Name: z.string().min(3, "Sorry! as per our business guidelines this is not a real name.").max(25),
    Email: z.string().email("Invalid email address").min(2).max(50),
    Region: z.string(),
    Area: z.string()
})

type SkillTag = {
    label: string;
    value: string;
}

type Document = {
    name: string,
    file: File | null,
    fileUrl: string | null,
    expireAt: Date | null,
    remindMe: Date | null
}

const animatedComponents = makeAnimated();

const AddStaff = () => {
    const router = useRouter();
    const { data: session }: any = useSession();
    const { data: allRegions, isLoading: regionsLoading } = useGetAllRegions(session?.user?.id);
    const { mutateAsync: addNewStaff, isPending: addingStaff } = useAddNewStaff();
    const [selectedSkillTags, setSelectedSkillTags] = useState<SkillTag[] | []>([])

    const [documents, setDocuments] = useState<Document[] | []>([])
    const [documentName, setDocumentName] = useState<string>('');
    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [expireAt, setExpireAt] = useState<Date | null>(null);
    const [remindMe, setRemindMe] = useState<Date | null>(null);

    const handleAddDoc = () => {
        if (!documentName || !documentFile || !expireAt || !remindMe) return null;
        const docUrl = URL.createObjectURL(documentFile);
        const newDoc: Document = { name: documentName, file: documentFile, fileUrl: docUrl, expireAt: expireAt, remindMe: remindMe }
        setDocuments([...documents, newDoc]);
        setDocumentName('');
        setDocumentFile(null);
        setExpireAt(null);
        setRemindMe(null);
    }

    useEffect(() => {
        console.log(documents)
    }, [documents])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Name: "",
            Email: "",
            Region: "",
            Area: "",
        },
    })

    const selectedRegion = form.watch('Region');

    const { data: allAreas, isLoading: areasLoading, refetch: refetchAreas } = useGetAllAreas(selectedRegion);

    useEffect(() => {
        if (selectedRegion) {
            refetchAreas();
        }
    }, [selectedRegion, refetchAreas]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append("Name", values.Name);
        formData.append("Email", values.Email);
        formData.append("Region", values.Region);
        formData.append("Area", values.Area);

        const skillArray = selectedSkillTags.map((skill) => skill.value );
        formData.append("Skills", skillArray.join(','));

        documents.forEach((doc, index) => {
            formData.append(`documents[${index}][name]`, doc.name);
            formData.append(`documents[${index}][file]`, doc.file as any);
            formData.append(`documents[${index}][expireAt]`, doc.expireAt?.toISOString() as any);
            formData.append(`documents[${index}][remindMe]`, doc.remindMe?.toISOString() as any);
        });
        
        const response = await addNewStaff({formData});
        if(response?.existing){
            return toast.error("Email is already in use.", {
                description: "This email is currently using by some of your staffs."
            })
        }
        router.push('/admin/staffs');
        return toast.success("New Staff Added Successfully.", {
            description: "You just added a new Staff"
        })
    }

    const handleRemoveDoc = (index: number) => {
        const updatedDox = documents.splice(index, 1)
        setDocuments(updatedDox)
    }

    return (

        <div className='p-5 overflow-y-scroll h-[95dvh] pb-20'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/staffs">Manage Staffs</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>add staffs</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-2">
                <h1 className='font-semibold mb-3 text-xl'>Add New staff</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 lg:w-10/12">
                        <FormField
                            control={form.control}
                            name="Name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="staff name" className='border-border' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email address" className='border-border' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {regionsLoading ? <LoaderSpin size={20} /> : <FormField
                            control={form.control}
                            name="Region"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Region</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className='border-border'>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select the staff region" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {allRegions?.map((regions: any) => (
                                                <SelectItem key={regions?._id} value={regions?._id}>{regions?.RegionName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        {areasLoading ? <LoaderSpin size={20} /> : <FormField
                            control={form.control}
                            name="Area"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className='border-border'>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select the staff area" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {allAreas?.map((area: any) => (
                                                <SelectItem key={area?._id} value={area?._id}>{area?.Areaname}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}

                        <div className="flex gap-2 relative items-center flex-wrap">
                            <div>
                                <label className='text-sm'>Document Name</label>
                                <Input type='text' className='border-border' placeholder='document title' value={documentName} onChange={(e) => setDocumentName(e.target.value)} />
                            </div>
                            <div>
                                <label className='text-sm'>Document</label>
                                <Input type='file' className='border-border' onChange={(e) => setDocumentFile(e.target.files ? e.target.files[0] : null)} />
                            </div>
                            <div>
                                <label className='text-sm'>Document expiry</label>
                                <Input type='date' className='border-border' value={expireAt ? expireAt.toISOString().substr(0, 10) : ''} onChange={(e) => setExpireAt(e.target.value ? new Date(e.target.value) : null)} />
                            </div>
                            <div>
                                <label className='text-sm'>Remind me on</label>
                                <Input type='date' className='border-border' value={remindMe ? remindMe.toISOString().substr(0, 10) : ''} onChange={(e) => setRemindMe(e.target.value ? new Date(e.target.value) : null)} />
                            </div>
                            <Button onClick={handleAddDoc} type='button' className='p-2 space-x-1'><PlusCircleIcon size={20} /> ADD</Button>
                        </div>
                        <div className="w-full">
                            <label className='text-sm'>{documents.length} Document(s) Added</label>
                        </div>
                        {
                            documents?.map((doc, index) => (
                                <div className="flex gap-2 flex-wrap border p-2 rounded-md" key={doc.name}>
                                    <h1 className='text-sm font-medium p-1'>{doc?.name} :</h1>
                                    <h1 className='text-sm font-medium p-1 rounded-md bg-accent text-accent-foreground'>{doc?.file?.name} - {doc?.file?.type}</h1>
                                    <h1 className='text-sm font-medium p-1 rounded-md bg-accent text-accent-foreground'>EXP: {formatDate(doc?.expireAt + '')}</h1>
                                    <h1 className='text-sm font-medium p-1 rounded-md bg-accent text-accent-foreground'>RMD: {formatDate(doc?.remindMe + '')}</h1>
                                    <motion.button type='button' onClick={() => handleRemoveDoc(index + 1)} className='bg-destructive font-medium p-1 rounded-sm'><SquareX /></motion.button>
                                </div>
                            ))
                        }
                        <div>
                            <label className='text-sm font-medium'>Skills</label>
                            <CreatableReactSelect
                                className='bg-transparent text-black'
                                placeholder="tab list the skills"
                                onCreateOption={tag => {
                                    setSelectedSkillTags(prev => [...prev, { value: tag, label: tag }])
                                }}
                                components={animatedComponents}
                                options={[...selectedSkillTags]}
                                isMulti value={selectedSkillTags.map(tag => {
                                    return { label: tag.label, value: tag.value }
                                })}
                                onChange={tags => {
                                    setSelectedSkillTags(tags.map(tag => { return { label: tag.label, value: tag.value } }))
                                }}
                            />
                        </div>
                        <div className="w-full flex justify-end">
                            <Button type="submit" className='bg-cyan-950 text-foreground hover:bg-cyan-950/50'>create staff</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AddStaff