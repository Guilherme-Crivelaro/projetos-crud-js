const form = document.getElementById('formProduto');
    const tabela = document.getElementById('tabelaProdutos');

    function calcularTotal(qtd, preco) {
      const total = parseFloat(qtd) * parseFloat(preco);
      return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function salvarProduto(e) {
      e.preventDefault();
      const produto = document.getElementById('produto').value;
      const categoria = document.getElementById('categoria').value;
      const quantidade = parseInt(document.getElementById('quantidade').value);
      const valor = parseFloat(document.getElementById('valor').value);
      const total = calcularTotal(quantidade, valor);

      const novo = { produto, categoria, quantidade, valor, total };
      let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
      const i = document.getElementById('indiceAtual').value;
      if (i) produtos[i] = novo;
      else produtos.push(novo);
      localStorage.setItem('produtos', JSON.stringify(produtos));
      form.reset();
      document.getElementById('indiceAtual').value = '';
      listarProdutos();
    }

    function listarProdutos() {
      const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
      tabela.innerHTML = '';
      produtos.forEach((p, i) => {
        tabela.innerHTML += `
          <tr>
            <td>${p.produto}</td>
            <td>${p.categoria}</td>
            <td>${p.quantidade}</td>
            <td>R$ ${p.valor.toFixed(2)}</td>
            <td>${p.total}</td>
            <td class="actions">
              <button onclick="editarProduto(${i})">Editar</button>
              <button onclick="excluirProduto(${i})">Excluir</button>
            </td>
          </tr>`;
      });
    }

    function editarProduto(i) {
      const p = JSON.parse(localStorage.getItem('produtos'))[i];
      document.getElementById('produto').value = p.produto;
      document.getElementById('categoria').value = p.categoria;
      document.getElementById('quantidade').value = p.quantidade;
      document.getElementById('valor').value = p.valor;
      document.getElementById('indiceAtual').value = i;
    }

    function excluirProduto(i) {
      let produtos = JSON.parse(localStorage.getItem('produtos'));
      produtos.splice(i, 1);
      localStorage.setItem('produtos', JSON.stringify(produtos));
      listarProdutos();
    }

    form.addEventListener('submit', salvarProduto);
    window.addEventListener('load', listarProdutos);