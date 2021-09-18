import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    font-family: sans-serif;
    line-height: 1.5;
    color: #333;
  }

  a {
    text-decoration: none;
    color: royalblue;

    &:hover {
      color: black;
    }
  }

  ul {
    list-style-type: none;
  }

  input {
    width: 100%;
    border: 2px solid #eee;
    background-color: #eee;
    border-radius: 0.5em;
    margin: 0.7em 0;
    padding: 0.5em;
    font-size: inherit;
    font-family: inherit;

    &:focus, &:active {
      border: 2px solid royalblue;
    }
  }
`

export const Button = styled.button`
  padding: 0.7em 1.2em;
  font-family: inherit;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 1.5em;
  border: 2px solid ${({ primary }) => (primary ? 'royalblue' : 'white')};
  color: ${({ primary }) => (primary ? 'royalblue' : 'white')};
  background-color: inherit;

  &:hover {
    color: ${({ primary }) => (primary ? 'white' : 'black')};
    background-color: ${({ primary }) => (primary ? 'royalblue' : 'white')};
  }
`

export default GlobalStyle
