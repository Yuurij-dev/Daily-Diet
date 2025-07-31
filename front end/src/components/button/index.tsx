import type { ButtonHTMLAttributes } from "react"

type ButtonProps = {
    textButton: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function ButtonStyled({textButton, ...rest}: ButtonProps) {
    return(
        <button {...rest} className="w-full h-15 bg-[#333638] !text-white font-semibold rounded-md">{textButton}</button>
    )
}