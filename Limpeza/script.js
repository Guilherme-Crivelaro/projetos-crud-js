const form = document.getElementById('formServico');
    const tabela = document.getElementById('tabelaServicos');

    function calcularPreco(tipo, comodos, extras) {
      let base = comodos * 40; // R$40 por cômodo padrão residencial

      if (tipo === 'Comercial') base *= 1.2; //aumenta 20%
      if (tipo === 'Pós-Obra') base *= 1.5; //aumenta 50%

      if (extras.includes('Vidros')) base += comodos * 10; //10 reais por comodo
      if (extras.includes('Carpetes')) base += comodos * 15; //15 reais por comodo

      return base.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function salvarServico(e) {
      e.preventDefault();
                                                                //mudar tema, como consulta medica
      const cliente = document.getElementById('cliente').value; //paciente
      const tipo = document.getElementById('tipo').value;  //especialidade
      const comodos = parseInt(document.getElementById('comodos').value); // quantidade
      const extras = [];
      if (document.getElementById('vidros').checked) extras.push('Vidros');
      if (document.getElementById('carpete').checked) extras.push('Carpetes');

      const total = calcularPreco(tipo, comodos, extras);
      const novo = { cliente, tipo, comodos, extras: extras.join(', '), total };

      let servicos = JSON.parse(localStorage.getItem('servicos')) || [];
      const i = document.getElementById('indiceAtual').value;
      if (i) servicos[i] = novo;
      else servicos.push(novo);

      localStorage.setItem('servicos', JSON.stringify(servicos));
      form.reset();
      document.getElementById('indiceAtual').value = '';
      listarServicos();
    }

    function listarServicos() {
      const servicos = JSON.parse(localStorage.getItem('servicos')) || [];
      tabela.innerHTML = '';
      servicos.forEach((s, i) => {
        tabela.innerHTML += `
          <tr>
            <td>${s.cliente}</td>
            <td>${s.tipo}</td>
            <td>${s.comodos}</td>
            <td>${s.extras || '-'}</td>
            <td>${s.total}</td>
            <td class="actions">
              <button onclick="editarServico(${i})">Editar</button>
              <button class="delete" onclick="excluirServico(${i})">Excluir</button>
            </td>
          </tr>
        `;
      });
    }

    function editarServico(i) {
      const s = JSON.parse(localStorage.getItem('servicos'))[i];
      document.getElementById('cliente').value = s.cliente;
      document.getElementById('tipo').value = s.tipo;
      document.getElementById('comodos').value = s.comodos;
      document.getElementById('vidros').checked = s.extras.includes('Vidros');
      document.getElementById('carpete').checked = s.extras.includes('Carpetes');
      document.getElementById('indiceAtual').value = i;
    }

    function excluirServico(i) {
      let servicos = JSON.parse(localStorage.getItem('servicos'));
      servicos.splice(i, 1);
      localStorage.setItem('servicos', JSON.stringify(servicos));
      listarServicos();
    }

    form.addEventListener('submit', salvarServico);
    window.addEventListener('load', listarServicos);