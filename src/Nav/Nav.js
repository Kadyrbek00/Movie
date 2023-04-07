import React, { useEffect, useState } from "react";
import "./Nav.css"
import { Link } from "react-router-dom";
import netflixImage from "../Images/netflix.png"
import userIcon from "../Images/icon.jpg"

function Nav() {
    const [show, setShow] = useState(false)

    const transitionNavBar = () => {
        if (window.scrollY > 200) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar)
        return () => window.removeEventListener("scroll", transitionNavBar)
    }, [])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
                <Link to={"/"}>
                    <img className="nav__logo"
                        src={netflixImage} alt="Netflix" />
                </Link>

                <Link to={"/profile"}>
                    <img className="nav__avatar"
                        src={userIcon} alt="avatar" />
                </Link>

            </div>

        </div>
    )
}

export default Nav