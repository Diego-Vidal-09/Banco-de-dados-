let resposta = document.getElementById('resposta')
let btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()
    
    const codUsuario = document.getElementById('codUsuario').value
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    if (!codUsuario) {
        resposta.innerHTML = '<p>Por favor, informe o Código do Usuário!</p>'
        return
    }

    const usuarioAtualizado = {
        nome: nome,
        email: email,
        senha: senha
    }

    fetch(`http://localhost:3000/usuario/${codUsuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioAtualizado)
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
        resposta.innerHTML = '<p>Erro ao tentar atualizar o usuário.</p>'
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