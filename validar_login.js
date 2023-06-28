
// Recupera o id do usuário que está na URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

// Recupera os usuários do localStorage
let users = JSON.parse(localStorage.getItem("users"));

// Verifica se o usuário existe
if (!users) {
  window.location.href = "index.html";
}

// Verifica se o usuário está logado
let user = users.find(user => user.id == id);
if (!user) {
  window.location.href = "index.html";
}