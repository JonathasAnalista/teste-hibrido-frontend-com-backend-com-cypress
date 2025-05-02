Cypress.Commands.add('login', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: {
            email: email,
            password: password

        }
    }).then((response) => {
       window.localStorage.setItem('serverest/userToken', response.body.authorization)
    })

})

Cypress.Commands.add('productRegistration', (name, price, description, quantity) => {
    cy.request({
        method: "POST",
        url: "https://serverest.dev/produtos",
        body: {
            nome: name,
            preco: price,
            descricao: description,
            quantidade: quantity
        },
        headers: {
            Authorization: window.localStorage.getItem('serverest/userToken'),
        }
    })
})