import './Profile.css';
import React from 'react';


const Profile = () => {


    const logout = () => {

    }

    return (
        <div>
            <h1> Welcome to Profile!</h1>

            <button className='logout-button' onClick={logout}>Logout</button>

        </div>
    );
};

export default Profile;