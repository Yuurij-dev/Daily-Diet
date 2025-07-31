import type { ButtonHTMLAttributes } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

type ButtonProps = {
    textButton: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function ButtonEdit({textButton, ...rest}: ButtonProps) {
    return(
        <button {...rest} className="w-full h-15 bg-[#333638] !text-white font-semibold rounded-md"><FontAwesomeIcon icon={faPen} className="pencil text-[15px]" /> {textButton}</button>
    )
}