import React from 'react'
import { Button } from './ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Calendar } from './ui/calendar'
import { DayPicker } from 'react-day-picker'
import { Input } from './ui/input'
import { CardDescription, CardTitle } from './ui/card'
import { Label } from '@radix-ui/react-context-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select'
import { Card, CardContent } from './Card'
import DataTableDemo from './shadcnUiPart/DataTableDemo'
import TextareaDemo from './shadcnUiPart/TextareaDemo'
import SelectDemo from './shadcnUiPart/SelectDemo'
import NavigationMenuDemo from './shadcnUiPart/NavigationMenuDemo'
import MenubarDemo from './shadcnUiPart/MenubarDemo'

const Parts = () => {
  return (
    <div className=" flex-wrap flex-row bg-zinc-100 gap-3">
      <div className="border border-blue-500 p-5">
        <h1>■MenubarDemo</h1>
        <MenubarDemo />
      </div>
      <div className="border border-blue-500 p-5">
        <h1>■NavigationMenuDemo</h1>
        <NavigationMenuDemo />
      </div>
      <div className="border border-blue-500 p-5">
        <h1>■SelectDemo</h1>
        <SelectDemo />
      </div>
      <div className="border border-blue-500 p-5">
        <h1>■TextareaDemo</h1>
        <TextareaDemo />
      </div>
      <div className="border border-blue-500 p-5">
        <h1>■DataTable</h1>
        <DataTableDemo />
      </div>

      <div className="border border-blue-500 p-5">
        <h1>■Button</h1>
        <Button>shadcn/ui Button</Button>
        <hr />
      </div>
      <div className="border border-blue-500">
        <h1>□Table</h1>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <hr />
      </div>
      <div className="border border-blue-500">
        <h1>■Calendar</h1>
        <Calendar mode="single" className="rounded-md border" />
        <hr />
      </div>
      <div className="border border-blue-500">
        <h1>■Card</h1>
        <Card>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <div className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </div>
        </Card>
        <hr />
      </div>
    </div>
  )
}

export default Parts
