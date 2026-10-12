let resposta = document.getElementById('resposta')
let btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()
    
    const codProduto = document.getElementById('codProduto').value
    const nomeProduto = document.getElementById('nomeProduto').value
    const categoria = document.getElementById('categoria').value
    const precoUnitario = document.getElementById('precoUnitario').value
    const qtdeEstoque = document.getElementById('qtdeEstoque').value
    const data = document.getElementById('data').value

    if (!codProduto) {
        resposta.innerHTML = '<p>Por favor, informe o Código do Produto!</p>'
        return
    }

    const produtoAtualizado = {
        nomeProduto: nomeProduto,
        categoria: categoria,
        precoUnitario: parseFloat(precoUnitario),
        qtdeEstoque: parseInt(qtdeEstoque),
        data: data
    }

    fetch(`http://localhost:3000/produto/${codProduto}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoAtualizado)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''

        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
            document.querySelector('form').reset()
            return
        }

        let dadosArr = Array.isArray(dados) ? dados : [dados]

        resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dadosArr)}
            </table>
        `
        document.querySelector('form').reset()
    })
    .catch((err) => {
        console.error('Erro ao atualizar os dados', err)
        resposta.innerHTML = '<p>Erro ao tentar atualizar o produto.</p>'
    })
})

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        const preco = Number(el.precoUnitario)

        corpo += `<tr>`
        corpo += `<td>${el.id || el.codProduto}</td>`
        corpo += `<td>${el.nomeProduto}</td>`
        corpo += `<td>${el.categoria}</td>`
        corpo += `<td>R$ ${preco.toFixed(2)}</td>`
        corpo += `<td>${el.qtdeEstoque}</td>`
        corpo += `<td>${el.data}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome do Produto</th>
                <th>Categoria</th>
                <th>Preço Unitário</th>
                <th>Estoque</th>
                <th>Data</th>
            </tr>
        </thead>
    `
}