let resposta = document.getElementById('resposta')
let resposta_nome = document.getElementById('resposta_nome')
let btn_consultar = document.getElementById('btn_consultar')
let btn_consultar_nome = document.getElementById('btn_consultar_nome')

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault()
    
    const codUsuario = document.getElementById('codUsuario').value

    fetch(`http://localhost:3000/usuario/${codUsuario}`)
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        resposta_nome.innerHTML = ''

        if (!dados || dados.message) {
            resposta.innerHTML = `<p>${dados.message || 'Usuário não encontrado!'}</p>`
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
    
    const nome = document.getElementById('nome').value

    fetch(`http://localhost:3000/usuario/buscar/${nome}`)
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        resposta_nome.innerHTML = ''

        if (!dados || dados.message) {
            resposta_nome.innerHTML = `<p>${dados.message || 'Usuário não encontrado!'}</p>`
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
        corpo += `<tr>`
        corpo += `<td>${el.id || el.codUsuario}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.email}</td>`
        corpo += `<td>${el.senha}</td>`
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
                <th>Nome</th>
                <th>E-mail</th>
                <th>Senha</th>
            </tr>
        </thead>
    `
}