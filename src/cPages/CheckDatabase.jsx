import React, { useEffect, useState } from 'react'
import { databases } from '../appwrite/appwriteConfig'
import { v4 as uuidv4 } from 'uuid'
import conf from '../appwrite/conf'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'

const CheckDatabase = () => {

    const { appwriteDbId, appwriteDbClctId } = conf;

    const [todo, setTodo] = useState("")
    const [allTodos, setAllTodos] = useState('')
    const userData = useSelector(state => state.user)
    const allData = useSelector(state => state.allData)
    const allCategories = (Object.keys(allData).length > 1) && allData.products.map(val => [val.category, val.images[0], val.id]).filter((val, ind) => ind % 5 === 0)
    const sqData1 = allCategories.length > 1 && allData.products.filter((val) => val.id >= 89 && val.id < 93) //H1=(89,90,91,92)

    const handleSubmit = (e) => {
        e.preventDefault()

        const user_Items = { User_ID: userData.$id, user_Items: JSON.stringify(sqData1), User_Name: userData.name }
        // const user_Items = { User_ID: userData.$id, user_Items: todo, User_Name: userData.name }
        console.log(userData.$id, "is in obj");

        const promise = databases.createDocument(appwriteDbId, appwriteDbClctId, uuidv4(), user_Items)

        promise.then(
            function (response) {
                console.log(response);
            },
            function (error) {
                console.log(error);
            }
        )

        setTodo("")
    }

    useEffect(() => {
        const getTodos = databases.listDocuments(appwriteDbId, appwriteDbClctId, [
            Query.equal('User_ID', userData.$id) // Adjust the field name as per your collection
        ]);
        console.log(getTodos);

        getTodos.then(
            function (response) {
                const parsedTodos = response.documents.map(val => ({ ...val, user_Items: JSON.parse(val.user_Items) }));
                const userData = parsedTodos.map((val) => val.user_Items).flat()
                setAllTodos(userData)
                console.log(userData, "parsedTodos");
            },
            function (error) {
                console.log("Cant Load All Todos", error);
            }
        )
    }, [setAllTodos])


    sqData1 && console.log(sqData1, "is sqData1");

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <form action="" onSubmit={handleSubmit}>
                <h1>Enter Your Data</h1>
                <input type="text" placeholder='Enter Todo' value={todo} onChange={(e) => setTodo(e.target.value)} />
                <button type='submit' className="btn btn-primary">Submit</button>
            </form>

            <div className='my-3'>
                All Todos
                {allTodos.length > 0 ? allTodos.map((val) => {
                    return <div key={val.id}>
                        <h3>{val.title}</h3>
                    </div>
                }) : <h2>Empty</h2>}
            </div>
        </div>
    )
}

export default CheckDatabase