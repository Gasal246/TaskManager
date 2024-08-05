"use client"
import React, { use, useState } from 'react'
import { Button, ConfigProvider, DatePicker, DatePickerProps, Input, Space, Upload, UploadProps } from 'antd';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { toast } from 'sonner';
import { CloudUpload } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/query/queryKeys';

const AddAdminDocumentsDialog = ({ trigger, adminId, updateTrigger }: { trigger: React.ReactNode, adminId: string, updateTrigger?: any }) => {
    const [ docName, setDocName ] = useState('');
    const [expDate, setExpDate] = useState('');
    const [rmdDate, setRmdDate] = useState('');
    const queryClient = useQueryClient();
    const onChangeExipiry: DatePickerProps['onChange'] = (date: any, dateString) => {
        setExpDate(date?.$d);
    }
    const onChangeRemind: DatePickerProps['onChange'] = (date: any, dateString) => {
        setRmdDate(date?.$d)
    }
    const props: UploadProps = {
        name: 'file',
        action: '/api/superadmin/upload-admin-doc',
        method: 'POST',
        headers: {
            ContentType: 'multipart/form-data'
        },
        data: { docname: docName, expire: expDate, remind: rmdDate, adminId: adminId},
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                toast.success(`${info.file.name} file uploaded successfully`);
                updateTrigger && updateTrigger(true);
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_ADMIN_ADMINID, adminId]
                })
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_ADMIN_ADMINID]
                })
            } else if (info.file.status === 'error') {
                toast.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <Dialog>
            <DialogTrigger className='w-full'>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>Upload a new document to server</DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <ConfigProvider
                        theme={{
                            token: {
                                // Seed Token
                                colorPrimary: 'gray',
                                borderRadius: 2,

                                // Alias Token
                                colorBgContainer: '#f6ffed',
                                colorTextPlaceholder: 'gray'
                            },
                        }}
                    >
                        <Space direction="vertical" className='w-full'>
                            <Input placeholder="Document Name" value={docName} onChange={(e) => setDocName(e.target.value)} />
                            <div className="flex flex-wrap gap-2">
                                <DatePicker onChange={onChangeExipiry} placeholder="Exipiring Date" />
                                <DatePicker onChange={onChangeRemind} placeholder="Remind Date" />
                            </div>
                            <div className="max-w-[350px]">
                                <Upload {...props}><Button icon={<CloudUpload />}>Click to Upload</Button></Upload>
                            </div>
                        </Space>
                    </ConfigProvider>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default AddAdminDocumentsDialog