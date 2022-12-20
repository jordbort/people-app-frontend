import { useState, useEffect } from "react"

const People = (props) => {
    // const initialState = []
    // react state
    const [people, setPeople] = useState([])
    // fetch endpoint
    const BASE_URL = "http://localhost:4000/people"

    const getPeople = async () => {
        try {
            // fetch grabs the data from API - (mongo)
            const response = await fetch(BASE_URL)
            // assuming no errors - translate to JS
            const allPeople = await response.json()
            // store that data (from API) in react state
            console.log(allPeople)
            setPeople(allPeople)
        }
        catch(err) {
            console.log(err)
        }
    }

    const loaded = () => {
        return people?.map((person) => {
            return (
                <div key={person._id}>
                    <h1>{person.name}</h1>
                    <img
                        src={person.image}
                        alt="{person.name}"
                    />
                    <h3>{person.title}</h3>
                </div>
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
            <section className="people-list">{people && people.length ? loaded() : loading()}</section>
        </div>
    )
}

export default People