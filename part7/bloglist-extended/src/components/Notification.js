import { useSelector } from "react-redux";

const Notification = () => {
  const notifcation = useSelector(({ notifcation }) => notifcation);

  if (!notifcation.message) return null;
  return <div className={notifcation.status}>{notifcation.message}</div>;
};

export default Notification;
