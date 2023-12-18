import { Metadata } from "next";
import '@/style/styleForm.css'

export const metadata: Metadata = {
    title: "Register"
}

const RegisterLayout = ({children}: {children: React.ReactNode}) => {
    return(
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}

export default RegisterLayout;