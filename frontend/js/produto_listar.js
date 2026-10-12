let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/produtos')
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao listar os dados', err)
        resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
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