// object
const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true,
}

// arrow function
const criarItemDeAtividade = (atividade) => {
  let input = `<input type="checkbox" `

  if (atividade.finalizada) {
    input += "checked"
  }

  input += ">"

  return `
  <div>
    ${input}
    <span>${atividade.nome}</span>
    <time>${atividade.data}</time>
  </div>
  `
}

const section = document.querySelector("section")
section.innerHTML = criarItemDeAtividade(atividade)
