import React, { useState } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import "./ChangePass.css"
import Nav from "../Nav/Nav";

export default function ChangePassword() {
    const [password, setPassword] = useState("")
    const [secondPass, setSecondPass] = useState("")
    const [err] = useState("Passwords don't match")
    const auth = getAuth();

    const user = auth.currentUser;
    const newPassword = 'getASecureRandomPassword()';

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!password === secondPass || password.length === 0) {
            alert(err)
        } else {
            updatePassword(user, password).then(() => {
                alert("Succes")
            }).catch((error) => {
                alert(error)
            });
        }
    }



    return (
        <div className="changePage">
            <Nav />
            <form onSubmit={handleSubmit}>
                <h1>Change Password</h1>
                <input type="password" placeholder="Write current password" />
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Write new password" />
                <input onChange={e => setSecondPass(e.target.value)} value={secondPass} type="password" placeholder="Confirm new password" />
                <button type="submit">
                    Change
                </button>
            </form>
        </div>
    )
}