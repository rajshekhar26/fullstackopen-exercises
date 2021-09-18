import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Notification = () => {
  const notifcation = useSelector(({ notifcation }) => notifcation)

  if (!notifcation.message) return null
  return <Message status={notifcation.status}>{notifcation.message}</Message>
}

const Message = styled.div`
  background-color: ${({ status }) =>
    status === 'success' ? 'rgba(15, 41, 221, 0.2)' : 'rgba(205, 22, 24, 0.2)'};
  padding: 0.8rem 1em;
  margin: 1em 0;
  color: ${({ status }) => (status === 'success' ? 'royalblue' : 'red')};
  border-radius: 0.5em;
`

export default Notification
