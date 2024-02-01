import Prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "../components";

const LatestIssues = async () => {
  const issues = await Prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });
  return (
    <Card>
      <Heading size="5" mb="4">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex direction="column" align="start">
                  {issue.title}
                  <IssueStatusBadge status={issue.status} />
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <Avatar
                  src={issue.assignedToUser?.image!}
                  fallback="?"
                  size="3"
                  radius="full"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
