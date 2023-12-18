import { RegisterForm } from "@/components/RegisterForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    return(
        <>
            <ToastContainer />
            <main className="body">
                <section className="section flex justify-center items-center">
                    <RegisterForm />
                </section>
            </main>
        </>
    )
}

export default Register;