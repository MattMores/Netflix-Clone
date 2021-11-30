import React, { useState } from 'react';

function Banner() {
    const [movie, setMovie] = useState([]); // responsible for whatever random movie gets selected at top

    useEffect(() => {

    }, []); //want it to run only once - when the banner compoment loads

    return (
        <header>
            {/* title */}
            {/* div > 2 buttons */}
            {/*  description */}
        </header>
    )
}

export default Banner
