const preguntas = [
  { t: "¿Qué lenguaje define el comportamiento de una página web?", o: ["HTML", "CSS", "JavaScript", "JSON"], c: 2, x: "HTML da estructura, CSS da estilo y JavaScript define el comportamiento." },
  { t: "¿Por qué un cambio de DNS puede tardar hasta 48 horas en verse en todo el mundo?", o: ["Porque hay que reiniciar el navegador", "Por la propagación DNS: los servidores guardan la respuesta anterior hasta que vence su TTL", "Porque hay que comprar otro dominio", "Porque cambia el TLD"], c: 1, x: "Cada servidor guarda la respuesta anterior hasta que vence su TTL; ese reparto gradual es la propagación." },
  { t: "Verdadero o falso: el evento mouseover se activa cuando el cursor pasa sobre un elemento.", o: ["Verdadero", "Falso"], c: 0, x: "Es el evento de hover. Se conecta a una función con addEventListener." },
  { t: "¿Qué símbolo es la función principal de jQuery?", o: ["#", "$", "@", "%"], c: 1, x: "Con $ se selecciona un elemento y se le aplica una acción, por ejemplo $('#caja').hide()." },
  { t: "Verdadero o falso: hoy es obligatorio usar jQuery para manipular el DOM.", o: ["Verdadero", "Falso"], c: 1, x: "Falso. JavaScript moderno ofrece querySelector, classList y fetch, así que jQuery ya no es necesario." },
  { t: "¿Qué método de jQuery abre y cierra un elemento con un deslizamiento?", o: ["fadeIn", "hide", "slideToggle", "addClass"], c: 2, x: "slideToggle alterna entre mostrar y ocultar deslizando el elemento." },
  { t: "En JSON, ¿cómo deben escribirse las claves?", o: ["Sin comillas", "Con comillas simples", "Con comillas dobles", "Entre paréntesis"], c: 2, x: "JSON exige comillas dobles en claves y textos." },
  { t: "¿Qué hace JSON.parse?", o: ["Convierte un objeto en texto", "Convierte una cadena JSON en un objeto", "Envía datos al servidor", "Borra un objeto"], c: 1, x: "parse convierte texto JSON en un objeto de JavaScript; stringify hace lo contrario." },
  { t: "Con un repositorio de GitHub conectado a Vercel, ¿qué ocurre al hacer git push?", o: ["Nada hasta pagar el dominio", "Vercel despliega el sitio de nuevo automáticamente", "El repositorio se borra", "El sitio pasa a ser privado"], c: 1, x: "Vercel detecta el push y publica la nueva versión sin pasos manuales." },
  { t: "En tienda.cuddleme.com, ¿cuál es el TLD?", o: [".com", "cuddleme", "tienda", ".tienda.cuddleme"], c: 0, x: "El TLD es el final del dominio (.com). 'tienda' es el subdominio y 'cuddleme' el nombre del dominio." }
];
const cont = document.getElementById('quiz'), res = document.getElementById('resultado'), otra = document.getElementById('reiniciar');
let aciertos = 0, hechas = 0;

function pintar() {
  aciertos = 0; hechas = 0; res.hidden = true; otra.hidden = true; cont.innerHTML = '';
  preguntas.forEach(function (p, i) {
    const f = document.createElement('fieldset'); f.className = 'q';
    f.innerHTML = '<legend>' + (i + 1) + '. ' + p.t + '</legend>' +
      p.o.map(function (txt, j) { return '<label><input type="radio" name="p' + i + '" value="' + j + '"> ' + txt + '</label>'; }).join('') +
      '<p class="fb" aria-live="polite"></p>';
    f.addEventListener('change', function (ev) {
      const elegida = Number(ev.target.value), labels = f.querySelectorAll('label');
      f.querySelectorAll('input').forEach(function (r) { r.disabled = true; });
      labels[p.c].classList.add('right');
      const ok = elegida === p.c;
      if (!ok) labels[elegida].classList.add('wrong');
      f.querySelector('.fb').textContent = (ok ? 'Correcto. ' : 'Incorrecto. ') + p.x;
      if (ok) aciertos++;
      hechas++;
      if (hechas === preguntas.length) {
        res.textContent = 'Tu resultado: ' + aciertos + ' de ' + preguntas.length;
        res.hidden = false; otra.hidden = false;
      }
    });
    cont.appendChild(f);
  });
}
otra.addEventListener('click', function () { pintar(); window.scrollTo(0, 0); });
pintar();