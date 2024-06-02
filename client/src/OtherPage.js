import React from "react";
import { Link } from "react-router-dom";

const OtherPage = () => {
    return (
        <div>
            I'm on OtherPage! <br />
            <br />
            <Link to="/">Go back to home screen</Link>
        </div>
    );
};

export default OtherPage;
