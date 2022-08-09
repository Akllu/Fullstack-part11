describe('Bloglist', function () {
  it('login form is shown', function () {
    cy.visit('http://localhost:3003')
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })

  it('login succeeds with correct credentials', function () {
    cy.visit('http://localhost:3003')
    cy.get('#username-input').type('wick')
    cy.get('#password-input').type('john123')
    cy.get('#login-button').click()

    cy.contains('John Wick logged in')
  })
})
