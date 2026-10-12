let resposta = document.getElementById('resposta')
let btn_apagar = document.getElementById('btn_apagar')

btn_apagar.addEventListener('click', (e) => {
    e.preventDefault()
    
    const codProduto = document.getElementById('codProduto').value

    if (!codProduto) {
        resposta.innerHTML = '<p>Por favor, informe o Código do Produto!</p>'
        return
    }

    fetch(`http://localhost:3000/produto/${codProduto}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err) => {
        console.error('Erro ao apagar os dados', err)
        resposta.innerHTML = '<p>Erro ao tentar apagar o registro.</p>'
    })
})