beforeEach(() => {
  cy.login('test@qa.com', '12345')
})

describe('template spec', () => {
  let product1 = 'violao takamine' + Math.random()
  let product2 = 'viola gianinni' + Math.random()

  it('Fluxo de CRUD de Produto', () => {
    cy.visit('https://front.serverest.dev/admin/home')
    cy.get('[data-testid="cadastrar-produtos"]').click()
    cy.get('[data-testid="nome"]').type(product1)
    cy.get('[data-testid="preco"]').type('3000')
    cy.get('[data-testid="descricao"]').type('Um dos melhores violão que existe, esse violão tem um timbre incrível')
    cy.get('[data-testid="quantity"]').type('10')
    cy.get('[data-testid="cadastarProdutos"]').click()
    cy.get('h1').contains('Lista dos Produtos')
    cy.get('tbody').should('be.visible')
    cy.get('td').should('include.text', product1)
    cy.get('tr').each(($row) => {
       if ($row.find('td').eq(0).text() === product1){
          $row.find('td').eq(5).children('div').children('.btn-danger').click()
       }
    })
    cy.get('td').should('not.include.text', product1)
  })


  it('Fluxo de Delete de Produto', () => {
    cy.productRegistration(product2 , '2000', 'Viola feita a mão pelo melhor Lutier', '2')
    cy.visit('https://front.serverest.dev/admin/listarprodutos')
    cy.get('h1').contains('Lista dos Produtos')
    cy.get('tbody').should('be.visible')
    cy.get('td').should('include.text', product2)
    cy.get('tr').each(($row) => {
      if ($row.find('td').eq(0).text() === product2){
          $row.find('td').eq(5).children('div').children('.btn-danger').click()
      }
    })
    cy.get('td').should('not.include.text', product2)
  })
})




// test@qa.com 
// 12345