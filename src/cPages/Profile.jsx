import React, { useEffect, useState } from 'react'
import { account } from '../appwrite/appwriteConfig'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
    const navgate = useNavigate()
    const [userDetails, setUserDetails] = useState()

    useEffect(() => {
        const getData = account.get()
        getData.then(
            function (response) {
                setUserDetails(response)
                console.log("profile success");
            },
            function (error) {
                console.log("Profile error");
                console.log(error);
            }
        )
    }, [])

    console.log("userDetails",userDetails);

    const handleLogout = async () => {
        try {
            await account.deleteSession("current")
            navgate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {userDetails ? (
                <div>
                    <div>Hello {userDetails.name}</div>
                    <button onClick={handleLogout} className="btn btn-primary">Log Out</button>
                </div>
            ) : (
                <div>
                    <h1>Please Login</h1>
                </div>
            )}
        </>
    )
}

export default Profile