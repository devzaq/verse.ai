"use client"
import { Button } from '@/components/ui/button';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import { Editor } from '@toast-ui/react-editor';
import { Copy } from 'lucide-react';
// import { useEffect, useRef } from 'react';
import "react-quill/dist/quill.snow.css";

import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface PROPS {
    aiGeneratedResult: string;
}
export default function OutputGenerated({ aiGeneratedResult }: PROPS) {
    console.log(aiGeneratedResult);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const editorRef: any = useRef(null);

    // useEffect(() => {
    //     const editorInstance = editorRef.current.getInstance();
    //     editorInstance.setMarkdown(aiGeneratedResult);
    // }, [aiGeneratedResult])
    return (
        <main className=' rounded-lg drop-shadow-2xl'>
            <div className='flex justify-between items-center py-6 px-12'>
                <h4 className='text-xl font-semibold'>Your Result</h4>
                <Button className='uppercase font-semibold'><Copy />&nbsp;&nbsp; copy</Button>
            </div>
            <ReactQuill
                value={aiGeneratedResult}
                // onChange={''}
                theme="snow"
                className="mt-4"
            />
            {/* <Editor
                ref={editorRef}
                initialValue="Result will be displayed here"
                // previewStyle="vertical"
                height="400px"
                initialEditType="wysiwyg"  //WYSIWYG  & markdown
                useCommandShortcut={true}
                onChange={() => console.log(editorRef.current.getInstance().getMarkdown())}
            /> */}
        </main>
    )
}