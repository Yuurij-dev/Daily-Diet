

export default function Snack() {
    return(
        <div className="!p-5 border border-[#dddedf] rounded-md flex justify-between">
            <div className="flex gap-3">
                <span className="text-[16px] font-bold text-[#333638]">20:00</span>
                <div className="border-l-[2px] border-[#dddedf]"></div>
                <span className="text-[#333638] text-[18px]">X-Tudo</span>
            </div>

            <div className="w-5 h-5 rounded-full bg-[#cbe4b4]"></div>
        </div>
    )
}