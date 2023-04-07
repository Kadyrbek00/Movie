import React, { useEffect, useRef, useState } from "react";
import "./SigninPage.css"
import { auth } from "../firebase";
import SignupPage from "../SignupPage/SignupPage";


export default function SigninPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [passwordError, setPasswordError] = useState("Required");
    const [emailError, setEmailError] = useState("Required");
    const [signup, setSignup] = useState(false)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])


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
            case 'email':
                setEmailDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
        }
    }

    const signIn = (e) => {
        e.preventDefault()

        auth
            .signInWithEmailAndPassword(
                emailRef.current.value,
                passwordRef.current.value
            )
            .then((authUser) => {
                console.log(authUser);
            })
            .catch((error) => alert(error.message))
    }

    return (
        <>
            {signup ? (
                <SignupPage />
            ) : (
                <div className="SigninPage">
                    <form>
                        <h1>Sign In</h1>
                        <input
                            name="email"
                            ref={emailRef}
                            onChange={(e) => emailHandler(e)}
                            onBlur={(e) => blurHandler(e)}
                            type="email"
                            placeholder="Email" />
                        {(emailDirty && emailError) && <p style={{ color: "red", textAlign: "left", marginTop: "-13px", marginBottom: "13px" }}>{emailError}</p>}


                        <input
                            ref={passwordRef}
                            name="password"
                            onBlur={(e) => blurHandler(e)}
                            type="password"
                            value={password}
                            onChange={(e) => passwordHandler(e)}
                            placeholder="Password" />
                        {(passwordDirty && passwordError) && <p style={{ color: "red", textAlign: "left", marginTop: "-13px", marginBottom: "13px" }}>{passwordError}</p>}


                        <button disabled={!formValid} onClick={signIn} type="submit">Sign In</button>
                        <h4>
                            <span className="span">New to NetFlix? </span>
                            <span onClick={() => setSignup(true)} className="SigninPage__link">Sign Up now.</span>
                        </h4>
                    </form>
                </div>
            )}
        </>
    )
}