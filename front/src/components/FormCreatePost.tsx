"use client"

import "@/style/styleForm.css"
import { Tpost } from "@/@types/post"
import { useForm } from "react-hook-form"
import { api } from "@/services/api"
import { getCookie } from "cookies-next"
import { useState } from "react"

export const FormCreatePost = () => {
    const [imagem, setImagem] = useState<any>(null)

    const auth: string | undefined = getCookie("auth")
    const authDecoded = JSON.parse(auth!)
    
    const { register, handleSubmit } = useForm<any>()

    const createPost = async (data: Tpost) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append("coverPhoto", data.coverPhoto[0])
        formData.append("photos", data.photos[0])
        
        try {
            const res = await api.post("/posts", formData, { headers: { Authorization: `Bearer ${authDecoded.token}` } })
            console.log(res)
        } catch (error) {console.log(error)}

        console.log(formData)
        console.log(data)
    }
    
    return(
        <form className="formReset w-[40rem]" onSubmit={handleSubmit(createPost)}>
            <label htmlFor="title" className="labelReset border-2 border-slate-300 rounded-md">
                    <input {...register("title")} className="inputReset w-full p-2 rounded-md" placeholder="titulo" type="text" />
            </label>
            <label htmlFor="description" className="labelReset border-2 border-slate-300 rounded-md">
                    <textarea placeholder="Ecreva aqui a descrição do seu poste..." {...register("description")} className="inputReset w-full p-2 rounded-md" cols={10} rows={10}></textarea>
            </label>
            <label htmlFor="coverPhoto" className="labelReset border-2 border-slate-300 rounded-md">
                    <input {...register("coverPhoto")} className="inputReset w-full p-2 rounded-md" placeholder="descrição" type="file" />
            </label>
            <label htmlFor="photos" className="labelReset border-2 border-slate-300 rounded-md">
                    <input {...register("photos")} className="inputReset w-full p-2 rounded-md" placeholder="descrição" type="file" />
            </label>
            <button className="btnSubmit bg-blue-500 text-white" type="submit">Criar</button>
        </form>
    )
}