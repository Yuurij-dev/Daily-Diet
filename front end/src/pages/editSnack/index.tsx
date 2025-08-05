import { useState } from "react";
import ButtonStyled from "../../components/button";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useParams } from "react-router-dom";

export default function EditSnack() {
  useAuthRedirect(true)
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date_time: '',
    is_on_diet: null as boolean | null,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDietSelect = (value: boolean) => {
    setFormData(prev => ({
      ...prev,
      is_on_diet: value,
    }));
  };

  const handleEditMeal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { name, description, date_time, is_on_diet } = formData;

    if (!name || !description || !date_time || is_on_diet === null) {
      setError("Preencha todos os campos");
      console.log(formData)

      return;
    }

    try{
        axios.put(`http://localhost:3333/meals/${id}`,{
        name: name,
        description: description,
        date_time: date_time,
        is_on_diet: is_on_diet
      }, {withCredentials: true})
      setError('')
      navigate('/dashboard')
    }catch(err){
      console.error('Erro ao criar cadrasto', err)
      setError('Erro ao criar refeição');
    }
  } 
  

  return (
    <section>
      <header className="!py-10 bg-[#dddedf] w-full flex items-center justify-evenly text-center">
        <div className="absolute left-[5%]">
            <FontAwesomeIcon onClick={() => navigate('/dashboard')} className="text-2xl" icon={faArrowLeft} />
        </div>
        <h1 className="text-center text-[24px] font-bold">Editar refeição</h1>
      </header>

      <main className="relative container !pt-[50px] top-[-20px] rounded-t-[20px] bg-white flex flex-col gap-6">
        
        {error && (
          <div className="w-full h-[50px] flex items-center justify-center bg-[#f4e6e7] border border-[#bf3b44] rounded-lg">
            <span className="text-[#bf3b44] font-bold">{error}</span>
          </div>
        )}

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-[16px]">Nome</span>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-[50px] !pl-4 border border-[#dddedf] rounded-md"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-semibold text-[16px]">Descrição</span>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full h-[150px] !p-4 border border-[#dddedf] rounded-md resize-none"
                />
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-[16px]">Data</span>
              <input
                name="date_time"
                value={formData.date_time}
                onChange={handleChange}
                className="w-full h-[50px] !pl-4 border border-[#dddedf] rounded-md"
                type="datetime-local"
              />
            </div>

            {/* <div className="flex flex-col gap-2">
              <span className="font-semibold text-[16px]">Hora</span>
              <input
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full h-[50px] !pl-4 border border-[#dddedf] rounded-md"
                type="text"
              />
            </div> */}
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-[16px]">Está dentro da dieta?</h3>
            <div className="flex gap-8">
              <button
                onClick={() => handleDietSelect(true)}
                className={`w-full h-[50px] rounded-lg flex items-center justify-center gap-2 text-center border ${
                  formData.is_on_diet === true
                    ? "border-[#639339] bg-[#e5f7eb]"
                    : "bg-[#eff0f0] border-transparent"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#639339]"></div>
                <span className="font-bold">Sim</span>
              </button>

              <button
                onClick={() => handleDietSelect(false)}
                className={`w-full h-[50px] rounded-lg flex items-center justify-center gap-2 text-center border ${
                  formData.is_on_diet === false
                    ? "border-[#bf3b44] bg-[#f4e6e7]"
                    : "bg-[#eff0f0] border-transparent"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#bf3b44]"></div>
                <span className="font-bold">Não</span>
              </button>
            </div>
          </div>
        </div>

        <div className="!mt-[50px]">
          <ButtonStyled onClick={handleEditMeal} textButton="Salvar Alterações" />
        </div>
      </main>
    </section>
  );
}
