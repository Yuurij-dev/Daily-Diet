import { useState } from "react";
import ButtonStyled from "../../components/button";

export default function NewSnack() {
  const [isOnDiet, setIsOnDiet] = useState<null | boolean>(null);

  const handleNewSnack = () => {
    console.log(isOnDiet)
  }

  return (
    <section>
      <header className="!py-10 bg-[#dddedf]">
        <h1 className="text-center text-[24px] font-bold">Nova refeição</h1>
      </header>

      <main className="relative container !pt-[50px] top-[-20px] rounded-t-[20px] bg-white flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-[16px]">Nome</span>
            <input className="w-full h-[50px] !pl-4 border border-[#dddedf] rounded-md" type="text" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-semibold text-[16px]">Descrição</span>
            <input className="w-full h-[150px] !pl-4 border border-[#dddedf] rounded-md" type="text" />
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-[16px]">Data</span>
              <input className="w-full h-[50px] !pl-4 border border-[#dddedf] rounded-md" type="text" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-semibold text-[16px]">Hora</span>
              <input className="w-full h-[50px] !pl-4 border border-[#dddedf] rounded-md" type="text" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-[16px]">Está dentro da dieta?</h3>
            <div className="flex gap-8">
              <button
                onClick={() => setIsOnDiet(true)}
                className={`w-full h-[50px] rounded-lg flex items-center justify-center gap-2 text-center border ${
                  isOnDiet === true ? "border-[#639339] bg-[#e5f7eb]" : "bg-[#eff0f0] border-transparent"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#639339]"></div>
                <span className="font-bold">Sim</span>
              </button>

              <button
                onClick={() => setIsOnDiet(false)}
                className={`w-full h-[50px] rounded-lg flex items-center justify-center gap-2 text-center border ${
                  isOnDiet === false ? "border-[#bf3b44] bg-[#f4e6e7]" : "bg-[#eff0f0] border-transparent"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#bf3b44]"></div>
                <span className="font-bold">Não</span>
              </button>
            </div>
          </div>
        </div>

        <div className="!mt-[180px]">
          <ButtonStyled onClick={handleNewSnack} textButton="Cadastrar refeição" />
        </div>
      </main>
    </section>
  );
}
