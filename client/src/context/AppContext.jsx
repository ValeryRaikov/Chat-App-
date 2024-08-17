import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/config/firebase";

export const AppContext = createContext(null);

const AppContextProvider = ({children}) => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState(null);

    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();

            setUserData(userData);

            if (userData.avatar && userData.name) {
                navigate('/chat');
            } else {
                navigate('/profile');
            }
        } catch (error) {
            
        }
    }

    const contextValue = {
        userData,
        setUserData, 
        chatData,
        setChatData,
        loadUserData,
    };

    return (
        <AppContext.Provider value={contextValue} >
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;