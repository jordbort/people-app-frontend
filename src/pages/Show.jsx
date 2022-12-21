import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const Show = (props) => {
    const navigate = useNavigate()
    const placeholderImage = "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
    // local state (show)
    const [person, setPerson] = useState(null)
    const [loading, setLoading] = useState(true)
    // access information about the current url path for browser
    const { id } = useParams()
    // fetch endpoint
    const URL = `https://jb-people-app-demo.herokuapp.com/people/${id}`



    // const [people, setPeople] = useState([])
    const [newForm, setForm] = useState({
        name: "",
        image: "",
        title: "",
    })


    const handleChange = (event) => {
        const prevInput = { ...newForm }
        // console.log(event.target.name, event.target.value)
        prevInput[event.target.name] = event.target.value
        setForm(prevInput)
    }

    // fetch endpoint
    const handleEdit = async (event) => {
        event.preventDefault()
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newForm)
            }
            await fetch(URL, requestOptions)
            getPerson()
            setForm({
                name: "",
                image: "",
                title: ""
            })
        }
        catch (err) {
            console.error(err)
        }
    }


    const getPerson = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            console.log(`Get person:`, result)
            setPerson(result)
            setLoading(false)
        }
        catch (err) {
            console.error(err)
        }
    }

    const removePerson = async (event) => {
        try {
            // configure our delete request
            const options = {
                method: "DELETE"
            }
            // make a fetch (delete)
            const response = await fetch(URL, options)
            const deletedPerson = await response.json()
            console.log(deletedPerson)
            navigate(`/`)
        }
        catch (err) {
            console.error(err)
            // stretch goal - print the error message on the page for the user
        }
    }

    // make a fetch
    useEffect(() => {
        getPerson()
    }, [])
    // console.log(`current person: ${person?.name || "no person"}`)

    return (
        <section>
            {loading ? <h1>Loading...</h1> :
                <>
                    <button className="delete" onClick={removePerson}>Delete person</button>
                    <h1>Name: {person.name} - {person.title}</h1>
                    <img src={person.image || placeholderImage} alt="pls stop" />
                    <section className="people-list">
                        <h1>Edit {person.name}</h1>
                        <form onSubmit={handleEdit}>
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter name"
                                    value={newForm.name}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <br />
                            <label htmlFor="image">
                                Image
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    placeholder="Enter image URL"
                                    value={newForm.image}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label htmlFor="title">
                                Title
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter person's title"
                                    value={newForm.title}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <button className="edit" type="submit" onClick={handleEdit}>Edit person</button>
                        </form>
                    </section>
                </>
            }
        </section>
    )
}

export default Show