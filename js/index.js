// object
const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true,
}

// array de atividades

let atividades = [
  atividade,
  {
    nome: "Academia em grupo",
    data: new Date("2024-07-09 12:00"),
    finalizada: false,
  },

  atividade,
  {
    nome: "Gaming Session",
    data: new Date("2024-07-09 16:00"),
    finalizada: true,
  },
]

atividades = []

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
for (let atividade of atividades) {
  section.innerHTML += criarItemDeAtividade(atividade)
}
