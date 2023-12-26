import { FormCreatePost } from "@/components/FormCreatePost";
import { VerifyAdmin } from "@/components/VerifyAdmin";
import { VerifyLogged } from "@/components/VerifyLogged";
import Link from "next/link";

const createPost = () => {
    return(
        <main className="body">
            <VerifyLogged />
            <VerifyAdmin />
            <section className="section flex justify-center items-center">
                <Link href="/">Voltar</Link>
                <FormCreatePost />
            </section>
        </main>
    )
}

export default createPost;