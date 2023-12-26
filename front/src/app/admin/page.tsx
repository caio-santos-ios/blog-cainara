import { VerifyAdmin } from "@/components/VerifyAdmin"
import { VerifyLogged } from "@/components/VerifyLogged"
import Link from "next/link"

export const dynamic = "force-dynamic"

const Admin = () => {
    return(
        <main className="body">
            <VerifyLogged />
            <VerifyAdmin />
            <section>
                <h1>Bem vindo(a), aqui é a pagina de admin. Exclusivo para Cainara.</h1>
                <h2>Aqui você em breve poderar, criar suas receitas e postar para seu publico acompanhar.</h2>
                <Link href="admin/createPost" className="p-2 bg-blue-500 text-white rounded-md">Criar poste</Link>
            </section>
        </main>
    )
}

export default Admin