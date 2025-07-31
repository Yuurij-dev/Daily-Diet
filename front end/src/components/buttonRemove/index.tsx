import type { ButtonHTMLAttributes } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type ButtonProps = {
    textButton: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function ButtonRemove({textButton, ...rest}: ButtonProps) {
    return(
        <button {...rest} className="w-full h-15 border border-[#333638] text-[#333638] font-semibold rounded-md"><FontAwesomeIcon icon={faTrash} className="text-lg" /> {textButton}</button>
    )
}