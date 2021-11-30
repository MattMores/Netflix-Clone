import React, { useState, useEffect } from 'react'
import "./Nav.css"

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
                // handleShow is true when we scroll past 100 px on the y-axis
            } else handleShow(false) // if you aren't past 100 px set it to false
        });
        return () => {
            window.removeEventListener("scroll");
        } //remove the listener after each useEffect firesoff again - so you don't have mulitple listeners
    }, []);
    // black bar to show up ONLY on scroll

    return (
        <div className={`nav ${show && "nav__black"}`}>
            {/* if show is true, then also append the second class nav__black*/}
            <img
            className="nav__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            />

            <img
            className="nav__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Netflix Logo"
            />

        </div>
    )
}

export default Nav
