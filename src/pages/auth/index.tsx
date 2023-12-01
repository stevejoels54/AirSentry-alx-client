import { Image } from "@nextui-org/react";
import AuthForms from "./Forms";
// import art1 from "../../assets/green-scape.jpeg";
import art2 from "../../assets/masks.jpeg";

export default function Auth() {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Image Section (hidden on small screens) */}
      <div className="hidden md:flex justify-center items-center w-full md:w-1/2 h-full bg-gray-200">
        <div className="w-full h-full">
          <Image src={art2} className="w-screen h-screen" radius={"none"} />
        </div>
      </div>

      {/* AuthForms Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full">
        <div className="w-full md:w-2/3 lg:w-1/2 text-center">
          <h1 className="text-4xl font-bold text-center m-5">
            Welcome to AirSentry
          </h1>
          <div className="flex flex-col justify-center items-center">
            <AuthForms />
          </div>
        </div>
      </div>
    </div>
  );
}
