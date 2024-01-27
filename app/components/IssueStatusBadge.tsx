import { Badge } from "@radix-ui/themes";

const IssueStatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      color={
        status === "OPEN"
          ? "orange"
          : status === "IN_PROGRESS"
          ? "violet"
          : "green"
      }
    >
      {status}
    </Badge>
  );
};

export default IssueStatusBadge;
