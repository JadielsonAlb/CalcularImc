const alturaInput = document.getElementById('altura');
const pesoInput = document.getElementById('peso');
const btnCalcular = document.getElementById('calcular');

alturaInput.addEventListener('input', function () {
  let v = this.value.replace(/[^0-9]/g, '');
  if (v.length > 4) v = v.slice(0, 4);
  if (v.length > 1) v = v[0] + ',' + v.slice(1);
  this.value = v;
});

pesoInput.addEventListener('input', function () {
  let v = this.value.replace(/[^0-9]/g, '');
  if (v.length > 5) v = v.slice(0, 5);
  if (v.length > 3) v = v.slice(0, 3) + ',' + v.slice(3);
  this.value = v;
});

function getColor(imc) {
  if (imc < 18.5) return '#60a5fa';
  if (imc < 25)   return '#19c99a';
  if (imc < 30)   return '#facc15';
  if (imc < 35)   return '#fb923c';
  if (imc < 40)   return '#f87171';
  return '#c026d3';
}

function calcularImc() {
  const nome      = document.getElementById('nome').value.trim();
  const genero    = document.getElementById('genero').value;
  const alturaRaw = alturaInput.value.replace(',', '.');
  const pesoRaw   = pesoInput.value.replace(',', '.');
  const alerta    = document.getElementById('alerta');
  const resultado = document.getElementById('resultado');

  alerta.textContent = '';

  if (!nome || !genero || !alturaRaw || !pesoRaw) {
    alerta.innerHTML = '<div class="alert">Preencha todos os campos!</div>';
    return;
  }

  const altura = parseFloat(alturaRaw);
  const peso   = parseFloat(pesoRaw);

  if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
    alerta.innerHTML = '<div class="alert">Valores inválidos. Verifique os campos.</div>';
    return;
  }

  const valorImc = peso / (altura * altura);
  const imcStr   = valorImc.toFixed(1).replace('.', ',');

  let classificacao = '';
  if      (valorImc < 18.5) classificacao = 'Abaixo do peso';
  else if (valorImc < 25)   classificacao = 'Peso ideal';
  else if (valorImc < 30)   classificacao = 'Levemente acima do peso';
  else if (valorImc < 35)   classificacao = 'Obesidade grau I';
  else if (valorImc < 40)   classificacao = 'Obesidade grau II';
  else                      classificacao = 'Obesidade mórbida';

  const cor    = getColor(valorImc);
  const artigo = genero === 'feminino' ? 'a' : 'o';

  resultado.classList.add('active');
  resultado.innerHTML = `
    <div class="imc-value" style="color:${cor}">${imcStr}</div>
    <div class="imc-label">Seu IMC</div>
    <div class="imc-class" style="background:${cor}20; color:${cor}">${classificacao}</div>
    <div class="name-line">${nome} está com ${classificacao.toLowerCase()}</div>
  `;
}

btnCalcular.addEventListener('click', calcularImc);