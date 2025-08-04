import Logo from "../../components/logo"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import clsx from "clsx" 
import axios from "axios"

import ButtonRemove from "../../components/buttonRemove"
import { useAuthRedirect } from "../../hooks/useAuthRedirect"

type User = {
    id: string
    name: string
    created_at: string
}
export default function LoginPage() {
    useAuthRedirect(false)

    const navigate = useNavigate()

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    // Check if user is logged
    useEffect(() => {
        axios.get('http://localhost:3333/users/me', {withCredentials: true})
            .then(res => {
                if(res.data.user){
                    navigate(`/dashboard`)
                }
            }).catch(() => {})
    }, [navigate])

    // Get users 
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

    
    const [userSelect, setUserSelect] = useState<{id: string; name: string} | null>(null)
    
    const handleSelectUser = (user: {id: string; name: string}) => {
        setUserSelect(user)
    }
    
    const handleDeleteUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(!userSelect) return
        
        const response = await fetch(`http://localhost:3333/users/${userSelect.id}`, {method: 'DELETE'})

        if(response.ok) {
            setUsers(prev => prev.filter(user => user.id !== userSelect.id))
            setUserSelect(null)
        }else{
            console.error("Erro ao deletar o usuário.")
        }
    }
    
    const goToSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate('/signin')
    }
    
    const makeLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const userID = userSelect?.id
        try{
            await axios.post(`http://localhost:3333/users/login/${userID}`, {}, {
                withCredentials: true,
            })
            navigate('/dashboard')
        }catch(error){
            console.error("Não foi possivel encontrar usuario", error)
        }
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
                        onClick={() => handleSelectUser(user)}
                        className={clsx(
                            "text-zinc-900 !p-4 rounded-xl font-semibold cursor-pointer bg-[#DDDEDF] transition-transform duration-300",
                            userSelect?.id === user.id ? "scale-110" : "scale-100"
                        )}
                    >
                        <span className="text-[13px]">{user.name}</span>
                    </div>
                ))}
            </div>


            <form className="w-full flex flex-col gap-3">
                {userSelect && (
                    <div>
                        <button onClick={makeLogin}  className="w-full h-15 bg-[#333638] text-white font-semibold rounded-md">Entrar como {userSelect.name}</button>,
                    </div>
                )}
                <button onClick={goToSignIn} className="w-full h-15 bg-[#333638] text-white font-semibold rounded-md">Cadastrar Usuário</button>
            </form>

            {userSelect && (
                <ButtonRemove onClick={handleDeleteUser} textButton={`Excluir ${userSelect.name}`}/>  
            )}
        </main>
    )
}
