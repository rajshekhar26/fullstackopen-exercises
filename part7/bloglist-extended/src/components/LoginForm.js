import { useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../reducers/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setUser({ username, password }));
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <button className="btn-login" type="submit">
        log in
      </button>
    </form>
  );
};

export default LoginForm;
