function limpa_formulario_cep() {
    // Limpa valores do formulário de CEP.
    document.getElementById('endereco').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        // Atualiza os campos com os valores da API.
        document.getElementById('endereco').value = conteudo.logradouro;
        document.getElementById('bairro').value = conteudo.bairro;
        document.getElementById('cidade').value = conteudo.localidade;
        document.getElementById('uf').value = conteudo.uf;
    } else {
        // CEP não encontrado.
        limpa_formulario_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    // Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    // Verifica se campo CEP possui valor informado.
    if (cep != "") {
        // Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        // Valida o formato do CEP.
        if (validacep.test(cep)) {
            // Preenche os campos com "..." enquanto consulta o webservice.
            document.getElementById('endereco').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            // Cria um elemento javascript.
            var script = document.createElement('script');

            // Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            // Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

            // Remove o script após carregar.
            script.onload = function() {
                document.body.removeChild(script);
            };
        } else {
            // CEP é inválido.
            limpa_formulario_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        // CEP sem valor, limpa formulário.
        limpa_formulario_cep();
    }
}

// Adiciona o evento ao formulário para buscar o CEP ao enviar.
document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
    pesquisacep(document.getElementById('cep').value);
});
