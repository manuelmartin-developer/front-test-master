/// <reference types="cypress" />

describe('Front-test-master - Gallery App E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays header and contain a nav', () => {
    cy.get('header').should('be.visible')
    cy.get('nav').should('be.visible')
  })

  it('displays a list of images', () => {
    cy.get('section').should('be.visible')
    cy.get('section article').should('be.visible')
    cy.get('section article').should('have.length', 10)
  })
})
