import { Button } from "@/components/ui/button";
import Image from "next/image";
import landingAi2 from "@/public/ai4.png";

export default function LandingPage() {
  return (
    <main className="flex items-center justify-center mx-auto max-w-7xl text-black">
      <div className="flex flex-col items-center justify-center gap-y-4 ">
        <h1 className="text-6xl mb-2  mt-8 text-center">
          Explore our suite of{" "}
          <span className=" text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 via-fuchsia-500 to-fuchsia-800 font-semibold">
            AI tools
          </span>{" "}
          designed to enhance productivity and creativity.
        </h1>
        <div className="flex items-center justify-center gap-4">
          <p className=" bg-gray-50 rounded-full p-2 px-4 bg-opacity-30">
            Discover the future of technology with us.
          </p>
          <Button className="rounded-full bg-none hover:bg-none text-md">
            Get started
          </Button>
        </div>
        {/* <div className="flex items-center relative"> */}
        {/* <Image src={landingAi || "/path/to/your/image.jpg"} width={100} height={100} alt="Landing" className="w-[700px] h-[400px] object-cover rounded-lg shadow-lg mt-8" /> */}
        <Image
          src={landingAi2 || "/path/to/your/image.jpg"}
          width={1000}
          height={100}
          alt="Landing"
          className="w-[700px] h-[400px]  rounded-lg shadow-lg mt-8"
        />
        {/* </div> */}
      </div>
    </main>
  );
}
