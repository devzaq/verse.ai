'use client'
import {   useState } from "react";
import SearchTemplates from "./_components/SearchTemplates";
import Templates from "./_components/Templates";
// import { useRouter } from "next/router";
// import { useUser } from "@clerk/nextjs";

export default function Content() {
    const [searchValue, setSearchValue] = useState<string>('');
    return (
        <main>
            <SearchTemplates searchInput={(value: string) => setSearchValue(value)} />
            <Templates searchValue={searchValue} />
        </main>
    )

}