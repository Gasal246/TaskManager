"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAddSkillToStaff } from '@/query/client/adminQueries'
import { toast } from 'sonner'

const AddStaffSkillDialog = ({ trigger, staffid }: { trigger: React.ReactNode, staffid: string }) => {
    const [input, setInput] = useState('');
    const { mutateAsync: addSkill, isPending: addingSkill } = useAddSkillToStaff()

    const handleAddSkill = async () => {
        if (!input || input.length <= 0) { return }
        const response = await addSkill({ staffId: staffid, skill: input });
        if (response?.exists) {
            return toast.error("Skill Already Exist.")
        }
        setInput('')
        return toast.success("Skill Successfully Added.")
    }
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Skill</DialogTitle>
                </DialogHeader>
            <div>
                <Input placeholder='Enter Staff Skill' className='mb-2' value={input} onChange={(e) => setInput(e.target.value)} />
                <Button onClick={handleAddSkill} disabled={addingSkill}>{addingSkill ? 'adding..' : 'Continue'}</Button>
            </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddStaffSkillDialog