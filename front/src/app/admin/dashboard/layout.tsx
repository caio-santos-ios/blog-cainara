import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard da minha do admin"
}

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return(
        <html  lang="pt-Br">
            <body>
                {children}
            </body>
        </html>
    )
}

export default DashboardLayout