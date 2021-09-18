import { useState } from 'react'
import styled from 'styled-components'

import { Button } from '../GlobalStyle'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div>
      <div style={hideWhenVisible}>
        <TogglableButton
          primary
          className='btn-toggle-children'
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </TogglableButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <TogglableButton
          primary
          className='btn-cancel'
          onClick={toggleVisibility}
        >
          Cancel
        </TogglableButton>
      </div>
    </div>
  )
}

const TogglableButton = styled(Button)`
  margin-top: 0.4em;
`

export default Togglable
