describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('displays the login form', function() {
    cy.get('.btn-toggle-children').click()
    cy.get('input#username')
    cy.get('input#password')
    cy.get('.btn-login').contains('log in')
    cy.get('.btn-cancel').contains('cancel')
  })

  describe('Login', function() {
    beforeEach(function() {
      const user = {
        username: 'root',
        password: 'superuser',
        name: 'root'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
    })

    it('succeeds with correct credentials', function() {
      cy.get('.btn-toggle-children').click()
      cy.get('input#username').type('root')
      cy.get('input#password').type('superuser')
      cy.get('.btn-login').click()

      cy.contains('root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('.btn-toggle-children').click()
      cy.get('input#username').type('root')
      cy.get('input#password').type('notsuperuser')
      cy.get('.btn-login').click()

      cy.contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'root', password: 'superuser' })
      })

      it('a blog can be created', function() {
        cy.contains('root logged in')
        cy.get('.btn-toggle-children').click()
        cy.get('#title').type('Test blog')
        cy.get('#author').type('Raj Shekhar')
        cy.get('#url').type('testurl.xyz')

        cy.get('.btn-create-blog').click()

        cy.contains('Test blog')
        cy.contains('Raj Shekhar')
      })

      describe('When a blog exists', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'Test blog',
            author: 'Raj Shekhar',
            url: 'testurl.xyz',
            user: JSON.parse(localStorage.getItem('blogAppUser'))
          })
        })

        it('existing blog can be liked', function() {
          cy.get('.btn-details').click()
          cy.contains('likes 0')
          cy.get('.btn-like').click()
          cy.contains('likes 1')
        })

        it('can be deleted by the user who created it', function() {
          cy.get('.btn-details').click()
          cy.contains('remove')
          cy.get('.btn-delete-blog').click()
          cy.contains('Test blog by Raj Shekhar was removed')
          cy.get('html').should('not.have.class', 'btn-details')
        })

        it('can not be deleted by the user who did not create it', function() {
          const user = {
            username: 'user',
            password: 'user',
            name: 'user'
          }
          cy.request('POST', 'http://localhost:3001/api/users', user)

          cy.get('.btn-logout').click()

          cy.get('.btn-toggle-children').click()
          cy.login({ username: 'user', password: 'user' })
          cy.get('.btn-details').click()
          cy.get('html').should('not.have.class', 'btn-delete-blog')
        })
      })

      describe.only('When many blogs exist', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'Test blog 1',
            author: 'Raj Shekhar',
            url: 'testurl.xyz',
            user: JSON.parse(localStorage.getItem('blogAppUser'))
          })

          cy.createBlog({
            title: 'Test blog 2',
            author: 'Raj Shekhar',
            url: 'testurl2.xyz',
            user: JSON.parse(localStorage.getItem('blogAppUser'))
          })

          cy.createBlog({
            title: 'Test blog 3',
            author: 'Raj Shekhar',
            url: 'testurl3.xyz',
            user: JSON.parse(localStorage.getItem('blogAppUser'))
          })
        })

        it('blogs are ordered by most likes', function() {
          cy.contains('Test blog 1').find('button').as('btn1')
          cy.contains('Test blog 2').find('button').as('btn2')
          cy.contains('Test blog 3').find('button').as('btn3')

          cy.get('@btn3').click()
            .get('.btn-like').click()
            .get('.btn-like').click()
            .get('.btn-like').click()
          cy.contains('hide').click()

          cy.get('@btn1').click()
            .get('.btn-like').click()
          cy.contains('hide').click()

          cy.get('.blogs').first().should('contain', 'Test blog 3')
          cy.get('.blogs').last().should('contain', 'Test blog 2')
        })
      })
    })
  })

})
