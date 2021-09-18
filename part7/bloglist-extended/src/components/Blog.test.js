import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Raj Shekhar',
    url: 'https://example.com/',
    likes: 12,
    user: {
      username: 'test',
      name: 'Test'
    }
  }

  const user = {
    username: 'test',
    password: 'test'
  }

  test('renders title and author', () => {
    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent(blog.title, blog.author)
  })

  test('does not render url and likes initially', () => {
    const component = render(<Blog blog={blog} />)

    expect(component.container).not.toHaveTextContent(blog.url, blog.likes)
  })

  test('renders url and likes after clicking the button', () => {
    const component = render(<Blog blog={blog} user={user} />)

    const button = component.container.querySelector('.btn-details')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url, blog.likes)
  })

  describe('when details is displayed', () => {
    test('if the like button is clicked twice, handler is called twice', () => {
      const mockHander = jest.fn()
      const component = render(
        <Blog blog={blog} user={user} handleUpdateBlog={mockHander} />
      )

      const detailsBtn = component.container.querySelector('.btn-details')
      fireEvent.click(detailsBtn)

      const likeBtn = component.container.querySelector('.btn-like')
      fireEvent.click(likeBtn)
      fireEvent.click(likeBtn)

      expect(mockHander.mock.calls).toHaveLength(2)
    })
  })
})
