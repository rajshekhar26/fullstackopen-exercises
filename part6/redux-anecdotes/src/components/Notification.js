import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if (!notification) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = ({ notification }) => ({ notification })

const ConnectNotification = connect(mapStateToProps)(Notification)

export default ConnectNotification
