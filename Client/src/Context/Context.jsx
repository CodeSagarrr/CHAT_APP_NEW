import { useState, createContext, useEffect, useContext } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ChatContext = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [protect, setProtect] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user)
        }
    }, [])

    const userLogin = (data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data))
    }

    const getUser = async () => {
        try {
            const res = await axios.get(`/chat`)
            setProtect(res.data);
            if (res.ok) {
                window.location.href('/')
            } 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                window.location.href='/login';
            }
        }

    }
    // logout user

const logout = () =>{
    localStorage.removeItem('user');
    setUser(null);
 
}


    return (
        <ChatContext.Provider value={{ user, userLogin, getUser ,logout }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ContextData = () => useContext(ChatContext);