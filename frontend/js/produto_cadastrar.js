let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()
    
    const nomeProduto = document.getElementById('nomeProduto').value
    const categoria = document.getElementById('categoria').value
    const precoUnitario = document.getElementById('precoUnitario').value
    const qtdeEstoque = document.getElementById('qtdeEstoque').value
    const data = document.getElementById('data').value

    const produto = { 
        nomeProduto: nomeProduto,
        categoria: categoria,
        precoUnitario: parseFloat(precoUnitario),
        qtdeEstoque: parseInt(qtdeEstoque),
        data: data
    }

    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        
        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
            document.querySelector('form').reset()
        }
    })
    .catch((err) => {
        console.error('Erro ao cadastrar produto', err)
        resposta.innerHTML = '<p>Erro ao tentar cadastrar o produto.</p>'
    })
})