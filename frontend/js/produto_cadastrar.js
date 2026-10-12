const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')
const selectUsuario = document.getElementById('idUsuario')

// Carrega os usuários existentes
async function carregarUsuarios() {
    try {
        const res = await fetch('http://localhost:3000/usuarios')

        if (!res.ok) {
            throw new Error('Erro ao buscar usuários')
        }

        const usuarios = await res.json()

        usuarios.forEach(usuario => {
            const option = document.createElement('option')
            option.value = usuario.codUsuario
            option.textContent = `${usuario.codUsuario} - ${usuario.nome}`
            selectUsuario.appendChild(option)
        })

    } catch (err) {
        console.error(err)
        resposta.textContent = 'Erro ao carregar usuários.'
    }
}

carregarUsuarios()

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault()

    const produto = {
        idUsuario: Number(selectUsuario.value),
        nomeProduto: document.getElementById('nomeProduto').value,
        categoria: document.getElementById('categoria').value.toUpperCase().trim(),
        precoUnitario: parseFloat(document.getElementById('precoUnitario').value),
        qtdeEstoque: parseInt(document.getElementById('qtdeEstoque').value, 10),
        data: document.getElementById('data').value
    }

    if (!selectUsuario.value) {
        resposta.textContent = 'Selecione um usuário.'
        return
    }

    try {
        const res = await fetch('http://localhost:3000/produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })

        const dados = await res.json()

        resposta.textContent = dados.message

        if (res.ok) {
            document.querySelector('form').reset()
        }

    } catch (err) {
        console.error('Erro ao cadastrar produto:', err)
        resposta.textContent = 'Erro ao conectar com o servidor.'
    }
})