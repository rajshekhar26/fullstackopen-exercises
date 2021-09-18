import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { likeBlog, removeBlog } from "../reducers/blogsReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleRemoveBlog = (blog) => {
    const confirmRemoval = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    confirmRemoval && dispatch(removeBlog(blog.id));
  };

  const handleLikeBlog = (blog) => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: (blog.likes += 1),
    };
    dispatch(likeBlog(newBlog));
  };

  return (
    <div style={blogStyle} className="blogs">
      <div>
        {blog.title} {blog.author}
        <button
          className="btn-details"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      {showDetails ? (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button className="btn-like" onClick={() => handleLikeBlog(blog)}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          {blog.user.id === user.id || blog.user === user.id ? (
            <button
              className="btn-delete-blog"
              onClick={() => handleRemoveBlog(blog)}
            >
              remove
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default Blog;
