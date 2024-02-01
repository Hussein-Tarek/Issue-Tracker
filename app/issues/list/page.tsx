import { Flex } from "@radix-ui/themes";

import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { Query, columnsNames } from "./IssueTable";
import { Metadata } from "next";

interface Status {
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
}
const statues = ["OPEN", "IN_PROGRESS", "CLOSED"];

const IssuePage = async ({ searchParams }: { searchParams: Query }) => {
  const pageSize = 10;

  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };
  const orderBy = columnsNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const pageNumber = parseInt(searchParams.page) || 1;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: pageSize * (pageNumber - 1),
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <>
      <Flex direction="column" gap="5">
        <IssueActions />
        <IssueTable searchParams={searchParams} issues={issues} />
        <Flex justify="center">
          <Pagination
            itemCount={issueCount}
            pageSize={pageSize}
            currentPage={pageNumber}
          />
        </Flex>
      </Flex>
    </>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List ",
  description: "View all issues",
};

export default IssuePage;
