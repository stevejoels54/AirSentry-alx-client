import { Spinner } from "@nextui-org/react";

const AppLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Spinner size="lg" />
    </div>
  );
};

export default AppLoading;
