'use client'
import { TemplateProps, contentTemplate } from "@/model/template"
import TemplateCard from "./TemplateCard"
import { useEffect, useState } from "react"
import { PlusCircleIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface PROPS {
    searchValue: string
}
export default function Templates({ searchValue }: PROPS) {

    const [searchedTemplates, setSearchTemplates] = useState<TemplateProps[]>([]);

    useEffect(() => {
        if (searchValue) {
            const filteredTemplate = contentTemplate.filter((template) => template.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
            setSearchTemplates(filteredTemplate);
        } else {
            setSearchTemplates(contentTemplate);
        }
    }, [searchValue])

    const handleOpenCreateTemplate = () => {

    }
    return (
        <main className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-8 p-5 h-[700px] overflow-y-scroll ">
                <div className=" bg-gray-50 bg-opacity-30 drop-shadow-2xl rounded-lg hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer ">
                    <div onClick={() => handleOpenCreateTemplate()} className="flex flex-col gap-y-3 items-center justify-center h-full w-full ">
                        <h4 className="text-xl font-semibold text-center"> Create your own template</h4>
                        <Dialog >
                            <DialogTrigger><PlusCircleIcon className=" size-12" />  </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        <form action="" onSubmit={(e) => e.preventDefault()} className="border-2 rounded-lg p-5 m-8 flex flex-col  gap-4">
                                            <div className="flex flex-col gap-1 text-xl ">
                                                <label htmlFor="title" className="font-semibold text-gray-600">Template Title</label>
                                                <Input type="text" name="title" placeholder="Enter title..."  />
                                            </div>
                                            <div className="flex flex-col gap-1 text-xl ">
                                                <label htmlFor="description" className="font-semibold text-gray-600">Template Description</label>
                                                <Textarea name="description" placeholder="Enter description..." value={''}  />
                                            </div>
                                            <Button variant={'default'}>Add Template</Button>
                                        </form>
                                    </DialogTitle>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                {
                    searchedTemplates.map((template: TemplateProps, idx: number) =>
                        <TemplateCard key={idx} {...template} />
                    )
                }
            </div>
        </main>
    )
}