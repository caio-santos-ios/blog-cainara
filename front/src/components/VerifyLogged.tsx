import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const VerifyLogged = async () => {
    const auth: string | undefined = getCookie("auth", { cookies })

    if(!auth) return redirect("/")
    
    return(<></>)
}