// import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

export default function StatsUser() {

    const [dietStats] = useState(30)

    const navigate = useNavigate()

    return(
        <section>
            <header className={`!py-10 w-full flex items-center justify-evenly text-center ${
                dietStats > 49 ? "bg-[#E5F0DB]" : "bg-[#f4e6e7]"
            }`}>
                <div className="absolute left-[5%] top-[5%]">
                    <FontAwesomeIcon onClick={() => navigate('/home')} className="text-2xl" icon={faArrowLeft} />
                </div>
                <div className="!py-9 w-full text-center rounded-xl flex flex-col gap-2">
                    <h2 className="text-[#333638] font-semibold text-4xl">{dietStats}%</h2>
                    <span className="text-[#333638] text-[16px] font-medium">das refeições dentro da dieta</span>
                </div>
            </header>

            <main className="relative container !pt-[50px] top-[-30px] rounded-t-[20px] bg-white flex flex-col gap-6">
                <h1 className="font-bold text-[18px] text-center">Estatísticas gerais</h1>
            
                <div className="flex flex-col gap-4">
                    <div className="bg-[#eff0f0] text-center !p-5 rounded-lg">
                        <span className="font-bold text-3xl">22</span>
                        <p className="text-[16px]">melhor sequência de pratos dentro da dieta</p>
                    </div>

                    <div className="bg-[#eff0f0] text-center !p-5 rounded-lg">
                        <span className="font-bold text-3xl">109</span>
                        <p className="text-[16px]">refeições registradas</p>
                    </div>

                    <div className="flex gap-5">
                        <div className="w-full text-center !p-5 bg-[#e5f0db] rounded-lg">
                            <span className="text-3xl font-bold">99</span>
                            <p>refeições dentro da dieta</p>
                        </div>

                        <div className="w-full text-center !p-5 bg-[#f4e6e7] rounded-lg">
                            <span className="text-3xl font-bold">10</span>
                            <p>refeições fora da dieta</p>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}