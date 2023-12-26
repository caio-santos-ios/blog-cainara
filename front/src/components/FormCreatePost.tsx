"use client"

import "@/style/styleForm.css"
import { Tpost } from "@/@types/post"
import { useForm } from "react-hook-form"
import { api } from "@/services/api"
import { getCookie } from "cookies-next"
import { toast } from "react-toastify"
import { useState } from "react"

export const FormCreatePost = () => {
    const [loading, setLoading] = useState(false)

    const auth: string | undefined = getCookie("auth")
    const authDecoded = JSON.parse(auth!)
    
    const { register, handleSubmit, reset } = useForm<any>()

    const createPost = async (data: Tpost) => {
        setLoading(true)
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append("coverPhoto", data.coverPhoto[0])
        formData.append("photos", data.photos[0])
        
        try {
            await api.post("/posts", formData, { headers: { Authorization: `Bearer ${authDecoded.token}` } })
            reset()
            setLoading(false)
        } catch (error) { setLoading(true)}
    }
    
    return(
        <form className="formReset w-[40rem]" onSubmit={handleSubmit(createPost)}>
            <label htmlFor="title" className="labelReset border-2 border-slate-300 rounded-md">
                    <input required {...register("title")} className="inputReset w-full p-2 rounded-md" placeholder="titulo" type="text" />
            </label>
            <label htmlFor="description" className="labelReset border-2 border-slate-300 rounded-md">
                    <textarea required placeholder="Ecreva aqui a descrição do seu poste..." {...register("description")} className="inputReset w-full p-2 rounded-md" cols={10} rows={10}></textarea>
            </label>
            <label htmlFor="coverPhoto" className="labelReset border-2 border-slate-300 rounded-md">
                    <input required {...register("coverPhoto")} className="inputReset w-full p-2 rounded-md" placeholder="descrição" type="file" />
            </label>
            <label htmlFor="photos" className="labelReset border-2 border-slate-300 rounded-md">
                    <input required {...register("photos")} className="inputReset w-full p-2 rounded-md" placeholder="descrição" type="file" />
            </label>
            <button className="btnSubmit bg-blue-500 text-white flex justify-center items-center h-12 px-4" type="submit">
                {
                    loading ?
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-white border-solid"></div>
                    :
                <div>Criar</div>
                }
            </button>
        </form>
    )
}