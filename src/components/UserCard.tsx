import { User } from "@nextui-org/react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

interface Props {
  name: string;
  description: string;
  avatarUrl?: string;
}

export default function UserCard({ name, description, avatarUrl }: Props) {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card className="w-full mb-4">
      <CardBody>
        <User
          name={name || "John Doe"}
          description={description || "Software Engineer"}
          avatarProps={{
            // src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            src: avatarUrl || "https://i.pravatar.cc/150?img=3",
          }}
        />
        {/* Logout button */}
        <Button
          className="mt-4"
          color="danger"
          variant="bordered"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </CardBody>
    </Card>
  );
}
