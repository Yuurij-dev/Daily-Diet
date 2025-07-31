// import { useState } from "react";
import ButtonEdit from "../../components/buttonEdit";
import ButtonRemove from "../../components/buttonRemove";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function SnackPage() {

    const navigate = useNavigate()
    
    return (
        <section>
        <header className="!py-10 bg-[#e5f0db] w-full flex items-center justify-evenly text-center">
            <div className="absolute left-[5%]">
                <FontAwesomeIcon onClick={() => navigate('/home')} className="text-2xl" icon={faArrowLeft} />
            </div>
            <h1 className="text-center text-[24px] font-bold">refeição</h1>
        </header>

        <main className="relative container !pt-[50px] top-[-20px] rounded-t-[20px] bg-white flex flex-col gap-6">
            
            <div className="flex flex-col gap-1">
                <h1 className="text-[24px] font-bold">Sanduíche</h1>
                <span className="text-[16px]">Sanduíche de pão integral com atum e salada de alface e tomate.</span>
            </div>

            <div className="flex flex-col gap-1">
                <h1 className="text-[18px] font-bold">Data e hora</h1>
                <span className="text-[16px]">12/08/2022 ás 20:00</span>
            </div>

            <div className="!p-3 rounded-full w-full max-w-[150px] bg-[#eff0f0] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#639339]"></div>
                <span className="text-[15px]">dentro da dieta</span>
            </div>

            <div className="!mt-[350px] flex flex-col gap-3">
                <ButtonEdit textButton="Editar refeição" />
                <ButtonRemove textButton="Excluir refeição"/>
            </div>
        </main>
        </section>
    );
}
