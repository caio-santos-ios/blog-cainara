"use client"

import { api } from "@/services/api";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Register = {
    name: string;
    email: string;
    password: string;
}


export const RegisterForm = () => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm<Register>()

    const registion = async (data: Register) => {
        setLoading(true)
        console.log(data)
        try {
            const res = await api.post("/accounts", data)
            setLoading(false)
            console.log(res.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return(
        <div className="flex flex-col gap-4 items-center rounded-md bg-slate-200 px-2 py-4">
            <h1 className="font-normal text-3xl">Cadastro</h1>
            <form className="formReset" method="post" onSubmit={handleSubmit(registion)}>
            <label htmlFor="name" className="labelReset border-2 border-slate-300 rounded-md">
                    <input required {...register("name")} className="inputReset w-full p-2 rounded-md" placeholder="Seu nome" type="text" name="name" id="name" />
                </label>
                <label htmlFor="email" className="labelReset border-2 border-slate-300 rounded-md">
                    <input required {...register("email")} className="inputReset w-full p-2 rounded-md" placeholder="Seu e-mail" type="email" name="email" id="email" />
                </label>
                <label htmlFor="password" className="labelReset border-2 border-slate-300 rounded-md">
                    <input required {...register("password")} className="inputReset w-full p-2 rounded-md" placeholder="Sua Senha" type="password" name="password" id="password" />
                </label>
                <button disabled={ loading ? true : false } className="p-4 border-2 border-slate-300 bg-blue-400 text-white font-normal text-base rounded-md">{ loading ? "Cadastrando..." : "Cadastrar" }</button>
            </form> 
            <div className="border-t-2 border-slate-300">
                <p className="text-center">Ou</p>
                <p>Ainda não tem uma conta? <Link className="text-blue-500" href="/register">Cadastrar-se</Link></p>
            </div>
        </div>
    )
}