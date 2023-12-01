import { Card, Skeleton } from "@nextui-org/react";

export default function LoadingCard() {
  return (
    <Card className="w-[240px] h-[240px] border-none  space-y-5 p-4 m-2">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-gray-500"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-gray-500"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-gray-500"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-gray-500"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
