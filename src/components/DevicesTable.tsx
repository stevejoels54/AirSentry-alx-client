import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Snippet,
  Skeleton,
  Card,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { PlusIcon } from "./PlusIcon";
import { useQuery } from "@tanstack/react-query";

export default function DevicesTable() {
  const fetchDevices = async () => {
    const response = await fetch(
      `https://air-sentry-alx-server.vercel.app/airsentry/api/v1/devices`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["devices"],
    queryFn: () => fetchDevices(),
  });

  if (isLoading) {
    return (
      <Card className="w-full space-y-5 p-4" radius="lg">
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

  if (isError && error) {
    return (
      <Card className="w-full space-y-5 p-4" radius="lg">
        <Snippet hideCopyButton color="danger">
          Error fetching data: {error.message}. Please press the reload button
          to try again.
        </Snippet>
      </Card>
    );
  }

  if (!error && !isError && data) {
    interface device {
      _id?: {
        $oid: string;
      };
      device_name: string;
      device_type: string;
      device_location: string;
      device_lat?: number;
      device_long?: number;
      device_status: string;
      uid?: string;
    }

    interface devices {
      devices: device[];
    }

    const devices: device[] = data;

    const topContent = (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
          />
          <div className="flex gap-3">
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
      </div>
    );

    return (
      <Table
        isStriped
        aria-label="Example static collection table"
        topContent={topContent}
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>LOCATION</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {devices?.map((device) => (
            <TableRow key={device._id?.$oid}>
              <TableCell>{device.device_name}</TableCell>
              <TableCell>{device.device_type}</TableCell>
              <TableCell>{device.device_location}</TableCell>
              <TableCell>{device.device_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
