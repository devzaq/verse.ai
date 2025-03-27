import Headers from "./_components/Headers"


export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex flex-col items-center justify-center mx-auto gap-y-8 max-w-7xl">
            <Headers />
            {children}
        </div>
    )
}