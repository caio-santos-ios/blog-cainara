"use client"

import { Tpost } from "@/@types/post"
import { api } from "@/services/api"
import { getCookie } from "cookies-next"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CiChat1, CiHeart } from "react-icons/ci"
import { toast } from "react-toastify"

export const CardPost = ({ id, coverPhoto, photos, title, description, comments, _count, authorId}: Tpost) => {
    const auth: string | undefined = getCookie("auth")
    const authDecoded = auth && JSON.parse(auth!)

    const [isLike, setIsLike] = useState(_count.likes > 0 ? true : false)
    const [qtdLike, setQtdLike] = useState(_count.likes)
    const router = useRouter()

    const like = async (id: string) => {
        if(!authDecoded) return toast("Faça login para curtir os postes")
        
        try {
            const res = await api.post("/likes", { postId: Number(id) }, { headers: { Authorization: `Bearer ${authDecoded.token}` } })
            console.log(res)
        } catch (error) {console.log(error)}
    }

    const comment = (id: string) => {
        if(!authDecoded) return toast("Faça login para comentar nos postes")

    }

    return(
        <li id={String(id)} className="w-full rounded-lg max-w-[30rem] hover:shadow-xl hover:border-2 ">
           <Image id={String(coverPhoto.id)} onClick={() => router.push(`/${id}`)} className="w-full h-72 rounded-t-lg" width={100} height={100} alt="" src={coverPhoto.url} />
            <div className="rounded-b-lg roun p-4 bg-slate-100">
                <h1 className="font-semibold text-2xl">{title}</h1>
                <div className="flex gap-2">
                    <button id={String(id)} onClick={(e) => like(e.currentTarget.id)} className="flex flex-col items-center">
                        <CiHeart size={25}/>
                        <span>{qtdLike}</span>
                    </button>
                    <button id={String(id)} onClick={(e) => comment(e.currentTarget.id)} className="flex flex-col items-center">
                        <CiChat1 size={25}/>
                        <span>{_count.comments}</span>
                    </button>
                </div>
            </div>
        </li>
    )
}