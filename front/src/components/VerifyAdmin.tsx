import { BASE_URL } from "@/services/api"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type Tauth = {
    id: number;
    token: string;
}

const verify = async (id: number, token: string) => {0
    const responsse = await fetch(`${BASE_URL}/accounts/${id}`, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } })
    return responsse.json()
}

export const VerifyAdmin = async () => {
    const auth: string | undefined = getCookie("auth", { cookies })

    const authDecoded: Tauth = JSON.parse(auth!)
    const user = await verify(authDecoded.id, authDecoded.token)

    if(!user.isAdmin) return redirect("/")
    console.log(user.isAdmin)
    return(<></>)
}