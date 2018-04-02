var keys = document.querySelectorAll('span');
var operators = ['+', '-', '÷', 'x'];
var decimalAdded = false;

for (var i = 0; i < keys.length; i++) {
	keys[i].onclick = function (e) {

		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
		var total;

		if (btnVal === 'C') {
			input.innerHTML = '';
			decimalAdded = false;
		}	
		else if (btnVal === '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];

			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
			
			if (lastChar === '.' || operators.indexOf(lastChar) > -1)
				equation = equation.replace('/.$/', '');

			if (equation) {

				total = eval(equation);
				if (total.toString().indexOf('.') != -1)
					total = total.toFixed(2);

				input.innerHTML = total;
			}

			decimalAdded = false;
		} 
		else if (operators.indexOf(btnVal) > -1) {

			var lastChar = inputVal[inputVal.length - 1];

			if (inputVal != '' && operators.indexOf(lastChar) === -1) 
				input.innerHTML += btnVal;

			else if (inputVal === '' && btnVal === '-')
				input.innerHTML += btnVal;

			if (operators.indexOf(lastChar) > -1 && inputVal.length > 1)
				input.innerHTML = inputVal.replace(/.$/, btnVal);

			decimalAdded = false;
		}
		else if (btnVal === '.') {
			if (!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}
		else {
			var lastChar = inputVal[inputVal.length - 1];
			var prevLastChar = inputVal[inputVal.length - 2];

			console.log(prevLastChar);

			if (lastChar === '0' && typeof prevLastChar === 'undefined')
				input.innerHTML = btnVal;
			else if (operators.indexOf(prevLastChar) > -1 && lastChar === '0')
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			else
				input.innerHTML += btnVal;
		}
	}
}