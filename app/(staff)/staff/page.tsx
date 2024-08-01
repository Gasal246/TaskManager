"use client"
import { useFindUserById } from '@/query/client/userQueries';
import { MoveRight, TrendingUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react'
import { motion } from 'framer-motion';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

const chartConfig = {
  desktop: {
    label: "Projects",
    color: "#2563eb",
  },
  mobile: {
    label: "Tasks",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const chartData = [
  { month: "January", tasks: 186, projects: 80 },
  { month: "February", tasks: 305, projects: 200 },
  { month: "March", tasks: 237, projects: 120 },
  { month: "April", tasks: 73, projects: 190 },
  { month: "May", tasks: 209, projects: 130 },
  { month: "June", tasks: 214, projects: 140 },
  { month: "July", tasks: 56, projects: 78 },
  { month: "August", tasks: 123, projects: 128 },
  { month: "September", tasks: 89, projects: 200 },
  { month: "October", tasks: 200, projects: 188 },
  { month: "November", tasks: 183, projects: 221 },
  { month: "December", tasks: 159, projects: 144 },
]

const StaffHome = () => {
  const { data: session }: any = useSession();
  const { data: userData, isLoading: userLoading } = useFindUserById(session?.user?.id);
  return (
    <div className='p-4'>
      <h1>Hello, {userData?.Name}!</h1>
      <div className="flex gap-2 flex-wrap">
        <div className="w-full lg:w-2/12 bg-slate-800 p-5 rounded-md border border-slate-600">
          <h1 className='flex items-center justify-between font-medium'>Tasks <motion.div whileHover={{ x: 5 }} className='bg-black px-2 rounded-md cursor-pointer'><MoveRight className='' /></motion.div></h1>
          <h1 className='text-center text-[5em] font-bold'>0</h1>
        </div>
        <div className="w-full lg:w-2/12 bg-slate-800 p-5 rounded-md border border-slate-600">
          <h1 className='flex items-center justify-between font-medium'>Projects <motion.div whileHover={{ x: 5 }} className='bg-black px-2 rounded-md cursor-pointer'><MoveRight className='' /></motion.div></h1>
          <h1 className='text-center text-[5em] font-bold'>0</h1>
        </div>
      </div>
      <div className='flex mt-3 flex-wrap'>
        <Card className='bg-slate-900'>
          <CardHeader>
            <CardTitle>Total Activities - Year</CardTitle>
            <CardDescription>January - December 2024</CardDescription>
          </CardHeader>
          <CardContent >
            <ChartContainer config={chartConfig} className='min-h-[160px] lg:min-h-[200px] max-h-[250px]'>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="projects" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="tasks" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">Progress of your tasks and projects 65% <TrendingUp className="h-4 w-4" /> </div>
            <div className="leading-none text-muted-foreground"> Showing total progress for the last 6 months {/* make the month count by present  */} </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default StaffHome