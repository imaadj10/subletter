export default function SingleNotification(props) {
  const { id, title, content, setNotifications } = props;

  // function deleteNotificationDB() {
  //     axios stuff
  // }

  function deleteNotification() {
    // deleteNotificationDB()
    setNotifications((prevNotifs) => {
      prevNotifs.filter((notif) => {
        return notif.id !== id;
      });
    });
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
