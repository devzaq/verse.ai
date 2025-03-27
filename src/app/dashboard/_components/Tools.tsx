"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { tools, ToolsProps } from "../tools/tools";
import { useRouter } from "next/navigation";

export default function Tools() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-8 py-24">
      <h5 className="text-center text-6xl ">Tools & Features</h5>
      <div className="grid grid-cols-3 gap-8">
        {tools.map((tool: ToolsProps, idx: number) => (
          <Card key={idx} className="shadow-2xl ">
            <CardContent className="flex flex-col items-center gap-y-5 p-4">
              <Image
                src={tool.image || "/path/to/your/image.jpg"}
                width={200}
                height={200}
                alt="Tool Image"
                className="w-full h-auto object-cover rounded-lg"
              />
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  {tool.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {tool.description}
                </CardDescription>
                <Button
                  onClick={() => router.push(`/dashboard/${tool.path}`)}
                  className="border-white rounded-full text-sm"
                >
                  {tool.buttonContent}
                </Button>
              </CardHeader>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
