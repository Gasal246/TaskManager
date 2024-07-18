"use client"
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { useDeleteArea, useGetAreaById, useGetRegionById } from '@/query/client/adminQueries';
import LoaderSpin from '@/components/shared/LoaderSpin';
import { motion } from 'framer-motion';
import UpdateAreaHeadDialog from '@/components/admin/UpdateAreaHeadDialog';
import EditAreaDialog from '@/components/admin/EditAreaDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const AreaPage = ({ params }: { params: { region: string, area: string } }) => {
    const router = useRouter();
    const { data: regionData, isLoading: regionLoading } = useGetRegionById(params.region);
    const { data: areaData, isLoading: areaLoading } = useGetAreaById(params?.area);
    const { mutateAsync: deleteArea, isPending: deletingArea } = useDeleteArea();

    const handleDeleteArea = async () => {
        const response = await deleteArea(params.area);
        if(response?._id){
            router.replace(`/admin/regions/${params.region}`);
            return toast.success("Area Deleted Successfully.");
        }
        return toast.error("Some Unknown Error Occured.");
    }

    return (
        <div className='p-4 overflow-y-scroll h-full pb-20'>
            <Breadcrumb className='mb-2'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/regions">Manage Regions</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/admin/regions/${params?.region}`}>{regionLoading ? <LoaderSpin size={20} /> : regionData?.RegionName}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{areaLoading ? <LoaderSpin size={20} /> : areaData?.Areaname}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between mt-2 items-center flex-wrap">
                <div>
                    <h1 className='text-xl font-bold'>Area {areaLoading ? <LoaderSpin size={20} /> : areaData?.Areaname}</h1>
                    <h2 className='text-sm'>{areaData?.AreaHead?.Name}</h2>
                    <h2 className='text-xs'>{areaData?.AreaHead?.Email}</h2>
                    <h2 className='font-medium text-xs flex gap-1 text-orange-300'>{!areaData?.AreaHead && 'no Head for this area.'}</h2>
                </div>
                {areaData && <div className="flex gap-1 flex-wrap">
                    <UpdateAreaHeadDialog trigger={
                        <motion.h1 whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='p-1 hover:bg-cyan-950 bg-slate-800 rounded-lg px-6 border border-slate-400 cursor-pointer'>
                            Update Area Head
                        </motion.h1>
                    } areaId={params.area} />
                    <EditAreaDialog trigger={
                        <motion.h1 whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='p-1 hover:bg-slate-900 bg-slate-800 rounded-lg px-6 border border-slate-400 cursor-pointer'>
                            Edit
                        </motion.h1>
                    } areaData={areaData} />
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <motion.h1 whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='p-1 hover:bg-red-900 bg-slate-800 rounded-lg px-6 border border-slate-400 cursor-pointer'>
                                Delete
                            </motion.h1>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your Area
                                    and remove all related data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteArea}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>}
            </div>
        </div>
    )
}

export default AreaPage