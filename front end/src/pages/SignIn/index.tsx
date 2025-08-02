import Logo from "../../components/logo"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthRedirect } from "../../hooks/useAuthRedirect"

export default function SignInPage() {
    useAuthRedirect(false)
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(name != ''){
            try{
                const response = await axios.post('http://localhost:3333/users',{
                    name: name
                })
                navigate('/login')
                console.log("Usuario criado:", response.data)
                setError('')
            }catch (error) {
                console.error("Erro ao criar usuario", error)
                setError("Erro ao criar usuario")
            }
        }else{
            setError('preencha todos os campos')
        }
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    return(
        <main className="container w-full h-screen flex items-center justify-center flex-col gap-8">
            <Logo/>
        {error && (
          <div className="w-full h-[50px] flex items-center justify-center bg-[#f4e6e7] border border-[#bf3b44] rounded-lg">
            <span className="text-[#bf3b44] font-bold">{error}</span>
          </div>
        )}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <div className="flex flex-col">
                    <span className="font-semibold">Nome de Usuário</span>
                    <input onChange={handleName} className="w-full !p-2 border border-[#dddedf] rounded-md" type="text" />
                </div>

                <div className="flex flex-col gap-2">
                    <button type="submit" className="w-full h-15 bg-[#333638] text-white font-semibold rounded-md">Criar Usuário</button>
                    <span className="font-semibold">Já Possui Cadrasto? <a href="/login" className="text-blue-400 font-semibold">Entre agora</a></span>
                </div>
            </form>
        </main>
    )
}