import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function HomePage() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Generador De Contraseña</title>
				<meta name="description" content="HomePage" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div class="contenedor">
				<main className={styles.main}>
					<h1 className={styles.title}>
						GENERADOR DE CONTRASEÑA
					</h1>
					<div class="result-container">
						<span id="result"></span>
						<button class="btn" id="clipboard">
							<i class="fa fa-clipboard" aria-hidden="true"></i>
							<img class="btn-large" src='https://img.icons8.com/material-rounded/24/000000/copy.png'></img>
						</button>
					</div>

					<div class="settings">
						<div class="setting">
							<label>Digitos</label>
							<input type="range" id="length" list="mydata" min='4' max='20' />
							<span id="cambioDigito">10</span>
						</div>
						<div class="setting">
							<label>Incluir letras mayúsculas</label>
							<input type="checkbox" id="uppercase" />

							<label>Incluir letras minúsculas</label>
							<input type="checkbox" id="lowercase" />
						</div>
						<div class="setting">
							<label>Incluir números</label>
							<input type="checkbox" id="numbers" />

							<label>Incluir simbolos</label>
							<input type="checkbox" id="symbols" />
						</div>
					</div>
					<button class="btn btn-large" id="generate">
						Generar contraseña
					</button>
					<div>
						<p class="Powered">
							Create by CamiJc ☺
						</p>

					</div>
				</main>
			</div>
		</div>
	)
}
if (typeof window !== 'undefined') {
	const resultEl = document.getElementById('result');
	const lengthEl = document.getElementById('length');
	const uppercaseEl = document.getElementById('uppercase');
	const lowercaseEl = document.getElementById('lowercase');
	const numbersEl = document.getElementById('numbers');
	const symbolsEl = document.getElementById('symbols');
	const generateEl = document.getElementById('generate');
	const clipboard = document.getElementById('clipboard');

	const randomFunc = {
		lower: getRandomLower,
		upper: getRandomUpper,
		number: getRandomNumber,
		symbol: getRandomSymbol
	}

	const length = document.querySelector("#length")
	const cambioDigito = document.querySelector("#cambioDigito")

	length.onchange = () => {
		cambioDigito.innerHTML = length.value
	}

	clipboard.addEventListener('click', () => {
		const textarea = document.createElement('textarea');
		const password = resultEl.innerText;

		if (!password) { return; }

		textarea.value = password;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		textarea.remove();
		alert('Password copied to clipboard');
	});

	generateEl.addEventListener('click', () => {
		const length = +lengthEl.value;
		const hasLower = lowercaseEl.checked;
		const hasUpper = uppercaseEl.checked;
		const hasNumber = numbersEl.checked;
		const hasSymbol = symbolsEl.checked;

		resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
	});

	function generatePassword(lower, upper, number, symbol, length) {
		let generatedPassword = '';
		const typesCount = lower + upper + number + symbol;
		const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

		if (typesCount === 0) {
			return '';
		}

		for (let i = 0; i < length; i += typesCount) {
			typesArr.forEach(type => {
				const funcName = Object.keys(type)[0];
				generatedPassword += randomFunc[funcName]();
			});
		}

		const finalPassword = generatedPassword.slice(0, length);

		return finalPassword;
	}

	function getRandomLower() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}

	function getRandomUpper() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
	}

	function getRandomNumber() {
		return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
	}

	function getRandomSymbol() {
		const symbols = '!@#$%^&*(){}[]=<>/,.'
		return symbols[Math.floor(Math.random() * symbols.length)];
	}
}
