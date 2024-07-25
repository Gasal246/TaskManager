/* eslint-disable react-hooks/exhaustive-deps */
"use-client"
import React, { useCallback, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { useDropzone } from 'react-dropzone'
import Image from 'next/image';
import { useUpdatePfp } from '@/query/client/adminQueries';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const ChangeDpDialog = ({ trigger, userid, prevAvatar }: { trigger: React.ReactNode, userid: string, prevAvatar?: string }) => {
    const [file, setFile] = useState([]);
    const [fileUrl, setFileUrl] = useState<any>(prevAvatar);
    const { mutateAsync: updatePfp, isPending: updateIsPending } = useUpdatePfp()
    const onDrop = useCallback(
        (acceptedFiles: any) => {
            setFile(acceptedFiles);
            setFileUrl(URL.createObjectURL(acceptedFiles[0]));
        },
        [file]
    );
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg", ".svg"],
        },
    });

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('file', file[0]);
        formData.append('userid', userid);
        console.log(formData.get('file'));
        const response = await updatePfp({ formData });
        if(response?._id){
            return toast.success("Profile Pic Successfully Updated.")
        }
    }
    return (
        <Dialog>
            <DialogTrigger className='w-full'>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Profile Pic</DialogTitle>
                    <DialogDescription>click on the avatar or drag and drop to update your pfp.</DialogDescription>
                </DialogHeader>
                <div {...getRootProps()} style={{ width: 250, height: 250 }}>
                    <input {...getInputProps()} />
                    <Image
                        src={fileUrl}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-xl"
                        width={200}
                        height={200}
                    />
                </div>
                <div className="flex justify-end">
                    <Button onClick={handleUpdate}>{updateIsPending ? 'Updating..' : 'Update'}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeDpDialog