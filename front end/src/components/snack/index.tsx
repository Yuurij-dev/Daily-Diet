import type { HTMLAttributes } from "react"

type Snack = {
    name: string,
    time: string,
    dietStatus: string
} & HTMLAttributes<HTMLDivElement>

export default function Snack({name, time, dietStatus, ...rest } : Snack) {
    return(
        <div {...rest} className="!p-5 border border-[#dddedf] rounded-md flex justify-between">
            <div className="flex gap-3">
                <span className="text-[16px] font-bold text-[#333638]">{time}</span>
                <div className="border-l-[2px] border-[#dddedf]"></div>
                <span className="text-[#333638] text-[18px]">{name}</span>
            </div>

            <div className={`w-5 h-5 rounded-full  ${dietStatus}`}></div>
        </div>
    )
}