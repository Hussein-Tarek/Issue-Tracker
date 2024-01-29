"use client";

import prisma from "@/prisma/client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

const DeleteIssueButton = ({ id }: { id: number }) => {
  const handleDeleteIssue = async () => {
    // const deletedIssue = await prisma.issue.delete({
    //   where: { id },
    // });
    // console.log(deletedIssue);
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" onClick={handleDeleteIssue}>
          Delete Issue
        </Button>
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
            <Button color="red">Delete Issue</Button>
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
