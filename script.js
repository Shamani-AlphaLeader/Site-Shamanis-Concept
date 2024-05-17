//let menu = document.querySelector("#menu")
let menu = document.getElementById("menu")
let iconeBarras = document.getElementById("icone-barras")
let iconeX = document.getElementById("icone-x")


function abrirFecharMenu() {
    //se o menu esta fechado.
    if (menu.classList.contains("menu-fechado")) {
        //abrir o menu.
        menu.classList.remove("menu-fechado")

        iconeX.style.display = "inline"

        iconeBarras.style.display = "none"

    } else {
        //fechar o menu.
        menu.classList.add("menu-fechado")

        iconeX.style.display = "none"

        iconeBarras.style.display = "inline"

    }

}

window.onresize = () => {
    menu.classList.remove("menu-fechado")
    iconeX.style.display = "inline"
    iconeBarras.style.display = "none"
}

let listaCases = []

const renderizarCases = () => {
    let elementoLista = document.getElementById("lista-cards")

    // Template Strings.
    let template = ""

    listaCases.forEach(cardCase => {
        template += `<div class="card">
    <img src="${cardCase.imagem}" alt="">
    <p>${cardCase.descricao}</p>
    <button>Ver Mais</button>
    </div>`
    })

    elementoLista.innerHTML = template
}

const carregarCases = () => {
    //metodo HTTP GET - Read = carregar.
    fetch("http://localhost:3000/cases")
        .then(resposta => resposta.json())
        .then((dados) => {
            listaCases = dados
            renderizarCases()
        })
}





const solicitarOrcamento = (event) => {
    // Pegar valores dos inputs
    let valorNome = document.getElementById("campo-nome").value
    let valorEmail = document.getElementById("campo-email").value
    let valorDescricao = document.getElementById("campo-descricao").value

    // Organizar objeto com os valores
    let dadosForm = {
        nome: valorNome,
        email: valorEmail,
        descricao: valorDescricao
    }

    // Enviar requisicao para a api
    //127.0.0.1 significa a mesma coisa que localhost. Sendo assim, 127.0.0.1 = localhost.
    //metodo HTTP GET - Create = cadastrar ou criar.
    fetch("http://127.0.0.1:3000/solicitacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosForm)
    })
        .then(resposta => {
            console.log(resposta)
            // Limpar os campos (inputs).
            document.querySelector("#contato form").reset()

            // Mostrar alert com msg de sucesso
            alert("Solicitacao cadastrada")

        })
        .catch(erro => {
            //CASO DE ERRO - alert com msg de erro
            console.error(erro)
            alert("Erro na sua requisicao")
        })


    event.preventDefault()
}