const Notification = ({ notifcation }) => {
  if (!notifcation) return null

  return (
    <div className={notifcation.type}>
      {notifcation.message}
    </div>
  )
}

export default Notification
