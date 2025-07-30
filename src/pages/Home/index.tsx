import LogoSmall from "../../components/logoSmall"
import ButtonStyled from "../../components/button"
import Snack from "../../components/snack"

import { useNavigate } from "react-router-dom"

export default function Home() {

    const navigate = useNavigate()

    const goToNewSnack = () => {
        navigate('/newSnack')
    }
    return(
        <div className="container flex flex-col gap-9">
            <LogoSmall/>

            <div className="!py-9 w-full bg-[#E5F0DB] text-center rounded-xl flex flex-col gap-2">
                <h2 className="text-[#333638] font-semibold text-4xl">90,86%</h2>
                <span className="text-[#333638] text-[16px] font-medium">das refeições dentro da dieta</span>
            </div>

            <section>
                <h3 className="!mb-3 text-[18px]">Refeições</h3>
                <ButtonStyled onClick={goToNewSnack} textButton="Nova refeição"/>
            </section>

            <section className="flex flex-col gap-10">
                <div>
                    <h1 className="font-semibold text-[#333638] text-[24px] !mb-5">12.08.22</h1>
                    <div>
                        <Snack />
                    </div>
                </div>

                <div>
                    <h1 className="font-semibold text-[#333638] text-[24px] !mb-5">11.08.22</h1>
                    <div>
                        <Snack />
                    </div>
                </div>

                <div>
                    <h1 className="font-semibold text-[#333638] text-[24px] !mb-5">10.08.22</h1>
                    <div>
                        <Snack />
                    </div>
                </div>
            </section>
        </div>
    )
}