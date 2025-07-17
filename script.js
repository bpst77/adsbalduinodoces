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

  //filtro dos botões
  document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelector('.category-btn.active').classList.remove('active');
        this.classList.add('active');
        
        // Aqui iria a lógica para filtrar os produtos
        let n;
        switch(this.id){
        case "prod-btn1": n = "todos"; break; case "prod-btn2": n = "brigs"; break;
        case "prod-btn3": n = "bolos"; break; case "prod-btn4": n = "finos"; break;
        case "prod-btn5": n = "kits"; break; default: break;
        }

        fetch("dadosprods.json")
        .then(res => res.json())
        .then(dados => {
          for (let i = 0; i < 3; i+=1) {
          let h = String(i+1);
          const prod = document.querySelector(".prod"+h)
          const img = prod.querySelector(".product-img");
          const tit = prod.querySelector(".product-title");
          const desc = prod.querySelector(".text-muted");
          const prec = prod.querySelector(".price-tag");

          img.src = dados[n][i].link;
          tit.textContent = dados[n][i].tit;
          desc.textContent = dados[n][i].desc;
          prec.textContent = dados[n][i].prec;
          }
        })
      });
    });

    //filtro dos botões
    const sbrText = document.querySelector('.sbr-text');

    if (sbrText){

      document.querySelectorAll('.sbr-text-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        let top1 = document.querySelector('.tpc1')
        let top2 = document.querySelector('.tpc2')
        let top3 = document.querySelector('.tpc3')

        switch(this.id){
        case "tpc-sbr":
        top1.style.display = "block"
        top2.style.display = "none"
        top3.style.display = "none"
        break;

        case "tpc-hist":
        top1.style.display = "none"
        top2.style.display = "block"
        top3.style.display = "none"
        break;

        case "tpc-pol": 
        top1.style.display = "none"
        top2.style.display = "none"
        top3.style.display = "block"
        break; 
        }
      });
    });
    }
});
