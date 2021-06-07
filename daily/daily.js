function prog1() {
	var a = +$('#in1-1').val();
	var r = +$('#in1-2').val();
	if (a && Math.abs(r) < 1) {
		$('#out1').html('` = ' + +(a / (1 - r)).toFixed(5) +'`');
	} else {
		$('#out1').empty();
	}
}

function prog2() {
	var a = +$('#in2-1').val();
	var r = +$('#in2-2').val();
	var n = +$('#in2-3').val();
	if (a && r && n) {
		var val;
		if (r != 1) {
			val = +(a * (1 - Math.pow(r, n))/(1 - r)).toFixed(5);
		} else {
			val = a * n;
		}
		$('#out2').html('` = ' + val + '`');
	} else {
		$('#out2').empty();
	}
}

function prog3() {
	var a = +$('#in3-1').val();
	var b = +$('#in3-2').val();
	var c = +$('#in3-3').val();
	var x, d = b * b - 4 * a * c;
	if (a) { // Ensure the equation is truly quadratic
		if (d == 0) { // Single real solution
			x = +(-b / (2 * a)).toFixed(5);
		} else if (d > 0) { // Two real solutions
			var x1 = (-b + Math.sqrt(d)) / (2 * a),
				x2 = (-b - Math.sqrt(d)) / (2 * a);
			x = +x1.toFixed(5) + ', ' + +x2.toFixed(5);
		} else { // Two complex solutions
			var r = -b / (2 * a),
				i = Math.sqrt(-d) / (2 * a);
			x = +r.toFixed(5) + ' \\pm ' + +i.toFixed(5) + 'i';
		}
		$('#out3').html('`x = ' + x + '`')
	} else {
		$('#out3').empty()
	}
}

function prog4() {
	function factor(n) { // Find smallest factor greater than 1, if one exists
		for (var d = 2; d <= Math.sqrt(n); d++)
			if (!(n % d))
				return d;
		return n;
	}
	function simplifyRadical(outer, inner, value, count, n) {
		return [outer * Math.pow(value, Math.floor(count / n)), // Handle the part that divides out cleanly
				inner * Math.pow(value, count % n)]; // The rest stays inside the radical
	}
	var c = +$('#in4-1').val(); // Coefficient
	var n = +$('#in4-2').val(); // Index
	var x = +$('#in4-3').val(); // Radicand
	if(n > 0 && x > 0) {
		var out, a = x ** (1 / n);
		if (c == 0)
			out = 0;
		else if (Math.round(a) ** n == x) // Already perfect power
			out = c * Math.round(a);
		else { // Non-perfect power
			var f = inner = outer = factorValue = factorCount = 1;
			while (x > 1) {
				f = factor(x); // Get factor
				if (factorValue == f) {// Factor is same as previous
					factorCount += 1;
					console.log(f, inner, outer, factorValue, factorCount, x);}
				else {
					[outer, inner] = simplifyRadical(outer, inner, factorValue, factorCount, n);
					factorCount = 1;
					factorValue = f;
					console.log(f, inner, outer, factorValue, factorCount, x);
				}
				x /= f;
			}
			[outer, inner] = simplifyRadical(outer, inner, factorValue, factorCount, n);
			lead = outer * c == 1 ? '' : outer * c
			index = n == 2 ? '' : '[' + n + ']'
			out = lead + '\\sqrt' + index + '{' + inner + '}';
		}
		$('#out4').html('` = ' + out + '`')
	} else {
		$('#out4').empty();
	}
}

/*
function dailyMath(n) {
	switch (n) {
		case 5:
			var a=parseFloat(document.getElementById('in').value);
			var b=parseFloat(document.getElementById('in2').value);
			if (a&&b) document.getElementById('out').innerHTML='`= '+(+((a**2+b**2)**.5).toFixed(5))+'^2`';
			break;
			
		case 6:
			function gcd(a,b,c=Math.min(a,b)) {
				while (a%c||b%c) c--;
				return c;
			}
			var a=parseFloat(document.getElementById('in').value);
			var b=parseFloat(document.getElementById('in2').value);
			if (a&&b) document.getElementById('out').innerHTML='`= '+gcd(a,b)+'`';
			break;
	}
	renderMathInElement(document.getElementById('out'),set);
}
*/

function daily() {
	set = {delimiters:[{left:"`", right:"`", display:false}]};
	renderMathInElement(document.getElementById('mathbox'), set);

	document.querySelectorAll("input").forEach(e => {
		e.addEventListener("input", () => {
			window[e.parentElement.dataset.func](); // Call the function stored as data-func in the parent
			renderMathInElement(e.parentElement, set) // Re-render the math involved
		})
	})
}

daily();
