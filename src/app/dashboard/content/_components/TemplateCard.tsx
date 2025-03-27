import { TemplateProps } from "@/model/template";
import Image from "next/image";
import Link from "next/link";


export default function TemplateCard(template: TemplateProps) {
    return (
        <Link href={`/dashboard/content/template/${template.slug}`}>
            <div className=" flex flex-col gap-y-5  bg-gray-50 bg-opacity-30   h-64 drop-shadow-2xl rounded-lg p-5 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
                <Image src={template.icon} alt='' width={70} height={50} />
                <div className="flex flex-col gap-y-3 ">
                    <h4 className="text-xl font-semibold">{template.name}</h4>
                    <p className="text-lg text-gray-700">{template.description}</p>
                </div>
            </div>
        </Link>
    )
}