import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls handler with right details when blog is created', () => {
    const mockHandler = jest.fn()
    const component = render(
      <BlogForm handleCreateBlog={mockHandler} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'Test blog' }
    })

    fireEvent.change(author, {
      target: { value: 'Raj Shekhar' }
    })

    fireEvent.change(url, {
      target: { value: 'https://example.com' }
    })

    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)

    expect(mockHandler.mock.calls[0][0].title).toBe('Test blog')
    expect(mockHandler.mock.calls[0][0].author).toBe('Raj Shekhar')
    expect(mockHandler.mock.calls[0][0].url).toBe('https://example.com')
  })
})
