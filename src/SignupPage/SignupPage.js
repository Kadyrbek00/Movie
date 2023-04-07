import React, { useEffect, useRef, useState } from "react";
import "./SignupPage.css"
import { auth } from "../firebase";
import requests from "../Requests/Requests";

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [genre, setGenre] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [nameError, setNameError] = useState("Required")
    const [emailError, setEmailError] = useState("Required");
    const [passwordError, setPasswordError] = useState("Required");
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (emailError || passwordError || nameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, nameError])


    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const emailHandler = (e) => {
        setEmail(e.target.value)

        const regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if (!regexp.test(String(e.target.value).toLocaleLowerCase())) {
            setEmailError("Write the right email as abc@gmail.com")
            if (!e.target.value) {
                setEmailError("Required")
            }
        } else {
            setEmailError("")
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value)

        if (!e.target.value) {
            setNameError("Required")
        } else {
            setNameError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)

        if (e.target.value.length < 5 || e.target.value.length > 12) {
            setPasswordError("Password must be between 5 and 12 character")
            if (!e.target.value) {
                setPasswordError("Required")
            }
        } else {
            setPasswordError("")
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setNameDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
        }
    }

    const register = (e) => {
        e.preventDefault()

        auth
            .createUserWithEmailAndPassword(
                emailRef.current.value,
                passwordRef.current.value
            )
            .then((authUser) => {
                console.log(authUser);
            })
            .catch((error) => alert(error.message))
    }


    return (
        <div className="SignupPage">

            <h1>Sign Up</h1>
            <form>
                <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => nameHandler(e)}
                    onBlur={(e) => blurHandler(e)}
                    placeholder="Your name" />
                {(nameDirty && nameError) && <p style={{ color: "red", textAlign: "left", marginTop: "-13px", marginBottom: "13px" }}>{nameError}</p>}

                <input
                    ref={emailRef}
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => emailHandler(e)}
                    onBlur={(e) => blurHandler(e)}
                    placeholder="Email address" />
                {(emailDirty && emailError) && <p style={{ color: "red", textAlign: "left", marginTop: "-13px", marginBottom: "13px" }}>{emailError}</p>}

                <input
                    ref={passwordRef}
                    name="password"
                    onBlur={(e) => blurHandler(e)}
                    type="password"
                    value={password}
                    onChange={(e) => passwordHandler(e)}
                    placeholder="Password"
                />
                {(passwordDirty && passwordError) && <p style={{ color: "red", textAlign: "left", marginTop: "-13px", marginBottom: "13px" }}>{passwordError}</p>}

                <select>
                    <option value="">-- Сhoose your gender --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="another">Another</option>
                </select>

                <select name="genre" value={genre} onChange={e => setGenre(e.target.value)} >
                    <option value="">-- Select a genre --</option>
                    <option value={requests.fetchTrending}>Trending Now</option>
                    <option value={requests.fetchTopRated}>Top Rated</option>
                    <option value={requests.fetchActionMovies}>Action Movies</option>
                    <option value={requests.fetchComedyMovies}>Comedy Movies</option>
                    <option value={requests.fetchHorrorMovies}>Horror Movies</option>
                    <option value={requests.fetchRomanceMovies}>Romance Movies</option>
                    <option value={requests.fetchDocumentaries}>Documentaries</option>
                </select>

                <input
                    name="blur"
                    type="number"
                    placeholder="Your age" />

                <button disabled={!formValid} onClick={register} type="submit">Registration</button>
            </form>
        </div >

    )
}