import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';


export default function LogoSmall() {
    return(
        <div className="text-center flex items-center text-4xl">
            <FontAwesomeIcon icon={faUtensils} />
            <div className='flex flex-col items-start'>
                <h1 className="font-bold text-[18px] text-[#1b1d1e]">Daily</h1>
                <h1 className="font-bold text-[18px] text-[#1b1d1e]">Diet</h1>
            </div>
        </div>
    )
}