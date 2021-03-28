import React, { useState, useEffect, useContext } from 'react'
import userContext from '../context/user'
import { getUserByUserID } from '../services/firebase'


export default function useUser() {
    const [activeUser, setActiveUser] = useState({})
    const { user } = useContext(userContext)

    useEffect(() => {
        const getUserObjByUserID = async () => {
            const [response] = await getUserByUserID(user.uid)
            setActiveUser(response)
        }

        if (user?.uid) {
            getUserObjByUserID();
        }
    },[user])
    
    return { user: activeUser }
}
