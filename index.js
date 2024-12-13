// Pega o ano atual
const currentYear = new Date().getFullYear();

// Insere o ano atual no elemento de copyright
document.getElementById('copyright').innerHTML = `&copy; ${currentYear} EcoAventureiros. Todos os direitos reservados.`;