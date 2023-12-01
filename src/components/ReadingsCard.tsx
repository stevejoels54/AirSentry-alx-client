import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";

interface Props {
  name: string;
  description: string;
  value: number;
  color: string;
  unit: string;
}

export default function ReadingsCard({
  name,
  description,
  value,
  color,
  unit,
}: Props) {
  return (
    <Card className="w-[240px] h-[240px] border-none  m-2">
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            value: "text-3xl font-semibold",
          }}
          label={name}
          size="lg"
          value={value}
          color={
            color === "primary"
              ? "primary"
              : color === "success"
              ? "success"
              : color === "warning"
              ? "warning"
              : color === "secondary"
              ? "secondary"
              : color === "danger"
              ? "danger"
              : "default"
          }
          formatOptions={{
            style: "unit",
            unit: unit,
            unitDisplay: "short",
          }}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: "border-1",
            content: "text-small font-semibold",
          }}
          color={
            color === "primary"
              ? "primary"
              : color === "success"
              ? "success"
              : color === "warning"
              ? "warning"
              : color === "secondary"
              ? "secondary"
              : color === "danger"
              ? "danger"
              : "default"
          }
          variant="bordered"
        >
          {description}
        </Chip>
      </CardFooter>
    </Card>
  );
}
