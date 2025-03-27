"use client"
import { contentTemplate, FORM, TemplateProps } from "@/model/template"
// import { useState } from "react"
import ContentForm from "../_components/ContentForm";
import OutputGenerated from "../_components/OutputGenerated";
// import openai from "@/model/aiModel";
import { useState } from "react";
import axios from 'axios';

interface PROPS {
    params: {
        'template-slug': string
    }
}
export default function ContentSlug(props: PROPS) {
    const [aiGenerateResult, setAIGeneratedResult] = useState<string>('');
    const [loading, setLoading] = useState(false)
    const template: TemplateProps | undefined = contentTemplate.find((template) => template.slug === props.params["template-slug"])

    console.log(props.params, template, 'in form');
    
    // GENERATE AI CONTENT
    // const generateAiContent = async (value: FORM) => {
    //     setLoading(true);
    //     const selectedPrompt = template?.aiPrompt;
    //     const finalPrompt = JSON.stringify(value) + ' ' + selectedPrompt;
    //     const completion = await openai.chat.completions.create({
    //         model: "gpt-4o-mini",
    //         messages: [
    //             // { role: "system", content: "You are a helpful assistant." },
    //             {
    //                 role: "user",
    //                 content: finalPrompt,
    //             },
    //         ],
    //     });
    //     // const result = await chatSession.sendMessage(finalPrompt);
    //     if (completion.choices[0].message) {
    //         console.log(completion.choices[0].message);
    //         // setAIGeneratedResult(completion.choices[0].message());
    //         setAIGeneratedResult('completion.choices[0].message()');

    //     }
    //     setLoading(false);
    // }


    const fetchAIResponse = async (value: FORM) => {
        setLoading(true);
        const selectedPrompt = template?.aiPrompt;
        const prompt = JSON.stringify(value) + ' ' + selectedPrompt;
        try {
            const res = await axios.post('/api/openAi', { prompt }, {
                headers: { 'Content-Type': 'application/json' },
            });
            setAIGeneratedResult(res.data.data || res.data.error);
        } catch (error) {
            console.log(error);

            setAIGeneratedResult('Error fetching response');
        }
        setLoading(false);
    };


    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 bg-opacity-30 h-screen p-5">
            <ContentForm template={template} userFormInput={(value: FORM) => fetchAIResponse(value)} loading={loading} />
            <OutputGenerated aiGeneratedResult={aiGenerateResult} />
        </main>
    )
}