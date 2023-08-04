//DO THE USERS PAGE HERE AND THE MODAL TO ADD NEW USER ALSO HERE


import {useEffect, useState} from "react";

const Users = () => {
    const [users, setUsers] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        avatar: ""
    })

    const getAllUsers = () => {
        fetch("http://localhost:3001/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })

    }

    useEffect(() => {
        getAllUsers()
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": formState.name,
                "email": formState.email ,
                "avatar": formState.avatar ,
            })
        };

        fetch('http://localhost:3001/users', options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }


    return (
        <div className="flex flex-col gap-8 p-10 relative">
            <div className="flex items-center w-full justify-between">
                <p>Users</p>
                <button
                    onClick={() => setOpenModal(prev => !prev)}
                    className="bg-blue-500 px-4 py-1 rounded-lg text-white">New User
                </button>
            </div>


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

            {/*    Modal*/}
            {
                openModal && (
                    <form
                        onSubmit={handleSubmit}
                        className="fixed z-10 w-full bg-white/90 inset-0 flex flex-col items-center py-10 px-4 gap-8">
                        <p className="text-lg underline font-semibold text-blue-500">New User Details</p>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="name">Name</label>
                            <input  required={true} id="name" type="text" value={formState.name}
                                   onChange={evt => setFormState(prev => ({...prev, name: evt.target.value}))}/>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label required={true} htmlFor="email">Email</label>
                            <input id="email" type="email" value={formState.email}
                                   onChange={evt => setFormState(prev => ({...prev, email: evt.target.value}))}/>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label required={true} htmlFor="avatar">Avatar url</label>
                            <input id="avatar" type="text" value={formState.avatar}
                                   onChange={evt => setFormState(prev => ({...prev, avatar: evt.target.value}))}/>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 px-4 py-1 rounded-lg text-white">New User
                        </button>


                    </form>
                )
            }


        </div>
    )
}


export default Users