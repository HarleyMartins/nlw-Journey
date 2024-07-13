const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format("DD"),
      semana: {
        curto: dayjs(data).format("ddd"),
        longo: dayjs(data).format("dddd"),
      },
    },
    mes: dayjs(data).format("MMMM"),
    hora: dayjs(data).format("HH:mm"),
  }
}

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

// atividades = []

// arrow function
const criarItemDeAtividade = (atividade) => {
  let input = `<input 
  onchange="concluirAtividade(event)"
  value="${atividade.data}"
  type="checkbox" `

  if (atividade.finalizada) {
    input += "checked"
  }

  input += ">"

  const formatar = formatador(atividade.data)

  return `
  <div class="card-bg>
    ${input}

    <div>
    <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
      <span>${atividade.nome}</span>
   </div>

    <time class="short">
      ${formatar.dia.semana.curto}.
      ${formatar.dia.numerico} <br>
      ${formatar.hora}
    </time>
    <time class="full">${formatar.dia.semana.longo}, dia ${formatar.dia.numerico} de ${formatar.mes}, às ${formatar.hora}h</time>
  </div>
  `
}

const atualizarLista = () => {
  const section = document.querySelector("section")
  section.innerHTML = ""
  // verifica se a lista está vazia
  if (atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
    return
  }

  for (let atividade of atividades) {
    section.innerHTML += criarItemDeAtividade(atividade)
  }
}

atualizarLista()

const salvarAtividade = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData(event.target)

  const nome = dadosDoFormulario.get("atividade")
  const dia = dadosDoFormulario.get("dia")
  const hora = dadosDoFormulario.get("hora")
  const data = `${dia} ${hora}`

  const novaAtividade = {
    nome,
    data,
    finalizada: false,
  }

  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data
  })

  if (atividadeExiste) {
    return alert("Dia/Hora não disponível")
  }

  atividades = [novaAtividade, ...atividades]
  atualizarLista()
}

const criarDiasSelecao = () => {
  const dias = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ]

  let diasSelecao = ""

  for (let dia of dias) {
    const formatar = formatador(dia)
    const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`
    diasSelecao += ` <option value="${dia}">${diaFormatado}</option> `
  }

  document.querySelector("select[name='dia']").innerHTML = diasSelecao
}
criarDiasSelecao()

const criarHorasSelecao = () => {
  let horasDisponiveis = ""

  for (let i = 6; i < 23; i++) {
    const hora = String(i).padStart(2, "0")
    horasDisponiveis += ` <option value="${hora}:00">${hora}:00</option> `
    horasDisponiveis += ` <option value="${hora}:15">${hora}:15</option> `
  }

  document.querySelector("select[name='hora']").innerHTML = horasDisponiveis
}

criarHorasSelecao()

const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value

  const atividade = atividades.find((atividade) => {
    return atividade.data == dataDesteInput
  })

  if (!atividade) {
    return
  }

  atividade.finalizada = !atividade.finalizada
}
