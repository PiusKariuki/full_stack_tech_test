//DO THE USERS PAGE HERE AND THE MODAL TO ADD NEW USER ALSO HERE


import {useEffect, useState} from "react";

const Users = () => {
    const [users, setUsers] = useState([])

    const getAllUsers = async() => {
        const res = await fetch("http://localhost:3001/users/1")
        console.log('res', res)
        setUsers(res.body)
    }

    useEffect(() => {
        getAllUsers()
    }, []);


    return(
        <div className="flex flex-col gap-8">
            <p>Hello</p>
        </div>
    )
}


export default Users