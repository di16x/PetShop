
const formInteressado = document.getElementById('forms');
formInteressado.onsubmit = validarCampos;
const enderecoAPI = 'http://localhost:4000/interessado';



buscarTodosInteressados();

var motivoAcao = "CADASTRAR";

function gravarInteressado(){
    const objetoInteressado = {
        id:document.getElementById('id').value,
        cpf:document.getElementById('cpf').value,
        nome: document.getElementById('nome_interessado').value,
        telefone: document.getElementById('tel').value,
        email: document.getElementById('Email').value
        
    }

    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoInteressado)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
    }).catch((erro) => {
        exibirMensagem(erro, 'red');
    });

}

function selecionarInteressado(id, cpf, nome, telefone, email, motivo) {

   
    document.getElementById('id').value,
    document.getElementById('cpf').value,
    document.getElementById('nome_interessado').value,
    document.getElementById('tel').value,
    document.getElementById('Email').value
   

    motivoAcao = motivo;
    const botaoConfirmar = document.getElementById('botaoConfirmar1');
    if (motivoAcao == 'EDITAR') {
        botaoConfirmar.innerHTML = 'EDITAR';
    }
    else if (motivoAcao == 'EXCLUIR') {
        botaoConfirmar.innerHTML = 'EXCLUIR';
    }


}

function excluirInteressado(){

    fetch(enderecoAPI, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({num_registro: document.getElementById('id').value})
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
    }).catch((erro) => {
        exibirMensagem(erro, 'green');
    });
}

function atualizarInteressado(){

    const objetoInteressado = {
        id:document.getElementById('id').value,
        cpf:document.getElementById('cpf').value,
        nome: document.getElementById('nome_interessado').value,
        telefone: document.getElementById('tel').value,
        email: document.getElementById('Email').value
    }

    fetch(enderecoAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoInteressado)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, 'yellow');
    });

}

function buscarTodosInteressados(){
    fetch(enderecoAPI, {method:'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirTabelaInteressados(respostaAPI.listaInteressados);
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    })
    .catch((erro) => {
        exibirMensagem(erro, 'yellow');
    });
}

function validarCampos(evento){
    
    document.getElementById('id').value,
    document.getElementById('cpf').value,
    document.getElementById('nome_interessado').value,
    document.getElementById('tel').value,
    document.getElementById('Email').value
  

    
    evento.stopPropagation();
    evento.preventDefault();

    if (id && cpf && nome && telefone && email) {
        if (motivoAcao == "CADASTRAR"){
            gravarInteressado();
        }
        else if (motivoAcao == "EDITAR"){
            atualizarInteressado();
            motivoAcao = "CADASTRAR";
        }
        else if (motivoAcao == "EXCLUIR"){
            excluirInteressado();
            motivoAcao = "CADASTRAR";
        }
        
        formInteressado.reset();
        buscarTodosInteressados();
        return true;
    }
    else{
        exibirMensagem('Por favor, preencha todos os campos do formulário.');
        return false;
    }
}


function exibirMensagem(mensagem, cor = 'greem') {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = "<p style='color: " + cor + ";'>" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}


function exibirTabelaInteressados(listaInteressados){
    if (listaInteressados.length > 0) {
        const espacoTabela = document.getElementById('containerTabela');
        const tabela = document.createElement('table');
        tabela.classList="table table-striped table-hover";
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>ID</th>
                <th>CPF</th>
                <th>NOME</th>
                <th>TELEFONE</th>
                <th>EMAIL</th>
                <th>Ações</th>
            </tr>
        `;
        const corpo = document.createElement('tbody');
        for (const interessado of listaInteressados) {
            const linha = document.createElement('tr');
            linha.innerHTML = `

                <td>${interessado.id}</td>
                <td>${interessado.cpf}</td>
                <td>${interessado.nome}</td>
                <td>${interessado.telefone}</td>
                <td>${interessado.email}</td>
               
               
                <td>
                    <button onclick="selecionarInteressado('${interessado.id}','${interessado.cpf}','${interessado.nome}','${interessado.telefone}','${interessado.email}','EDITAR')">Alterar</button>
                    <button onclick="selecionarInteressados('${interessado.id}','${interessado.cpf}','${interessado.nome}','${interessado.telefone}','${interessado.email}','EXCLUIR')">Excluir</button>
                </td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        espacoTabela.innerHTML="";
        espacoTabela.appendChild(tabela);
    }
    else{
        exibirMensagem('Nenhum item encontrado.');
    }
    


}