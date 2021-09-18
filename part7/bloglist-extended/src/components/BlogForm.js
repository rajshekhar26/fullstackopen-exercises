import { useState } from "react";
import { useDispatch } from "react-redux";

import { createBlog } from "../reducers/blogsReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="btn-create-blog" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
