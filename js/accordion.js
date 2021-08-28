const accordionBtn = document.querySelectorAll('.accordionTitle');
const allTexts = document.querySelectorAll('.text');
const accIcon = document.querySelectorAll('.accIcon');

accordionBtn.forEach(function(el) {
	el.addEventListener('click', toggleAccordion)
});

function toggleAccordion(el) {
	const targetText = el.currentTarget.nextElementSibling.classList;
	const targetAccIcon = el.currentTarget.children[0];
	const target = el.currentTarget;

	if (targetText.contains('show')) {
		targetText.remove('show');
		targetAccIcon.classList.remove('anime');
		target.classList.remove('accordionTitleActive');
	} else {
		accordionBtn.forEach(function(el) {
			el.classList.remove('accordionTitleActive');
			allTexts.forEach(function(el) {
				el.classList.remove('show');
			})
			accIcon.forEach(function(el) {
				el.classList.remove('anime');
			})
		})
		targetText.add('show');
		target.classList.add('accordionTitleActive');
		targetAccIcon.classList.add('anime');
	}
}

function formButton() {
	alert("Data has been sent");
}