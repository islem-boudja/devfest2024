import React from "react";
import { FaFileExport, FaUserCircle } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { HiOutlineMailOpen } from "react-icons/hi";
import Modal from "~/components/layout/DeleteModal";
import InviteModal from "~/components/layout/InviteModal";
const employeesData = [
  {
    id: 1,
    fullName: "Lamia Bakli",
    username: "@lamia_bakli",
    email: "l.bakli@corporate.com",
  },
  {
    id: 2,
    fullName: "Lamia Bakli",
    username: "@lamia_bakli",
    email: "l.bakli@corporate.com",
  },
  {
    id: 3,
    fullName: "Lamia Bakli",
    username: "@lamia_bakli",
    email: "l.bakli@corporate.com",
  },
  {
    id: 4,
    fullName: "Lamia Bakli",
    username: "@lamia_bakli",
    email: "l.bakli@corporate.com",
  },
  {
    id: 5,
    fullName: "Lamia Bakli",
    username: "@lamia_bakli",
    email: "l.bakli@corporate.com",
  },
  {
    id: 6,
    fullName: "Lamia Bakli",
    username: "@lamia_bakli",
    email: "l.bakli@corporate.com",
  },
  {
    id: 7,
    fullName: "Lamia Bakli",
    username: "@lamia_bakli",
    email: "l.bakli@corporate.com",
  },
  {
    id: 8,
    fullName: "Lamia Bakli",
    username: "@lamia_bakli",
    email: "l.bakli@corporate.com",
  },
  {
    id: 9,
    fullName: "Lamia Bakli",
    username: "@lamia_bakli",
    email: "l.bakli@corporate.com",
  },
];

export default function AccountsSettingsPage() {
  return (
    <div className="flex flex-col gap-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[#071139]">
          Accounts Settings
        </h1>
        <FaUserCircle size={30} className="text-[#071139]" />
      </div>

      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="employees"
            className="bg-gray-200 hover:bg-gray-300 data-[state=active]:bg-second"
          >
            Employees
          </TabsTrigger>
          <TabsTrigger
            value="finance-manager"
            className="bg-gray-200 hover:bg-gray-300 data-[state=active]:bg-second"
          >
            Finance Manager
          </TabsTrigger>
          <TabsTrigger
            value="company-profile"
            className="bg-gray-200 hover:bg-gray-300 data-[state=active]:bg-second"
          >
            Company Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="mt-4">
          <div className="rounded-lg bg-white p-6 shadow-[0px_4px_14px_0px_#00000040]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <p className="text-sm font-medium text-gray-500">Sort by:</p>
                <Select defaultValue="a-z">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a-z">A-Z</SelectItem>
                    <SelectItem value="z-a">Z-A</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-x-4">
                <Input placeholder="Search Employees" className="w-64" />
                <div className="flex cursor-pointer items-center gap-x-2 self-end rounded-md bg-main p-2 px-4 text-lg font-medium text-white">
                  <FaFileExport size={20} />
                  <p>Export</p>
                </div>{" "}
                <div className="flex cursor-pointer items-center gap-x-2 self-end rounded-md bg-second p-2 px-4 text-lg font-medium text-main">
                  <HiOutlineMailOpen size={20} />
                  <InviteModal>
                    <p>Create invite link</p>
                  </InviteModal>
                </div>{" "}
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeesData.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-x-2">
                        <FaUserCircle size={24} className="text-gray-400" />
                        {employee.fullName}
                      </div>
                    </TableCell>
                    <TableCell>{employee.username}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>
                      <Modal name={employee.fullName}>
                        <IoMdTrash className="size-7 text-red-500" />
                      </Modal>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Employees per page:
                <Select defaultValue="12">
                  <SelectTrigger className="ml-2 w-[60px]">
                    <SelectValue placeholder="12" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="36">36</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-x-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="company-profile" className="mt-4"></TabsContent>
      </Tabs>
    </div>
  );
}
