/* ---- Elementos ---- */

const inputNome = document.querySelector('input#nome')
const inputTelefone = document.querySelector('input#telefone')
const textareaMensagem = document.querySelector('textarea#mensagem')
const buttonEnviar = document.querySelector('button#enviar')

/* ---- Eventos ---- */

buttonEnviar.addEventListener('click', enviarFormulario)

/* ---- Callbacks ---- */

function enviarFormulario () {
    const nome = inputNome.value
    const telefone = inputTelefone.value
    const mensagem = textareaMensagem.value

    const pontos = calcularPontuacao()
    const resultado = pontos >= 11 ? '✅ **Passou**' : '❌ **Reprovado**'

    const dados = prepararDados(nome, telefone, mensagem, pontos, resultado)
    enviarParaDiscord(dados)
}

/* ---- Aux Functions ---- */

function calcularPontuacao () {
    let pontos = 0

    // Pega todos os radios com value="sim" que estão marcados
    const radiosSim = document.querySelectorAll('input[type="radio"][value="sim"]:checked')
    pontos += radiosSim.length

    // Pega todos os checkboxes marcados dos códigos Q
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="codigosQ"]:checked')
    pontos += checkboxes.length

    return pontos
}

function prepararDados (nome, telefone, mensagem, pontos, resultado) {
    const dados = {
        content: `
:green_circle: **Recrutamento resultado**

:person_bald: **QRA**
${nome}

:telephone: **ID**
${telefone}

:clipboard: **Pontuação**
${pontos} pontos

:page_facing_up: **Resultado**
${resultado}

:envelope: **Comentário**
${mensagem}
        `
    }

    return JSON.stringify(dados)
}

function enviarParaDiscord (dados) {
    const url = 'https://discord.com/api/webhooks/1364291804807168190/5ro9OtD4C8xDShEXszLXtO5Ywd3mjlf82vhiHOc9gIIyekeuxH7AVEmHxVuiXcnqkbLD'
    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dados
    }

    window.fetch(url, config)
        .then(limparCampos)
        .catch(error => console.log(error.message))
}

function limparCampos () {
    inputNome.value = ''
    inputTelefone.value = ''
    textareaMensagem.value = ''
}
