import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import firebaseContext from '../context/firebase'

export default function Login() {
    const history = useHistory();
    const { firebase } = useContext(firebaseContext)

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('')

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = () => {

    }

    useEffect(() => {
        document.title = 'Login - instagram'
    }, [])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            This is Login Page !
        </div>
    )
}
