// -------------------------------------------------- //
// Array de objetos (usuários)
const users = [
  {
    id: Math.random().toString(36).substr(2, 9),
    nome: "Davi",
    senha: 123
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    nome: "Bianca",
    senha: 666
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    nome: "Cainã",
    senha: 789
  }
]

// Salva os usuários no localStorage
localStorage.setItem("users", JSON.stringify(users));

// -------------------------------------------------- //
// Função para logar um novo usuário
function login() {

  // Dados do formulário
  let nome = document.getElementById("nome").value;
  let senha = document.getElementById("senha").value;

  // Recupera os usuários do localStorage
  let users = JSON.parse(localStorage.getItem("users"));

  // Verifica se o usuário existe
  let user = users.find(user => user.nome.toLowerCase() == nome.toLowerCase() && user.senha == senha)
  if (user) {
    window.location.href = "inicial.html?id=" + user.id;
  } else {
    alert("Usuário não encontrado!");
  }
}