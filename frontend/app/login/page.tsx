import { NextAuthProvider } from "@/lib/next-auth/provider";
import FormButton from "./FormButton";

const LoginPage = () => {
    return (
        <NextAuthProvider>
            <div className="w-[85%] m-auto flex flex-row-reverse flex-wrap items-center justify-between mt-10">
                <FormButton />
                <div className="md:w-[48%] w-full bg-gray-100 min-h-[600px] mt-10 md:mt-0"></div>
            </div>
        </NextAuthProvider>
    );
};

export default LoginPage;
