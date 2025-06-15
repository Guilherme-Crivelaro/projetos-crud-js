const form = document.getElementById('formOrcamento');
    const tabela = document.getElementById('tabelaOrcamentos');

    function calcularOrcamento(servico, area, mensal) {
      let preco = area * 10;
      if (servico === 'Plantio') preco *= 1.2;
      if (servico === 'Manutenção Completa') preco *= 1.5;
      if (mensal === 'Sim') preco += 100;
      return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function salvarOrcamento(e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value;
      const area = parseFloat(document.getElementById('area').value);
      const servico = document.getElementById('servico').value;
      const mensal = document.getElementById('mensal').value;
      const index = document.getElementById('indexAtual').value;

      const total = calcularOrcamento(servico, area, mensal);
      const novo = { nome, servico, area, mensal, total };

      let orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];
      if (index) {
        orcamentos[index] = novo;
      } else {
        orcamentos.push(novo);
      }
      localStorage.setItem('orcamentos', JSON.stringify(orcamentos));
      form.reset();
      document.getElementById('indexAtual').value = '';
      listarOrcamentos();
    }

    function listarOrcamentos() {
      const orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];
      tabela.innerHTML = '';
      orcamentos.forEach((o, i) => {
        tabela.innerHTML += `
          <tr>
            <td>${o.nome}</td>
            <td>${o.servico}</td>
            <td>${o.area}</td>
            <td>${o.mensal}</td>
            <td>${o.total}</td>
            <td class="actions">
              <button onclick="editarOrcamento(${i})">Editar</button>
              <button class="delete" onclick="excluirOrcamento(${i})">Excluir</button>
            </td>
          </tr>
        `;
      });
    }

    function editarOrcamento(i) {
      const orcamento = JSON.parse(localStorage.getItem('orcamentos'))[i];
      document.getElementById('nome').value = orcamento.nome;
      document.getElementById('area').value = orcamento.area;
      document.getElementById('servico').value = orcamento.servico;
      document.getElementById('mensal').value = orcamento.mensal;
      document.getElementById('indexAtual').value = i;
    }

    function excluirOrcamento(i) {
      let orcamentos = JSON.parse(localStorage.getItem('orcamentos'));
      orcamentos.splice(i, 1);
      localStorage.setItem('orcamentos', JSON.stringify(orcamentos));
      listarOrcamentos();
    }

    form.addEventListener('submit', salvarOrcamento);
    window.addEventListener('load', listarOrcamentos);