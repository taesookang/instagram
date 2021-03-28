import React from 'react'
import useUser from '../hooks/useUser'

export default function Sidebar() {
    const { user: { fullName, username, userId} } = useUser()

    console.log(fullName, username, userId)
    return (
        <div>
            I am sidebar.
        </div>
    )
}
