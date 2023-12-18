import { Metadata } from "next";
import '@/style/styleForm.css'

export const metadata: Metadata = {
    title: "Login"
}

const LoginLayout = ({children}: {children: React.ReactNode}) => {
    return(
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}

export default LoginLayout;