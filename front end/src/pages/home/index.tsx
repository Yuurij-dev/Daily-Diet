import LogoSmall from "../../components/logoSmall"
import ButtonStyled from "../../components/button"
import Snack from "../../components/snack"

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAuthRedirect } from "../../hooks/useAuthRedirect"

type Meal = {
    id: string,
    user_id: string,
    name: string,
    description: string,
    date_time: number,
    is_on_diet: boolean,
    created_at: string,
}
type User = {
    id: string,
    name: string,
    created_at: string
}

export default function Home() {
    useAuthRedirect(true)
    const navigate = useNavigate()

    // Check if user is logged
    useEffect(() => {
        axios.get('http://localhost:3333/users/me', {withCredentials: true})
            .then(res => {
                if(!res.data.user){
                    navigate(`/login`)
                }
            }).catch(() => {})
    }, [navigate])

    const [user, setuser] = useState<User | null>(null)

    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get('http://localhost:3333/users/me', {withCredentials: true})

            setuser(response.data.user)
        }
        fetchUser()
    }, [user])

    const [meals, setMeals] = useState<Meal[]>([])
    const [percentage, setPersenteg] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchMeals(){
            try{
                const response = await axios.get('http://localhost:3333/meals', {withCredentials: true})
                setMeals(response.data)

                const totalMeals = response.data.length
                const mealsOnDiet = response.data.filter((meal: Meal) => meal.is_on_diet).length

                const result = totalMeals > 0 ? (mealsOnDiet / totalMeals) * 100 : 0
                setPersenteg(result)

            }catch(err){
                console.error("Erro ao buscar refeições", err)
            }finally{
                setLoading(false)
            }
        }
        fetchMeals()
    }, [])

    const groupedMeals = meals.reduce((acc, meal) => {
        const date = new Date(meal.date_time)
        const formatedDate = date.toLocaleDateString('pt-BR')

        if(!acc[formatedDate]){
            acc[formatedDate] = []
        }

        acc[formatedDate].push(meal)
        return acc
    }, {} as Record<string, typeof meals>)

    const goToNewSnack = () => {
        navigate('/newSnack')
    }

    const handleSnack = (meal: Meal) => {
        navigate(`/meal/${meal.id}`)
    }

    const logOutUser = async () => {
        await axios.post('http://localhost:3333/users/logout', {}, {
            withCredentials: true
        }) 
        navigate('/login')
    }

    if(!user){
        return <p>Carregando...</p>
    }
    return(
        <div className="container flex flex-col gap-9">
            <header className="flex justify-between ">
                <LogoSmall/>

                <div className="flex gap-3 items-center justify-between">
                    <h3 className="font-bold">{user.name}</h3>
                    <button onClick={logOutUser} className=" h-10 !p-3 bg-[#333638] !text-white font-semibold rounded-md">Trocar de usuario</button>
                </div>
                
            </header>
            <div onClick={() => navigate('/stats')} className={`!py-9 w-full bg-[#E5F0DB] text-center rounded-xl flex flex-col gap-2 ${
                percentage > 49 && percentage !== 0 ? "bg-[#E5F0DB]" : "bg-[#f4e6e7]"
            }`}>
                <h2 className="text-[#333638] font-semibold text-4xl">{percentage.toFixed(2).replace('.', ',')}%</h2>
                <span className="text-[#333638] text-[16px] font-medium">das refeições dentro da dieta</span>
            </div>

            <section>
                <h3 className="!mb-3 text-[18px]">Refeições</h3>
                <ButtonStyled onClick={goToNewSnack} textButton="Nova refeição"/>
            </section>

                {loading && (
                    <p>Carregando...</p>
                )

                }
            <section className="flex flex-col gap-10">



                {Object.entries(groupedMeals).map(([date, mealsInDate]) => (
                    <div key={date}>
                        <h1 className="font-bold text-[#333638] text-[24px] !mb-5">{date}</h1>
                        <div className="flex flex-col gap-4">
                            {mealsInDate.map((meal) => {
                            const time = new Date(meal.date_time).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            });

                            return (
                                <Snack
                                key={meal.id}
                                onClick={() => handleSnack(meal)}
                                name={meal.name}
                                time={time}
                                dietStatus={meal.is_on_diet ? 'bg-[#cbe4b4]' : 'bg-[#f3babd]'}
                                />
                            );
                            })}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}