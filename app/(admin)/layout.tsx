import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Taskmanager | Admin",
  description: "a site by Muhammed Gasal",
};

const AdminLayout = async ({ children }: { 
  children: React.ReactNode
}) => {
  const session = await getServerSession(authOptions)
  if(!session){
    return redirect('/signin')
  }
  return (
    <div className='w-full h-screen overflow-hidden'>
      <AdminTopbar />
      <div className="flex w-full h-full">
        <div className="w-2/12 h-full"><AdminSidebar /></div>
        <div className="w-10/12 h-full">{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout