import React from "react";
import "./ProfilePage.css"
import Nav from "../Nav/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../app/features/userSlice"
import { auth } from "../firebase";
import userIcon from "../Images/icon.jpg"
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const user = useSelector(selectUser)

    return (
        <div className="profileScreen">
            <Nav />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img
                        src={userIcon} alt="avatar" />
                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <Link to={"/"}>
                            <button onClick={() => auth.signOut()} className="profileScreen__signOut">Log Out</button>
                        </Link>
                    </div>
                </div>
                <Link to={"/changePassword"}>
                    <p>Change Password</p>
                </Link>
            </div>
        </div>
    )
}