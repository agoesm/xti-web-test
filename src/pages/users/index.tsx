import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchUsers } from "@/services/api";
import { useRouter } from "next/router";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

const UsersList = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useQuery(["listUsers"], fetchUsers);
  // console.log("data => ", data);

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    router.push("/login");
  };

  if (isLoading) return <Skeleton className="h-60 w-full" />;
  if (error) return <Label className="text-red-500">Something wrong</Label>;
  const usersList = Array.isArray(data)
    ? data.filter(
        (user) =>
          user.first_name.toLowerCase().includes(search.toLowerCase()) ||
          user.last_name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="container min-h-screen mx-auto p-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold">User List</h1>
        <Image
          src="logout.svg"
          alt="user"
          width={30}
          height={30}
          onClick={handleLogout}
        />
      </div>

      <Input
        placeholder="Search user..."
        className="mb-4 w-[100]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* table */}
      <Table>
        <TableHeader className="bg-black">
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">First Name</TableHead>
            <TableHead className="text-white">Last Name</TableHead>
            <TableHead className="text-white">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList?.map((user: UserType) => (
            <TableRow
              key={user.id}
              onClick={() => router.push(`/users/${user.id}`)}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
