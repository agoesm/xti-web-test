import React from "react";
import { useRouter } from "next/router";
import { fetchUsersById } from "@/services/api";
import { useQuery } from "react-query";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useQuery(["listUsers"], () =>
    fetchUsersById(Number(id))
  );

  if (isLoading) return <Skeleton className="h-60 w-full" />;
  if (error) return <Label className="text-red-500">Something wrong</Label>;

  return (
    <div className="container min-h-screen mx-auto p-4">
      <div className="flex items-center justify-center flex-col gap-4">
        <Image
          src={data?.avatar}
          alt="user"
          unoptimized
          width={250}
          height={250}
        />
        <Label>First Name : {data?.first_name}</Label>
        <Label>Last Name : {data?.last_name}</Label>
        <Label>Email : {data?.email}</Label>

        <Button className="w-80 mt-4" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default UserDetail;
