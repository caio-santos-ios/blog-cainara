import { BASE_URL } from "@/services/api"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const verify = async (id: number, token: string) => {0
    const responsse = await fetch(`${BASE_URL}/accounts/${id}`, { headers: { 'Autorization': `Bearer ${token}`, 'Content-Type': 'application/json' } })
    return responsse.json()
}

export const VerifyLogged = async () => {
    const auth: string | undefined = getCookie("auth", { cookies })

    if(!auth) return redirect("/")
    
    return(<></>)
}