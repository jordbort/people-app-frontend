import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

const Show = (props) => {
    const navigate = useNavigate()
    const placeholderImage = "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
    // local state (show)
    const [person, setPerson] = useState(null)
    const [loading, setLoading] = useState(true)
    // access information about the current url path for browser
    const {id} = useParams()
    const URL = `http://localhost:4000/people/${id}`

    const getPerson = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            // console.log(result)
            setPerson(result)
            setLoading(false)
        }
        catch(err) {
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
            // console.log(deletedPerson)
            navigate(`/`)
        }
        catch(err) {
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
                </>
                }
        </section>
    )
}

export default Show