import womanImage from '../../assets/woman.png'
import DietButton from '../../components/dietButton'

import { useNavigate } from 'react-router-dom'

export default function OnDietPage() {

    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/home')
    }
    return(
        <section className='container w-full h-screen flex flex-col gap-8 items-center justify-center'>
            <div className=' text-center flex flex-col gap-2'>
                <h1 className='!text-[#639339] text-3xl font-bold'>Continue assim!</h1>
                <p className='text-[16px]'>Você continua <span className='font-bold'>dentro da dieta.</span> Muito bem!</p>
            </div>

            <div>
                <img src={womanImage} alt="Woman Image" />
            </div>

            <DietButton onClick={goToHome} className='max-w-[200px]' textButton='Ir para a página inicial'/>
        </section>
    )
}