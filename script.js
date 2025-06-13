document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formContato');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const dados = new FormData(form);
      let mensagem = "Dados enviados:\n";
      for (let [chave, valor] of dados.entries()) {
        mensagem += `${chave}: ${valor}\n`;
      }
      alert(mensagem);
    });
  }
});

function trocaProds(m) {
  let n;
  switch(m){
    case 1: n = "todos"; break; case 2: n = "brigs"; break;
    case 3: n = "bolos"; break; case 4: n = "finos"; break;
    case 5: n = "kits"; break; default: break;
  }

  fetch("dadosprods.json")
  .then(res => res.json())
  .then(dados => {
      for (let i = 0; i < 3; i+=1) {
      let h = String(i+1);
      const img = document.getElementById("pimg"+h);
      const titulo = document.getElementById("ptit"+h);
      const desc = document.getElementById("pdesc"+h);
      const prec = document.getElementById("pprec"+h);

      img.src = dados[n][i].link;
      titulo.textContent = dados[n][i].tit;
      desc.textContent = dados[n][i].desc;
      prec.textContent = dados[n][i].prec;
    }
  })
  
}