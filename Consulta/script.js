 const form = document.getElementById('formConsulta');
    const tabela = document.getElementById('tabelaConsultas');

    function calcularValor(especialidade, retorno, urgente) {
      let base = 200; // valor base da consulta  - altere conforme a lógica de preço do novo tema
      if (especialidade === 'Ortopedia') base = 250;
      if (especialidade === 'Dermatologia') base = 220;
      if (retorno) base *= 0.5; // 50% de desconto para retorno
      if (urgente) base += 100; // acréscimo por urgência
      return base.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function salvarConsulta(e) {
      e.preventDefault();

      const paciente = document.getElementById('paciente').value;// pegue os dados dos inputs (renomeie se mudar o tema)
      const especialidade = document.getElementById('especialidade').value;
      const data = document.getElementById('data').value;
      const retorno = document.getElementById('retorno').checked;
      const urgente = document.getElementById('urgente').checked;
      const observacoes = [];
      if (retorno) observacoes.push('Retorno');
      if (urgente) observacoes.push('Urgente');

      const valor = calcularValor(especialidade, retorno, urgente);

      const nova = { paciente, especialidade, data, observacoes: observacoes.join(', '), valor };// objeto com os dados do agendamento
      let consultas = JSON.parse(localStorage.getItem('consultas')) || [];// altere 'consultas' para outro nome no novo tema
      const i = document.getElementById('indiceAtual').value;
      if (i) consultas[i] = nova;
      else consultas.push(nova);

      localStorage.setItem('consultas', JSON.stringify(consultas));
      form.reset();
      document.getElementById('indiceAtual').value = '';
      listarConsultas();
    }

    function listarConsultas() {
      const consultas = JSON.parse(localStorage.getItem('consultas')) || [];// altere 'consultas' para o nome que quiser
      tabela.innerHTML = '';
      consultas.forEach((c, i) => {
        tabela.innerHTML += `
          <tr>
            <td>${c.paciente}</td>
            <td>${c.especialidade}</td>
            <td>${c.data}</td>
            <td>${c.observacoes || '-'}</td>
            <td>${c.valor}</td>
            <td class="actions">
              <button onclick="editarConsulta(${i})">Editar</button>
              <button class="delete" onclick="excluirConsulta(${i})">Excluir</button>
            </td>
          </tr>
        `;
      });
    }

    function editarConsulta(i) {
      const c = JSON.parse(localStorage.getItem('consultas'))[i];
      document.getElementById('paciente').value = c.paciente;
      document.getElementById('especialidade').value = c.especialidade;
      document.getElementById('data').value = c.data;
      document.getElementById('retorno').checked = c.observacoes.includes('Retorno');
      document.getElementById('urgente').checked = c.observacoes.includes('Urgente');
      document.getElementById('indiceAtual').value = i;
    }

    function excluirConsulta(i) {
      let consultas = JSON.parse(localStorage.getItem('consultas'));
      consultas.splice(i, 1);
      localStorage.setItem('consultas', JSON.stringify(consultas));
      listarConsultas();
    }

    form.addEventListener('submit', salvarConsulta);
    window.addEventListener('load', listarConsultas);
