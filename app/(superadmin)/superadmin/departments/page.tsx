import { Button } from '@/components/ui/button'
import React from 'react'

const DepartmentPage = () => {
  return (
    <div className='p-4'>
        <div className="flex justify-between">
            <h1 className='font-semibold'>Department Management</h1>
            <Button>Customize Department</Button>
        </div>

    </div>
  )
}

export default DepartmentPage