import Logo from "../../components/logo"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import clsx from "clsx" // se quiser, pode instalar o pacote `clsx` para facilitar

export default function LoginPage() {
    const navigate = useNavigate()

    const goToSignIn = () => {
        navigate('/signin')
    }

    const [userSelect, setUserSelect] = useState('')

    const handleSelectUser = (e: React.MouseEvent<HTMLDivElement>) => {
        const getSpan = e.currentTarget.querySelector('span')
        const userName = getSpan?.textContent ?? ''
        setUserSelect(userName)
    }

    const users = ['Yuri', 'Luana', 'Wallace', 'Ludmila']

    return (
        <main className="container w-full h-screen flex items-center justify-center flex-col gap-10">
            <Logo />

            <div className="flex flex-wrap gap-5 justify-center">
                {users.map((user) => (
                    <div
                        key={user}
                        onClick={handleSelectUser}
                        className={clsx(
                            "text-zinc-900 !p-4 rounded-xl font-semibold cursor-pointer bg-[#DDDEDF] transition-transform duration-300",
                            userSelect === user ? "scale-110" : "scale-100"
                        )}
                    >
                        <span className="text-[13px]">{user}</span>
                    </div>
                ))}
            </div>

            <button onClick={goToSignIn} className="w-full h-15 bg-[#333638] text-white font-semibold rounded-md">
                Cadastrar Usuário
            </button>
        </main>
    )
}
