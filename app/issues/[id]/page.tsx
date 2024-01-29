import prisma from "@/prisma/client";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetailsComponent from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  if (isNaN(+id)) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: +id },
  });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetailsComponent issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton id={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
