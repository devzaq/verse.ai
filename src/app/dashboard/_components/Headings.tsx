import { Search } from "lucide-react";


export default function Headers() {
    return (
        <main className="p-5 flex  justify-between">
            <div className="flex items-center gap-2 bg-zinc-700  p-2 rounded-lg max-w-xl ">
                <Search />
                <input type="text" name="" placeholder='search...' className=" outline-none bg-inherit " />
            </div>
            <div>
                <p className="bg-zinc-700 text-blue-500 rounded-xl p-3 font-semibold ">get Subscribe at $10.80</p>
            </div>
        </main>
    )
}