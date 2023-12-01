import { Button, Snippet, Avatar } from "@nextui-org/react";
import UserCard from "../components/UserCard";
import ReadingsCard from "../components/ReadingsCard";
import LoadingCard from "../components/LoadingCard";
import DevicesTable from "../components/DevicesTable";
import { getDescription } from "../helpers/descriptions";
import { getColor } from "../helpers/colors";
import moment from "moment";
import { auth } from "../firebase";
import { useQuery } from "@tanstack/react-query";
import logo from "../assets/logo.jpeg";

const WelcomeSection = () => (
  <div className="flex justify-center items-center w-full md:w-1/2 bg-gray-200 p-4">
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col w-full justify-center items-center">
        <Avatar src={logo} className="w-40 h-40 text-large" />
      </div>
      <div className="flex flex-col w-full justify-start">
        <h1 className="text-2xl font-bold text-center m-5">
          Welcome to AirSentry
        </h1>
      </div>
      <UserCard
        name={auth.currentUser?.email || " "}
        description={""}
        avatarUrl={auth.currentUser?.photoURL || ""}
      />
      <div className="flex flex-col w-full justify-start">
        <h1 className="text-2xl font-bold text-start m-5">Your Devices</h1>
      </div>
      <DevicesTable />
    </div>
  </div>
);

interface DataSectionProps {
  air: number;
  co2: number;
  temperature: number;
  humidity: number;
}

const DataSection = ({ air, co2, temperature, humidity }: DataSectionProps) => (
  <div className="flex justify-center items-center w-full md:w-1/2 bg-gray-300 p-4">
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-start m-5">Today's Readings</h1>
      <div className="flex justify-end items-center text-sm text-gray-500">
        <p>Last updated: {moment().format("MMMM Do YYYY, h:mm:ss a")}</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <ReadingsCard
          name={"Air Quality"}
          description={getDescription("airQuality", air / 10)}
          value={air / 10}
          color={getColor("airQuality", air / 10)}
          unit={"percent"}
        />
        <ReadingsCard
          name={"CO2"}
          description={getDescription("co2", co2 / 10)}
          value={co2 / 10}
          color={getColor("co2", co2 / 10)}
          unit={"percent"}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <ReadingsCard
          name={"Temperature"}
          description={getDescription("temperature", temperature)}
          value={temperature}
          color={getColor("temperature", temperature)}
          unit={"celsius"}
        />
        <ReadingsCard
          name={"Humidity"}
          description={getDescription("humidity", humidity)}
          value={humidity}
          color={getColor("humidity", humidity)}
          unit={"percent"}
        />
      </div>
      <div className="flex justify-center items-center w-full">
        <Button
          color="primary"
          variant="bordered"
          className="w-full mt-5"
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>
      </div>
    </div>
  </div>
);

const LoadingSection = () => (
  <div className="flex justify-center items-center w-full md:w-1/2 bg-gray-300 p-4">
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-start m-5">Today's Readings</h1>
      <div className="flex justify-end items-center text-sm text-gray-500">
        <p>Last updated: {moment().format("MMMM Do YYYY, h:mm:ss a")}</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <LoadingCard />
        <LoadingCard />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <LoadingCard />
        <LoadingCard />
      </div>
      <div className="flex justify-center items-center w-full">
        <Button
          color="primary"
          variant="bordered"
          className="w-full mt-5"
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>
      </div>
    </div>
  </div>
);

interface ErrorSectionProps {
  error: string;
}

const ErrorSection = ({ error }: ErrorSectionProps) => (
  <div className="flex justify-center items-center w-full md:w-1/2 bg-gray-300 p-4">
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-start m-5">Today's Readings</h1>
      <div className="flex justify-end items-center text-sm text-gray-500">
        <p>Last updated: {moment().format("MMMM Do YYYY, h:mm:ss a")}</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <Snippet hideCopyButton color="danger">
          Error fetching data: {error}. Please press the reload button to try
          again.
        </Snippet>
      </div>
      <div className="flex justify-center items-center w-full">
        <Button
          color="primary"
          variant="bordered"
          className="w-full mt-5"
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>
      </div>
    </div>
  </div>
);

const Home = () => {
  const deviceId = import.meta.env.VITE_APP_DEVICE_ID;

  const fetchReadingData = async (deviceId: string) => {
    const response = await fetch(
      `https://air-sentry-alx-server.vercel.app/airsentry/api/v1/readings/${deviceId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["reading", deviceId],
    queryFn: () => fetchReadingData(deviceId),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <WelcomeSection />
        <LoadingSection />
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <WelcomeSection />
        <ErrorSection error={error.message} />
      </div>
    );
  }

  if (!error && !isError && data) {
    const { air, co2, temperature, humidity } = data;

    return (
      <div className="flex flex-col md:flex-row h-screen">
        <WelcomeSection />
        <DataSection
          air={air}
          co2={co2}
          temperature={temperature}
          humidity={humidity}
        />
      </div>
    );
  }
};

export default Home;
