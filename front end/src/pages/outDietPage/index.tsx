import manImage from '../../assets/man.png'
import DietButton from '../../components/dietButton'

import { useNavigate } from 'react-router-dom'
import { useAuthRedirect } from '../../hooks/useAuthRedirect'

export default function OutDietPage() {
    useAuthRedirect(true)
    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/dashboard')
    }

    return(
        <section className='container w-full h-screen flex flex-col gap-8 items-center justify-center'>
            <div className=' text-center flex flex-col gap-2'>
                <h1 className='!text-[#bf3b44] text-3xl font-bold'>Que pena!</h1>
                <p className='text-[16px]'>Você <span className='font-bold'>saiu da dieta</span> dessa vez, mas continue se esforçando e não desista!</p>
            </div>

            <div>
                <img src={manImage} alt="Woman Image" />
            </div>

            <DietButton onClick={goToHome} className='max-w-[200px]' textButton='Ir para a página inicial'/>
        </section>
    )
}