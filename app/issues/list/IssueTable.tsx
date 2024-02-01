import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import React from "react";
import NextLink from "next/link";
import { Issue } from "@prisma/client";

interface Props {
  searchParams: { status: string; orderBy: keyof Issue; page: string };
  issues: Issue[];
}
const IssueTable = ({ searchParams, issues }: Props) => {
  return (
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
  );
};
const columns: { title: string; value: keyof Issue; className?: string }[] = [
  { title: "Issue", value: "title" },
  { title: "Status", value: "status", className: "hidden md:table-cell" },
  {
    title: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];
export const columnsNames = columns.map((column) => column.value);
export default IssueTable;
