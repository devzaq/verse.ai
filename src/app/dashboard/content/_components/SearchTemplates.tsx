
import { Search } from "lucide-react";


interface SearchProps {
    searchInput: (val: string) => void
}
export default function SearchTemplates({ searchInput }: SearchProps) {
    return (
        <main>
            <div className=" flex flex-col gap-y-8 items-center justify-center py-2">
                <div className="flex flex-col items-center gap-2">
                    <h5 className="text-5xl font-semibold">Browse all templates</h5>
                    <p className="">Get templates for your usage.</p>
                </div>
                <div className="flex items-center gap-2 border p-2 bg-gray-50 rounded-lg w-96 ">
                    <Search />
                    <input type="text" name="" placeholder='search template...' onChange={(e) => searchInput(e.target.value)} className=" outline-none w-full bg-inherit  " />
                </div>

            </div>
        </main>
    )
} 