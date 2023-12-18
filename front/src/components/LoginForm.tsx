"use client"

import Link from "next/link";
import { useForm } from "react-hook-form";

type Login = {
    email: string;
    password: string;
}


export const LoginForm = () => {
    const { register, handleSubmit, reset } = useForm<Login>()

    const login = (data: Login) => {
        console.log(data)
    }

    return(
        <div className="flex flex-col gap-4 items-center rounded-md bg-slate-200 p-2">
            <h1 className="font-normal text-3xl">Login</h1>
            <form className="formReset" method="post" onSubmit={handleSubmit(login)}>
                <label htmlFor="email" className="labelReset border-2 border-slate-300 rounded-md">
                    <input required {...register("email")} className="inputReset w-full p-2" placeholder="Seu e-mail" type="text" name="email" id="email" />
                </label>
                <label htmlFor="password" className="labelReset border-2 border-slate-300 rounded-md">
                    <input required {...register("password")} className="inputReset w-full p-2" placeholder="Sua Senha" type="password" name="password" id="password" />
                </label>
                <button className="p-4 border-2 border-slate-300 bg-blue-400 text-white font-normal text-base rounded-md">Entrar</button>
            </form>
            <p>Ainda não tem uma conta? <Link className="text-blue-500" href="/register">Cadastrar-se</Link></p>
        </div>
    )
}