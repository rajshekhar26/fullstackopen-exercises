import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import { setExistingUser, removeUser } from "./reducers/userReducer";
import { getAllBlogs } from "./reducers/blogsReducer";

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  useEffect(() => {
    dispatch(setExistingUser());
  }, []);

  const handleLogout = () => {
    dispatch(removeUser());
  };

  const sortedBlog = blogs.sort((a, b) => b.likes - a.likes);

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <Togglable buttonLabel="log in">
          <LoginForm />
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <p>
        {user.name} logged in
        <button className="btn-logout" onClick={handleLogout}>
          log out
        </button>
      </p>

      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>

      {sortedBlog.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
