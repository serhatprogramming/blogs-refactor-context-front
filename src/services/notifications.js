// context
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const postNotification = ({ action, payload }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  notificationDispatch({ action, payload });

  setTimeout(() => {
    notificationDispatch({ type: "CLEAR" });
  }, 5000);
};

export default { postNotification };
