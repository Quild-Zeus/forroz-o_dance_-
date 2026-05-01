const senhaCorreta = "6262";

function verificarSenha() {
    const senha = document.getElementById("senha").value;

    if (senha === senhaCorreta) {
        // Esconde login
        document.getElementById("login-box").style.display = "none";

        // Mostra painel
        document.getElementById("painel").style.display = "block";

        // Mostra botão voltar
        document.getElementById("btn-voltar").style.display = "inline-block";

        carregarEventosAdmin();
    } else {
        alert("Senha incorreta!");
    }
}

function voltar() {
    window.location.href = "index.html";
}



// ADICIONAR EVENTO
function adicionarEvento() {
    const dataISO = document.getElementById("data").value;
    const evento = document.getElementById("evento").value;

    if (!dataISO || !evento) {
        alert("Preencha todos os campos!");
        return;
    }

    const dataFormatada = formatarData(dataISO);

    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

    eventos.push({ data: dataFormatada, evento });

    localStorage.setItem("eventos", JSON.stringify(eventos));

    carregarEventosAdmin();
    limparCampos();
}

function limparCampos() {
    document.getElementById("data").value = "";
    document.getElementById("evento").value = "";
}

// MOSTRAR NO SITE (index)
function carregarEventos() {
    const lista = document.getElementById("lista-eventos");

    if (!lista) return;

    lista.innerHTML = "";

    const eventos = JSON.parse(localStorage.getItem("eventos")) || [];

    eventos.forEach(e => {
        const div = document.createElement("div");
        div.className = "evento";
        div.innerHTML = `<p><strong>${e.data}</strong> - ${e.evento}</p>`;
        lista.appendChild(div);
    });
}

// MOSTRAR NO ADMIN + BOTÃO REMOVER
function carregarEventosAdmin() {
    const lista = document.getElementById("lista-admin");
    lista.innerHTML = "";

    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

    eventos.forEach((e, index) => {
        const div = document.createElement("div");
        div.className = "evento";

        div.innerHTML = `
            <p><strong>${e.data}</strong> - ${e.evento}</p>
            <button onclick="editarEvento(${index})">Editar</button>
            <button onclick="removerEvento(${index})">Remover</button>
        `;

        lista.appendChild(div);
    });
}

function editarEvento(index) {
    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

    const novoEvento = prompt("Editar descrição do evento:", eventos[index].evento);

    if (novoEvento !== null && novoEvento !== "") {
        eventos[index].evento = novoEvento;

        localStorage.setItem("eventos", JSON.stringify(eventos));

        carregarEventosAdmin();
    }
}

// REMOVER
function removerEvento(index) {
    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

    eventos.splice(index, 1);

    localStorage.setItem("eventos", JSON.stringify(eventos));

    carregarEventosAdmin();
}

// CARREGAR AUTOMÁTICO
document.addEventListener("DOMContentLoaded", () => {
    carregarEventos();
});

let cliques = 0;

function acessoAdmin() {
    cliques++;

    if (cliques === 5) {
        window.location.href = "admin.html";
    }
}