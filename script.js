const shortInputs = document.querySelectorAll('.short-input')
const age = document.querySelector('.age')
const height = document.querySelector('.height')
const weight = document.querySelector('.weight')
const hours = document.querySelector('.hours')

const man = document.querySelector('.man')
const woman = document.querySelector('.woman')
const homo = document.querySelector('.homo')

const genders = [man, woman, homo]

const yes = document.querySelector('.yes')
const no = document.querySelector('.no')

const checkBtn = document.querySelector('.checkBtn')
const result = document.querySelector('.result')
const errorInfo = document.querySelector('.error')


const braun = document.querySelector('.braun')
const socialist = document.querySelector('.socialist')
const corona = document.querySelector('.corona')

const resultImg = document.querySelector('.result-img')

let newScore
let errors = 0

const countResult = () => {
	const kg = Number(weight.value)
	const cm = Number(height.value * 0.1)

	const bmiFirst = (kg / cm ** 2) * 100
	const bmi = bmiFirst.toFixed(2)

	const score = bmi - Number(hours.value) + Number(age.value) * 0.5



    

	if (yes.checked) {
		newScore = score - 9
	}


	if(age.value < 25 && yes.checked) {
		newScore = score + 0
	}

	if (newScore < 10.01 && newScore > 0) {
		result.textContent = 'Masz niewielkie szanse, żeby przeżyć covida'
	}
	if (newScore > 10.02 && newScore < 15) {
		result.textContent = 'Masz duże szanse, ciężko chorować na covid'
	}
	if (newScore > 15.01 && newScore < 28) {
		result.textContent = 'Twoje szanse na przechorowanie ciężko covida są średnie'
	}
	if (newScore > 28.01 && newScore < 35) {
		result.textContent = 'Twoje szanse na przechorowanie ciężko covida są niskie'
	}
	if (newScore > 35.01 && newScore < 43) {
		result.textContent = 'Twoje szanse na przechorowanie ciężko covida są średnie'
	}
	if (newScore > 43.01 && newScore < 50) {
		result.textContent = 'Masz duże szanse, ciężko chorować na covid'
	}
	if (newScore > 50.01 ) {
		result.textContent = 'Masz niewielkie szanse, żeby przeżyć covida'
	}

	if (no.checked) {
        newScore = 0
		resultImg.setAttribute('src', './img/niedzielski.jpg')
		result.textContent = 'Niedzielski jest zawiedziony. Zostałeś umówiony na szczepienia na jutro!'
	} else {
        resultImg.setAttribute('src', "")
        
    }

	if (braun.checked) {
		newScore = 20
		resultImg.setAttribute('src', './img/Grzegorz-Braun.jpg')
		result.textContent =
			'Możesz spać spokojnie. Braun ma cię pod opieką. Nigdy nie zarazisz się covidem. Z Panem Bogiem.'
	} 

	if (corona.checked) {
		newScore = -100
		result.textContent =
			'Szanse, że umrzesz na covid wynoszą: 100%. Polecamy dalej oglądać ścieki medialne takie jak TVP i TVN.'
		result.style.color = 'red'
	}
	if(socialist.checked) {
		newScore = -100
		result.textContent = 'Według lewackiej ideologii: każdy jest równy i taki sam, dlatego każdy zachoruje na covida, włącznie z tobą :)'
	}

	if (no.checked && corona.checked) {
		resultImg.setAttribute('src', '')
	}
    
	console.log(newScore.toFixed(2))
}
function onCheck() {
	if (yes.checked) {
		braun.disabled = true
		braun.checked = false
	} else {
		braun.disabled = false
	}
}

function unCheck() {
	if (braun.checked) {
		socialist.disabled = true
		corona.disabled = true
		socialist.checked = false
		corona.checked = false
	} else {
		socialist.disabled = false
		corona.disabled = false
	}
}

const walidateForm = e => {
	e.preventDefault()
    
	if (genders.some(gender => gender.checked)) {
		genders.forEach(gender => gender.nextElementSibling.classList.remove('activeP'))
	} else {
		genders.forEach(gender => gender.nextElementSibling.classList.add('activeP'))
		errors++
	}

    


	const yesNo = [yes, no]

	if (yesNo.some(answer => answer.checked)) {
		yesNo.forEach(answer => answer.nextElementSibling.classList.remove('activeP'))
	} else {
		yesNo.forEach(answer => answer.nextElementSibling.classList.add('activeP'))
		errors++
	}

	shortInputs.forEach(input => {
		if (input.value === '') {
			input.classList.add('active')
			errors++
		} else {
			input.classList.remove('active')
		}
	})

    showError()
	

	if (errors === 0  && age.value >= 18 && age.value <= 120 && height.value >= 50 && height.value <= 250 && weight.value >= 20 && weight.value <= 200 && hours.value <= 100) {
        countResult()
        checkBtn.innerHTML = 'Reset'
		checkBtn.classList.add('activeB')
	} 

	

    if(result.textContent.length > 1) {
        checkBtn.removeEventListener('click', walidateForm)
    }
 
    
    
}

const showError = () => {

	if(age.value < 18 || age.value >=120) {
		errorInfo.textContent = 'Minimalny wiek to 18, a maksymalny 120'
	} else if (height.value < 50 || height.value > 250) {
		errorInfo.textContent = 'Minimalny wzrost to 50, a maksymalny 250'
	} else if (weight.value < 20 || weight.value > 200) {
		errorInfo.textContent = 'Minimalna waga to 20, a maksymalna 200'
	} else if (hours.value > 100) {
		errorInfo.textContent = 'Maksymalna liczba godzin to 100'
	}else {
		errorInfo.textContent = ''
	}

	
}

checkBtn.addEventListener('click', walidateForm)
