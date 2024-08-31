import React from 'react';
import Navbar from './Navbar';

const Wrapper = (props) => {
    return (
        <div> 
            <Navbar/>
                <div className="pt-3 pb-2 mb-3 border-bottom">
                    {props.children}
                </div>

                </div>

    );
};

export default Wrapper;