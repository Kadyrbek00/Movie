import React, { useState } from "react";
import "./InitialPage.css"
import netflixImage from "../Images/netflix.png"
import SigninPage from "../SigninPage/SigninPage";

export default function InitialPage() {
    const [signIn, setSignIn] = useState(false);

    return (
        <div className="InitialPage">
            <div className="InitialPage__background">
                <img className="InitialPage__logo"
                    src={netflixImage} alt="logo" />

                <button onClick={() => setSignIn(true)} className="InitialPage__button">
                    Sign In
                </button>

                <div className="InitialPage__gradient" />
            </div>

            <div className="InitialPage__body">
                {signIn ? (
                    <SigninPage />

                ) : (
                    <>
                        <h1>Unlimited films, TV programmes and more.</h1>
                        <h2>Watch anywhere. Cancel at any time.</h2>
                        <h3>
                            Ready to watch? Enter your email to create or restart your membership
                        </h3>

                        <section>
                            <button onClick={() => setSignIn(true)} className="InitialPage__getStart">
                                GET STARTED
                            </button>
                        </section>
                    </>
                )}

            </div>

        </div>
    )
}