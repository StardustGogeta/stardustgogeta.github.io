/*
function dailyMath(n) {
	switch (n) {
		case 3:
			var a = parseFloat(document.getElementById('in').value);
			var b = parseFloat(document.getElementById('in2').value);
			var c = parseFloat(document.getElementById('in3').value);
			if(!(isNaN(a)||isNaN(b)||isNaN(c))) {
				var x1, x2, i, r, d = b*b-4*a*c;
				if(d>=0) {
					x1=(-b+Math.sqrt(d))/2/a;
					x2=(-b-Math.sqrt(d))/2/a;
					document.getElementById('out').innerHTML='`x = '+(+x1.toFixed(5)).toString()+', '+(+x2.toFixed(5)).toString()+'`';
				}
				else {
					r=-b/2/a;
					i=Math.sqrt(-d)/2/a;
					document.getElementById('out').innerHTML='`x = '+(+r.toFixed(5)).toString()+' \\pm '+(+i.toFixed(5)).toString()+'i`';
				}
			}
			break;
			
		case 4:
			function f(n) {
				for(var d=2;d<=Math.sqrt(n);d++) if (!(n%d)) return d;
				return n;
			}
			function e(a,b,c,d,e) {return [a*Math.pow(c,Math.floor(d/e)),b*Math.pow(c,d%e)];}
			var x=parseFloat(document.getElementById('in').value);
			var n=parseFloat(document.getElementById('in2').value);
			var y=parseFloat(document.getElementById('in3').value);
			if(x&&n>0&&y>0) {
				var a=y**(1/n);
				if(a%1==0)
					document.getElementById('out').innerHTML='` = '+(a*x).toString()+'`';
				else {
					var b,i=o=fV=fC=[1];
					while(y>1) {
						b=f(y);
						if(fV==b) fC+=1;
						else{a=e(o,i,fV,fC,n);fC=1;fV=b;o=a[0],i=a[1];}
						y/=b;
					}
					a=e(o,i,fV,fC,n);
					document.getElementById('out').innerHTML='`= '+(a[0]*x).toString()+'\\sqrt'+(n==2?'':'['+n.toString()+']')+'{'+a[1].toString()+'}`';
				}
			}
			break;
		
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
