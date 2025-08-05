import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export function useAuthRedirect(shouldBeLoggedIn: boolean){
    const apiUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        axios
            .get(`${apiUrl}/users/me`, { withCredentials: true })
            .then((res) => {
                const isLogged = !!res.data.user

                if(shouldBeLoggedIn && !isLogged){
                    navigate('/login')
                }else if(!shouldBeLoggedIn && isLogged){
                    navigate('/home')
                }
            })
            .catch(() => {
                if(shouldBeLoggedIn){
                    navigate('/login')
                }
            })
    }, [navigate, shouldBeLoggedIn, apiUrl, location.pathname])
}