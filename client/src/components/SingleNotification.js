import axios from 'axios';

export default function SingleNotification(props) {
  const { id, title, content, setNotifications, token } = props;

  async function deleteNotification() {
    try {
      await axios
        .delete(`http://localhost:1234/notifications/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setNotifications((prevNotifs) => {
            return prevNotifs.filter((notif) => notif.id !== id);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <li className="notif-item">
      <div className="padding-right">
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
      <span className="delete">
        <u onClick={deleteNotification}>Delete</u>
      </span>
    </li>
  );
}
