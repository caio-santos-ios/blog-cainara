import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Pagina Admin",
    description: "Pagina inicial do admin"
}

const AdminLayout = ({children}: { children: React.ReactNode }) => {
    return(
        <html lang="pt-Br">
            <body>
                {children}
            </body>
        </html>
    )
}

export default AdminLayout