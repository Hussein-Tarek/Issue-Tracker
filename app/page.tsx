import Prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";

export default async function Home() {
  const open = await Prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await Prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await Prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <>
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
      {/* <IssueSummary open={open} inProgress={inProgress} closed={closed} /> */}
    </>
  );
}
