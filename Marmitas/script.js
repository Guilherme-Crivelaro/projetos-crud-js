 const form = document.getElementById('formPedido');
    const tabela = document.getElementById('tabelaPedidos');

    function calcularValor(tipo, quantidade, restricoes) {
      let valor = quantidade * 25;
      if (tipo === 'Vegetariana') valor *= 0.9;
      if (restricoes.length > 0) valor += quantidade * 5;
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function salvarPedido(e) {
      e.preventDefault();

      const cliente = document.getElementById('cliente').value;
      const tipo = document.getElementById('tipo').value;
      const quantidade = parseInt(document.getElementById('quantidade').value);
      const gluten = document.getElementById('gluten').checked;
      const lactose = document.getElementById('lactose').checked;
      const restricoes = [];
      if (gluten) restricoes.push("Sem glúten");
      if (lactose) restricoes.push("Sem lactose");

      const valor = calcularValor(tipo, quantidade, restricoes);
      const novo = { cliente, tipo, quantidade, restricoes: restricoes.join(", "), valor };

      let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
      const index = document.getElementById('indexAtual').value;
      if (index) {
        pedidos[index] = novo;
      } else {
        pedidos.push(novo);
      }
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
      form.reset();
      document.getElementById('indexAtual').value = '';
      listarPedidos();
    }

    function listarPedidos() {
      const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
      tabela.innerHTML = '';
      pedidos.forEach((p, i) => {
        tabela.innerHTML += `
          <tr>
            <td>${p.cliente}</td>
            <td>${p.tipo}</td>
            <td>${p.quantidade}</td>
            <td>${p.restricoes || '-'}</td>
            <td>${p.valor}</td>
            <td class="actions">
              <button onclick="editarPedido(${i})">Editar</button>
              <button class="delete" onclick="excluirPedido(${i})">Excluir</button>
            </td>
          </tr>
        `;
      });
    }

    function editarPedido(i) {
      const pedido = JSON.parse(localStorage.getItem('pedidos'))[i];
      document.getElementById('cliente').value = pedido.cliente;
      document.getElementById('tipo').value = pedido.tipo;
      document.getElementById('quantidade').value = pedido.quantidade;
      document.getElementById('gluten').checked = pedido.restricoes.includes("glúten");
      document.getElementById('lactose').checked = pedido.restricoes.includes("lactose");
      document.getElementById('indexAtual').value = i;
    }

    function excluirPedido(i) {
      let pedidos = JSON.parse(localStorage.getItem('pedidos'));
      pedidos.splice(i, 1);
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
      listarPedidos();
    }

    form.addEventListener('submit', salvarPedido);
    window.addEventListener('load', listarPedidos);