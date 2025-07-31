import Logo from "../../components/logo"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import clsx from "clsx" 
import axios from "axios"

type User = {
    id: string
    name: string
    created_at: string
}
export default function LoginPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUsers() {
            try{
                const response = await axios.get('http://localhost:3333/users')
                setUsers(response.data)
            } catch(error) {
                console.error("Erro ao buscar usuários", error)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

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


    return (
        <main className="container w-full h-screen flex items-center justify-center flex-col gap-10">
            <Logo />
            {loading && (
                <p>Carregando...</p>
            )

            }
            <div className="flex flex-wrap gap-5 justify-center">
                {users.map((user) => (
                    <div
                        key={user.id}
                        onClick={handleSelectUser}
                        className={clsx(
                            "text-zinc-900 !p-4 rounded-xl font-semibold cursor-pointer bg-[#DDDEDF] transition-transform duration-300",
                            userSelect === user.name ? "scale-110" : "scale-100"
                        )}
                    >
                        <span className="text-[13px]">{user.name}</span>
                    </div>
                ))}
            </div>

            <button onClick={goToSignIn} className="w-full h-15 bg-[#333638] text-white font-semibold rounded-md">
                Cadastrar Usuário
            </button>
        </main>
    )
}
