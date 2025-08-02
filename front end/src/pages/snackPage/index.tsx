// import { useState } from "react";
import ButtonEdit from "../../components/buttonEdit";
import ButtonRemove from "../../components/buttonRemove";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";

type Meal = {
    id: string,
    user_id: string,
    name: string,
    description: string,
    date_time: number,
    is_on_diet: boolean,
    created_at: string,
}

export default function SnackPage() {
    useAuthRedirect(true)
    const {id} = useParams()

    const navigate = useNavigate()

    const [meal, setMeal] = useState<Meal | null>(null)
    
    useEffect(() => {
        async function fetchMeal() {
            try{
                const response = await axios.get(`http://localhost:3333/meals/${id}`, {withCredentials: true})

                setMeal(response.data)
            }catch(err){
                console.error('Erro ao buscar refeição',err)
            }
        }
        if(id){
            fetchMeal()
        }
    }, [id])

    if (!meal) {
        return <p>Carregando...</p>;
    }

    const date = new Date(meal.date_time)
    const timeFormated = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    const dateOnly = new Date(meal.created_at).toLocaleDateString('pt-BR')

    const handleRemove = async () => {

        try{
            await axios.delete(`http://localhost:3333/meals/${id}`, {withCredentials: true})
            navigate('/dashboard')
        }catch(err){
            console.error("Erro ao remover usuario", err)
        }
    }

    const goToEditMeal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        navigate(`/meal/edit/${id}`)
    }
    return (
        <section>
        <header className={`!py-10 w-full flex items-center justify-evenly text-center ${meal.is_on_diet ? 'bg-[#cbe4b4]' : 'bg-[#f3babd]'} `}>
            <div className="absolute left-[5%]">
                <FontAwesomeIcon onClick={() => navigate('/dashboard')} className="text-2xl" icon={faArrowLeft} />
            </div>
            <h1 className="text-center text-[24px] font-bold">refeição</h1>
        </header>

        <main className="relative container !pt-[50px] top-[-20px] rounded-t-[20px] bg-white flex flex-col gap-6">
            
        
            <div className="flex flex-col gap-1">
                <h1 className="text-[24px] font-bold">{meal?.name}</h1>
                <span className="text-[16px]">{meal?.description}</span>
            </div>

            <div className="flex flex-col gap-1">
                <h1 className="text-[18px] font-bold">Data e hora</h1>
                <span className="text-[16px]">{timeFormated} {dateOnly}</span>
            </div>

            <div className="!p-3 rounded-full w-full max-w-[150px] bg-[#eff0f0] flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${meal.is_on_diet ? 'bg-[#639339]' : 'bg-[#bf3b44]'}`}></div>
                <span className="text-[15px]">{meal.is_on_diet ? 'dentro da dieta' : 'fora da dieta'}</span>
            </div>

            <div className="!mt-[350px] flex flex-col gap-3">
                <ButtonEdit onClick={goToEditMeal} textButton="Editar refeição" />
                <ButtonRemove onClick={handleRemove} textButton="Excluir refeição"/>
            </div>
        </main>
        </section>
    );
}
