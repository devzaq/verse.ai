'use client'
import Image from "next/image";
import logo from '@/public/logo.svg'
import { CreditCard, History, Home, LogOut, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export default function Sidebar() {

    const path = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();
    if (status === 'unauthenticated') router.push('/sign-in');
    const menu = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard',
        },
        {
            name: 'History',
            icon: History,
            path: '/dashboard/history',
        },
        {
            name: 'Billing',
            icon: CreditCard,
            path: '/dashboard/billing',
        },
        {
            name: 'Settings',
            icon: Settings,
            path: '/dashboard/settings',
        },
    ]

    // function handleMenuNavigation(selectedPath: string) {
    //         console.log(path === selectedPath);
    //         router.push(selectedPath);
    // };

    return (
        <main className="h-screen p-5 bg-zinc-800 rounded-lg">
            <div className="flex justify-center">
                <Image src={logo} alt="LOGO" width={80} height={100} />
            </div>
            <div className="flex flex-col gap-y-5 mt-8">
                {
                    menu.map((menu, idx) =>
                        <div onClick={() => router.push(menu.path)} key={idx} className={`flex gap-x-5 items-center hover:bg-zinc-700 hover:text-white text-xl font-semibold  p-2 rounded-lg cursor-pointer ${path === menu.path && 'bg-zinc-800 text-white'} `}>
                            <menu.icon />
                            <h5 >{menu.name}</h5>
                        </div>
                    )
                }
            </div>

            <div>
                <Menubar className="py-8 mt-52 bg-zinc-700 border-none">
                    <MenubarMenu>
                        <MenubarTrigger className="flex gap-x-3 p-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className="flex gap-5 font-semibold text-2xl"> {session?.user?.email}</h1>
                        </MenubarTrigger>
                        <MenubarContent onClick={() => signOut()} className="flex gap-4">
                            <MenubarItem className="font-bold text-xl"> Logout</MenubarItem>
                            <MenubarItem > <LogOut className="size-8" /></MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </main>
    )
}