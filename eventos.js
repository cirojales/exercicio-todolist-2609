function atualizarQuantidade() {
  numeros.innerHTML = buscar().length;
}

function listarTarefas() {
  let conteudo = buscar()
    .sort((a, b) => a.titulo.localeCompare(b.titulo))
    .map(function (tarefa) {
      return `
        <div>
          <input type="checkbox"> 
          <span>${tarefa.titulo}</span>
          <span class="badge h1 
            ${tarefa.prioridade === "Baixa" && "bg-primary"} 
            ${tarefa.prioridade === "Média" && "bg-warning"} 
            ${tarefa.prioridade === "Alta" && "bg-danger"}">
            ${tarefa.prioridade}
          </span>
        </div>
      `;
    });

  tarefas.innerHTML = conteudo.join("");
}

function addTarefa() {
  event.preventDefault();

  let titulo = input_nova_tarefa.value;

  if (titulo.trim() === "") {
    alert("Tarefa inválida.");
    return;
  }

  let regex = new RegExp(`"titulo":"${titulo}"`, "i"); // se 'abc' já existe, 'ABC' não passa, e vice-versa
  if (regex.test(localStorage.tarefas)) {
    alert("Tarefa já existe.");
    return;
  }

  salvar(titulo, input_prioridade.value);

  input_nova_tarefa.value = "";

  listarTarefas();
  atualizarQuantidade();
}

listarTarefas();
atualizarQuantidade();