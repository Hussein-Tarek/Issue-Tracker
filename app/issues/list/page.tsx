import { Table } from "@radix-ui/themes";
import { Issue } from "@prisma/client";
import NextLink from "next/link";

import IssueActions from "./IssueActions";
import prisma from "@/prisma/client";
import { IssueStatusBadge, Link } from "@/app/components";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Status {
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
}
const statues = ["OPEN", "IN_PROGRESS", "CLOSED"];

const IssuePage = async ({
  searchParams,
}: {
  searchParams: { status: string; orderBy: keyof Issue };
}) => {
  const columns: { title: string; value: keyof Issue; className?: string }[] = [
    { title: "Issue", value: "title" },
    { title: "Status", value: "status", className: "hidden md:table-cell" },
    {
      title: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = Object.values(columns)
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.title}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.title}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuePage;
