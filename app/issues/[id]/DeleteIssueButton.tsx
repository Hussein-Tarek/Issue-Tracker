"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ id }: { id: number }) => {
  const router = useRouter();

  const handleDeleteIssue = async () => {
    try {
      await axios.delete(`/api/issues/${id}`);
      router.push("/issues");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue?
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={handleDeleteIssue}>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
      {/* <AlertDialog.Footer>
        <AlertDialog.FooterButton onClick={handleDeleteIssue}>
          Delete
        </AlertDialog.FooterButton>
      </AlertDialog.Footer> */}
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
