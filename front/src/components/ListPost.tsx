"use client"

import { api } from "@/services/api"
import { useEffect, useState } from "react"
import { CardPost } from "./CartPost"
import { Tpost } from "@/@types/post"

export const ListPost = () => {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        const req = async () => {
            setLoading(true)
            try {
                const res = await api.get("/posts")
                setLoading(false)
                setPosts(res.data)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
        req()
    }, [])

    return(
        <ul className="grid grid-cols-1 gap-6 justify-items-center lg:grid-cols-2 xl:grid-cols-3 py-4">
            {
                loading ? 
                [1, 2, 3, 4, 5].map((el: number) => {
                    return(
                        <div key={el} className="animate-pulse w-full">
                            <div className="bg-slate-500 w-full max-w-[30rem] h-96 rounded-2xl flex flex-col gap-6">
                                <div className="bg-slate-700 rounded-t-2xl h-64 w-full"></div>
                                <div className="px-6">
                                    <div className="bg-slate-700 h-8 w-full"></div>
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                posts.map((post: Tpost) => {
                    return <CardPost key={post.id} id={post.id} coverPhoto={post.coverPhoto} title={post.title} description={post.description} photos={post.photos} comments={post.comments} likes={false} _count={post._count} authorId={post.authorId} />
                } )
            }
        </ul>
    )
}