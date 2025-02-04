"use client";
import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const handleAssign = async (value: string) => {
    let assignedToUserId: string | null = value;
    if (value === "null") assignedToUserId = null;
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId,
      });
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  };

  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "null"}
        onValueChange={handleAssign}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};
const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000 * 10, // 10 minutes
    retry: 3,
  });
export default AssigneeSelect;
