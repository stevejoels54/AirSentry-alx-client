import { useState } from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  Snippet,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { storeUserDetailsInLocalStorage } from "../../services/storage.service";
import { auth } from "../../firebase";

export default function AuthForms() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [name, setName] = useState("");

  //   sign up function
  const signUp = (event: any) => {
    setLoading(true);
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setSuccess(true);
        setError(false);
        setMessage("Account created successfully!");
        setLoading(false);
        setSelected("login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(true);
        setSuccess(false);
        setMessage(errorMessage.split(":")[1]);
        setLoading(false);
      });
  };

  //   login function
  const Login = (event: any) => {
    setLoading(true);
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        setSuccess(true);
        setError(false);
        setMessage("Logged in successfully!");
        setLoading(false);
        navigate("/");
        storeUserDetailsInLocalStorage(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(true);
        setSuccess(false);
        setMessage(errorMessage.split(":")[1]);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="mb-2">
        {error ? (
          <Snippet hideCopyButton color="danger">
            {message}
          </Snippet>
        ) : null}
        {success ? (
          <Snippet hideCopyButton color="success">
            {message}
          </Snippet>
        ) : null}
      </div>
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as string)}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    onClick={Login}
                    isLoading={loading}
                  >
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                {/* <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                /> */}
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    onClick={signUp}
                    isLoading={loading}
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
