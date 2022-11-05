/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('.type() - type into search input', () => {

    cy.get('input[type="text"]')
      .type('hello').should('have.value', 'hello')
      .type('{selectall}{backspace}').should('have.value', '')
  })

  it('.type() - type into search input should call API', () => {
    cy.get('input[type="text"]')
      .type('red').should('have.value', 'red')
      .get('section article').should('have.length', 1)
      .get('input[type="text"]')
      .type('{selectall}{backspace}').should('have.value', '')
      .get('section article').should('have.length', 10)

  })

  it('.scrollTo() - scroll window to bottom', () => {
    cy.scrollTo('bottom')
    cy.get('section article').should('have.length', 15)
  })

  it('.hover() - hover over image', () => {
    cy.get('section article').first().trigger('mouseover')
    cy.get('section article').first().find('button').should('have.length', 2)
  })

  it('.hover() - hover over image and click on like button', () => {
    cy.get('section article').first().trigger('onmouseover')
    cy.get('section article').first().find('button').first().click({ force: true })
    cy.get('section article').first().find('button span').first().should('have.text', '002')
  })
})
