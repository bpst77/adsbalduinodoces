document.addEventListener('DOMContentLoaded', function () {
  // Validação do formulário de contato
  const formContato = document.getElementById('formContato');

  if (formContato) {
    formContato.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = formContato.nome.value.trim();
      const nascimento = formContato.nascimento.value;
      const tipo = formContato.tipo.value; // apenas esta é necessária
      const email = formContato.email.value.trim();
      const telefone = formContato.telefone.value.trim();
      const assunto = formContato.assunto.value;
      const mensagem = formContato.mensagem.value.trim();
      const newsletter = formContato.newsletter.checked;

      const erros = [];

      if (!nome) erros.push("Nome é obrigatório.");
      if (!email.includes("@") || !email.includes(".")) erros.push("E-mail inválido.");
      if (!telefone.match(/^\d{10,11}$/)) erros.push("Telefone deve ter 10 ou 11 números.");
      if (!nascimento) erros.push("Data de nascimento é obrigatória.");
      if (!tipo) erros.push("Tipo de cliente deve ser selecionado.");
      if (!assunto) erros.push("Assunto deve ser selecionado.");
      if (!mensagem) erros.push("Mensagem é obrigatória.");

      if (erros.length > 0) {
        alert("Erros no formulário:\n\n" + erros.join("\n"));
        return;
      }

      let msg = "=== DADOS DO FORMULÁRIO ===\n\n";
      msg += `• Nome: ${nome}\n`;
      msg += `• E-mail: ${email}\n`;
      msg += `• Telefone: ${telefone}\n`;
      msg += `• Nascimento: ${nascimento}\n`;
      msg += `• Tipo: ${tipo}\n`;
      msg += `• Assunto: ${assunto}\n`;
      msg += `• Mensagem: ${mensagem}\n`;
      msg += `• Newsletter: ${newsletter ? "Sim " : "Não "}\n\n`;
      msg += "Obrigado pelo seu contato!";

      alert(msg);
    });
  }

  // Carregar dados da equipe
  const tabela = document.getElementById('tabelaEquipe');
  if (tabela) {
    fetch('tabela.json')
      .then(response => response.json())
      .then(dados => {
        const tbody = tabela.querySelector('tbody');
        dados.forEach(item => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${item.funcao}</td>
            <td>${item.responsavel}</td>
            <td>${item.desde}</td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar a tabela:', error);
      });
  }
});
