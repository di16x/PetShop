
const formFilhote = document.getElementById('forms');
formFilhote.onsubmit = validarCampos;
const enderecoAPI = 'http://localhost:4000/filhote';



buscarTodosFilhotes();

var motivoAcao = "CADASTRAR";

function gravarFilhote(){
    const objetoFilhote = {
        id: document.getElementById('id').value,
        especie: document.getElementById('especie').value,
        raça: document.getElementById('raça').value
        
        
    }

    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoFilhote)
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

function selecionarFilhote(id, especie, raça, motivo) {

   
    document.getElementById('id').value = nome;
    document.getElementById('especie').value = sigla;
    document.getElementById('raça').value = num_registro;
   

    motivoAcao = motivo;
    const botaoConfirmar = document.getElementById('botaoConfirmar1');
    if (motivoAcao == 'EDITAR') {
        botaoConfirmar.innerHTML = 'EDITAR';
    }
    else if (motivoAcao == 'EXCLUIR') {
        botaoConfirmar.innerHTML = 'EXCLUIR';
    }


}

function excluirFilhote(){

    fetch(enderecoAPI, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: document.getElementById('id').value})
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

function atualizarFilhote(){

    const objetoFilhote = {
        id: document.getElementById('id').value,
        especie: document.getElementById('especie').value,
        raça: document.getElementById('raça').value,
    }

    fetch(enderecoAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoFilhote)
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

function buscarTodosFilhotes(){
    fetch(enderecoAPI, {method:'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirTabelaFilhotes(respostaAPI.listaFilhotes);
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
    
    const id     = document.getElementById('id').value;
    const especie = document.getElementById('especie').value;
    const raça   = document.getElementById('raça').value;
  

    
    evento.stopPropagation();
    evento.preventDefault();

    if (id && especie && raça) {
        if (motivoAcao == "CADASTRAR"){
            gravarFilhote();
        }
        else if (motivoAcao == "EDITAR"){
            atualizarFilhote();
            motivoAcao = "CADASTRAR";
        }
        else if (motivoAcao == "EXCLUIR"){
            excluirFilhote();
            motivoAcao = "CADASTRAR";
        }
        
        formFilhote.reset();
        buscarTodosFilhotes();
        return true;
    }
    else{
        exibirMensagem('Por favor, preencha todos os campos do formulário.');
        return false;
    }
}


function exibirMensagem(mensagem, cor = 'green') {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = "<p style='color: " + cor + ";'>" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}


function exibirTabelaFilhotes(listaFilhotes){
    if (listaFilhotes.length > 0) {
        const espacoTabela = document.getElementById('containerTabela');
        const tabela = document.createElement('table');
        tabela.classList="table table-striped table-hover";
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>ID</th>
                <th>ESPECIE</th>
                <th>RACA</th>
                <th>Ações</th>
            </tr>
        `;
        const corpo = document.createElement('tbody');
        for (const filhote of listaFilhotes) {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                
                <td>${filhote.id}</td>
                <td>${filhote.especie}</td>
                <td>${filhote.raça}</td>
               
               
                <td>
                    <button onclick="selecionarFilhote('${filhote.id}','${filhote.especie}','${filhote.raça}','EDITAR')">Alterar</button>
                    <button onclick="selecionarFilhote('${filhote.id}','${filhote.especie}','${filhote.raça}','EXCLUIR')">Excluir</button>
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