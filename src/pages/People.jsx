import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const People = (props) => {
    // const initialState = []
    // react state
    const [people, setPeople] = useState([])
    const [newForm, setForm] = useState({
        name: "",
        image: "",
        title: "",
    })
    // fetch endpoint
    const BASE_URL = "https://jb-people-app-demo.herokuapp.com/people"

    const getPeople = async () => {
        try {
            // fetch grabs the data from API - (mongo)
            const response = await fetch(BASE_URL)
            // assuming no errors - translate to JS
            const allPeople = await response.json()
            // store that data (from API) in react state
            // console.log(allPeople)
            setPeople(allPeople)
        }
        catch(err) {
            console.error(err)
        }
    }

    const handleChange = (event) => {
        const prevInput = {...newForm}
        // console.log(event.target.name, event.target.value)
        prevInput[event.target.name] = event.target.value
        setForm(prevInput)
    }

    const handleSubmit = async (event) => {
        // 0. prevent default (event object method)
        event.preventDefault()
        // 1. capturing our local state
        const currentState = {...newForm}
        // check form fields for property data types/truthy value
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentState)
            }
            // 2. specify request methods, content type
            // 3. make fetch to B/E - sending data (requestOptions)
            // 3a. fetch sends the data to API - (mongo)
            const response = await fetch(BASE_URL, requestOptions)
            // console.log(response)
            // 4. check our response
            // 5. parse the data from the response into JS (from JSON)
            const createdPerson = await response.json()
            // update local state with response (json from BackEnd)
            setPeople([...people, createdPerson])
            // reset form state so that our form empties out
            setForm({
                name: "",
                image: "",
                title: ""
            })
        }
        catch(err) {
            console.error(err)
        }
    }

    const loaded = () => {
        return people?.map((person) => {
            return (
                <Link  key={person._id} to={`/people/${person._id}`}>
                    <div className="person-card">
                        <h1>{person.name}</h1>
                        <img
                            src={person.image}
                            alt={person.name}
                        />
                        <h3>{person.title}</h3>
                    </div>
                </Link>
            )
        })
    }

    const loading = () => (
        <section className="people-list">
            <h1>Loading...<span>
                <img
                className="spinner"
                src="https://freesvg.org/img/1544764567.png"
                alt="loading"
                />{" "}</span>
            </h1>
        </section>
    )

    useEffect(() => {
        getPeople()
    }, [])

    return (
        <div>
            <h1>People</h1>
                    <section className="people-list">
                        <h1>Create a new person</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter person's name"
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
                                    placeholder="Person's image URL"
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
                            <input type="submit" value="Create a new person" />
                        </form>
                    </section>
            <section className="people-list">{people && people.length ? loaded() : loading()}</section>
        </div>
    )
}

export default People