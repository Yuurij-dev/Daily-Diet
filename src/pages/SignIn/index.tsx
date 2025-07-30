import Logo from "../../components/logo"

export default function SignInPage() {
    return(
        <main className="container w-full h-screen flex items-center justify-center flex-col gap-8">
            <Logo/>

            <form className="w-full flex flex-col gap-4">
                <div className="flex flex-col">
                    <span className="font-semibold">Nome de Usuário</span>
                    <input className="w-full !p-2 border border-[#dddedf] rounded-md" type="text" />
                </div>

                <div className="flex flex-col gap-2">
                    <button className="w-full h-15 bg-[#333638] text-white font-semibold rounded-md">Criar Usuário</button>
                    <span className="font-semibold">Já Possui Cadrasto? <a href="/login" className="text-blue-400 font-semibold">Entre agora</a></span>
                </div>
            </form>
        </main>
    )
}