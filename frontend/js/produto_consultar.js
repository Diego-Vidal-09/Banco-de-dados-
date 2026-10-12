let resposta = document.getElementById('resposta')
let resposta_nome = document.getElementById('resposta_nome')
let btn_consultar = document.getElementById('btn_consultar')
let btn_consultar_nome = document.getElementById('btn_consultar_nome')

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault()
    
    const codProduto = document.getElementById('codProduto').value

    fetch(`http://localhost:3000/produto/${codProduto}`)
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        resposta_nome.innerHTML = ''

        if (!dados || dados.message) {
            resposta.innerHTML = `<p>${dados.message || 'Produto não encontrado!'}</p>`
            return
        }

        let dadosArr = Array.isArray(dados) ? dados : [dados]

        resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dadosArr)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao consultar os dados', err)
        resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
    })
})

btn_consultar_nome.addEventListener('click', (e) => {
    e.preventDefault()
    
    const nomeProduto = document.getElementById('nomeProduto').value

    fetch(`http://localhost:3000/produto/buscar/${nomeProduto}`)
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        resposta_nome.innerHTML = ''

        if (!dados || dados.message) {
            resposta_nome.innerHTML = `<p>${dados.message || 'Produto não encontrado!'}</p>`
            return
        }

        let dadosArr = [dados]

        resposta_nome.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dadosArr)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao consultar os dados', err)
        resposta_nome.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
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