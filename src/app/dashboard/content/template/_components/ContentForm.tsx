/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FORM } from "@/model/template";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function ContentForm({ template , userFormInput, loading}: any) {
    const [formData, setFormData] = useState<any>();
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        userFormInput(formData);
    }
    console.log(formData, template);

    function handleChange(event: any) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }
    return (
        <main className=" p-5 drop-shadow-2xl rounded-lg h-fi">
            <div className="flex flex-col gap-y-3">
                <Image src={template.icon} alt="" width={70} height={50} />
                <h4 className="text-xl font-bold">{template.name}</h4>
                <p>{template.description}</p>
            </div>
            <form action="" className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                {
                    template.form.map((formField: FORM, idx: number) =>
                        <div key={idx} className="flex flex-col gap-y-3 mt-12 ">
                            <label className="text-xl font-semibold" htmlFor={formField.name}>{formField.label}</label>
                            {
                                formField.field === 'input' ?
                                    <Input name={formField.name} placeholder="content for..." onChange={(e) => handleChange(e)} className="text-lg font-semibold bg-grayg-50 outline-none border-none" />
                                    :
                                    formField.field === 'textarea' ?
                                        <Textarea  name={formField.name} placeholder="hint us on your content..." onChange={(e) => handleChange(e)} className="h-52 text-lg font-semibold  bg-grayg-50 outline-none border-none" />
                                        :
                                        null
                            }
                        </div>
                    )
                }
                <Button className="w-8/12 self-center mt-8 py-5 text-lg font-bold">{loading ? <LoaderIcon className="animate-spin mr-5" /> : 'Generate Content' }</Button>
            </form>
        </main>
    )
}