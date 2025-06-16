const form = document.getElementById('formAluno');
    const lista = document.getElementById('listaAlunos');

    function calcularNota(horas, curso, bolsa) {
      let base = parseInt(horas);
      if (curso === 'Back-End') base *= 1.1;
      if (curso === 'Full Stack') base *= 1.3;
      if (bolsa === 'Sim') base += 5;
      return Math.min(100, base).toFixed(1);
    }

    function salvarAluno(e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const curso = document.getElementById('curso').value;
      const horas = parseInt(document.getElementById('horas').value);
      const bolsa = document.getElementById('bolsa').value;
      const nota = calcularNota(horas, curso, bolsa);

      const novo = { nome, curso, horas, bolsa, nota };
      let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
      const i = document.getElementById('indiceAtual').value;
      if (i) alunos[i] = novo;
      else alunos.push(novo);
      localStorage.setItem('alunos', JSON.stringify(alunos));
      form.reset();
      document.getElementById('indiceAtual').value = '';
      listarAlunos();
    }

    function listarAlunos() {
      const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
      lista.innerHTML = '';
      alunos.forEach((a, i) => {
        lista.innerHTML += `
          <tr>
            <td>${a.nome}</td>
            <td>${a.curso}</td>
            <td>${a.horas}</td>
            <td>${a.bolsa}</td>
            <td>${a.nota}</td>
            <td class="actions">
              <button onclick="editarAluno(${i})">Editar</button>
              <button onclick="excluirAluno(${i})">Excluir</button>
            </td>
          </tr>`;
      });
    }

    function editarAluno(i) {
      const aluno = JSON.parse(localStorage.getItem('alunos'))[i];
      document.getElementById('nome').value = aluno.nome;
      document.getElementById('curso').value = aluno.curso;
      document.getElementById('horas').value = aluno.horas;
      document.getElementById('bolsa').value = aluno.bolsa;
      document.getElementById('indiceAtual').value = i;
    }

    function excluirAluno(i) {
      let alunos = JSON.parse(localStorage.getItem('alunos'));
      alunos.splice(i, 1);
      localStorage.setItem('alunos', JSON.stringify(alunos));
      listarAlunos();
    }

    form.addEventListener('submit', salvarAluno);
    window.addEventListener('load', listarAlunos);