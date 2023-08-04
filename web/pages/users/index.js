//DO THE USERS PAGE HERE AND THE MODAL TO ADD NEW USER ALSO HERE


import {useEffect, useState} from "react";

const Users = () => {
    const [users, setUsers] = useState([])

    const getAllUsers = () => {
        fetch("http://localhost:3001/users")
            .then(res => res.json())
            .then(data => {
                console.log('data', data)
                setUsers(data)
            })

    }

    useEffect(() => {
        getAllUsers()
    }, []);


    return (
        <div className="flex flex-col gap-8 p-10">
            <p>Users</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users?.map(item => (
                    <div
                        key={item?.id}
                        className="flex flex-col shadow-lg p-4 rounded-lg">
                        <img src={item?.avatar} alt="" className="rounded-full w-20 h-20 object-center object-cover"/>
                        <p className="text-xl font-semibold capitalize">{item.name}</p>
                        <p className="">{item.email}</p>
                    </div>
                ))}
            </div>


        </div>
    )
}


export default Users