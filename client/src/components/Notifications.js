import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import SingleNotification from './SingleNotification';

const Notifications = () => {
    // async function getAllNotifications() {
    //     try {
    //         await axios
    //             .get('http://localhost:1234/notifications/:id')
    //             .then( (res) => {

    //             })
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // a long string of json
    const [notifications, setNotifications] = useState([]);

    return (
        <div className="notifs">
            <h1>Notifications</h1>
            <ul>
                {notifications.map((notif) => {
                    return (
                        <SingleNotification
                            id={notif.id}
                            title={notif.title}
                            content={notif.content}
                            setNotifications={setNotifications}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default Notifications;
