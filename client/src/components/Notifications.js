import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import SingleNotification from './SingleNotification';
import '../css/Notifications.css';
import Cookies from 'universal-cookie';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:1234/notifications',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const notificationsData = response.data.map((notif) => ({
          id: notif.nid,
          title: notif.title,
          content: notif.content,
        }));

        setNotifications(notificationsData);

        // setNotifications([...notifications,
        //   ...notificationsData,
        // ]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="notifs">
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notif) => {
          return (
            <SingleNotification
              key={notif.id}
              id={notif.id}
              title={notif.title}
              content={notif.content}
              setNotifications={setNotifications}
              token={token}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Notifications;
