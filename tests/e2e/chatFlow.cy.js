<reference types="cypress" />

describe('Sorting Hat Chat Application', () => {
    beforeEach(() => {
      // Visitar la aplicación antes de cada prueba
      cy.visit('/');
    });
  
    it('loads the first question', () => {
      // Verifica que la primera pregunta aparece en el chat
      cy.contains('What would you choose?').should('be.visible');
    });
  
    it('selects an option and moves to the next question', () => {
      // Seleccionar una opción
      cy.contains('Courage').click();
  
      // Verificar que la siguiente pregunta aparece
      cy.contains('Next Question Text').should('be.visible');
    });
  
    it('shows the final result after answering all questions', () => {
      // Simular el flujo completo, seleccionando respuestas para cada pregunta
      cy.contains('Courage').click();
      cy.contains('Wisdom').click();
      cy.contains('Kindness').click();
  
      // Verificar que se muestra el resultado final
      cy.contains('You belong to Gryffindor').should('be.visible');
    });
  
    it('resets the chat after completion', () => {
      // Simular el flujo completo hasta que aparece el resultado
      cy.contains('Courage').click();
      cy.contains('Wisdom').click();
      cy.contains('Kindness').click();
  
      // Verificar que se muestra el botón de reinicio
      cy.contains('Restart Chat').click();
  
      // Verificar que el chat se reinicia correctamente
      cy.contains('What would you choose?').should('be.visible');
    });
  
    it('loads the confetti when the result is shown', () => {
      // Simular el flujo completo hasta que aparece el resultado
      cy.contains('Courage').click();
      cy.contains('Wisdom').click();
      cy.contains('Kindness').click();
  
      // Verificar que se ejecuta el confetti
      cy.window().then((win) => {
        const confettiSpy = cy.spy(win, 'confetti');
        cy.wrap(confettiSpy).should('have.been.called');
      });
    });
  });
  