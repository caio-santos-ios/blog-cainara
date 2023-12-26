import { FormCreatePost } from "@/components/FormCreatePost";
import { VerifyAdmin } from "@/components/VerifyAdmin";
import { VerifyLogged } from "@/components/VerifyLogged";

const createPost = () => {
    return(
        <main className="body">
            <VerifyLogged />
            <VerifyAdmin />
            <section className="section flex justify-center items-center">
                <FormCreatePost />
            </section>
        </main>
    )
}

export default createPost;