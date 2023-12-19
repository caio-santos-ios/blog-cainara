import { ListPost } from "@/components/ListPost";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
   <main className="body">
      <ToastContainer />
      <section className="section">
        <ListPost />
      </section>
   </main>
  )
}
