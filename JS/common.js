function chess(d) {
	stats = d.match(/\d+/g);
	document.getElementById('bullet').innerHTML = stats[1];
	document.getElementById('blitz').innerHTML = stats[2];
	document.getElementById('rapid').innerHTML = stats[5];
	document.getElementById('tactics').innerHTML = stats[0];
};
		
function fetchData() {
	fetch('https://www.reddit.com/user/StardustGogeta/about.json').then(r=>r.json()).then(body => {
		document.getElementById('karma1').innerHTML = body.data.link_karma;
		document.getElementById('karma2').innerHTML = body.data.comment_karma;
	});
	fetch("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20htmlstring%20where%20url%3D%27https%3A%2F%2Fwww.chess.com%2Fstats%2Flive%2Fstardustgogeta%27%20and%20xpath%3D%22%2F%2Fspan%5B%40class%3D%27user-rating%27%5D%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
	.then(r=>r.text()).then(body => chess(JSON.parse(body).query.results.result));
	fetch("https://api.stackexchange.com/2.2/users/5732397?site=stackoverflow").then(r=>r.json())
	.then(body => document.getElementById('SOrep').innerHTML = body.items[0].reputation);
}

function fold(n) {
	e = document.getElementById(n);
	c = e.style.height == '';
	e.style.fontSize = c ? '1.25em' : '';
	e.style.padding = c ? '.125em' : '';
	e.style.height = c ? '5%' : '';
}

function dailyMath(n) {
	set = {delimiters:[{left:"`",right:"`",display:false}]};
	renderMathInElement(document.getElementById('whitebox'),set);
	switch (n) {
		case 1:
			var a = parseFloat(document.getElementById('in').value);
			var r = parseFloat(document.getElementById('in2').value);
			if (a&&Math.abs(r)<1) {
				document.getElementById('out').innerHTML='` = '+(+(a/(1-r)).toFixed(5)).toString()+'`';
			}
			break;
			
		case 2:
			var a = parseFloat(document.getElementById('in').value);
			var r = parseFloat(document.getElementById('in2').value);
			var n = parseFloat(document.getElementById('in3').value);
			if (a&&a<Infinity&&r!=1&&r!=0&&r&&n)
				document.getElementById('out').innerHTML='` = '+(+(a*(1-Math.pow(r,n))/(1-r)).toFixed(5)).toString()+'`';
			break;
		
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

function daily(x) {
	dailyMath(x);
	var d = document;
	d.getElementById('prog').onchange = () => dailyMath(x);
	var y = x.toString();
	var t = d.createElement('title');
	d.head.appendChild(t);
	t.innerHTML = "Stardust "+y;
	var h1 = d.createElement("h1");
	h1.innerHTML = "Program "+y;
	d.body.insertBefore(h1, d.body.childNodes[0]);
	d.body.appendChild(d.createElement('br'));
	var h = d.createElement('h3');
	d.body.appendChild(h);
	if(x>1) {
		var l = d.createElement('a');
		l.id = 'll';
		l.href = (x-1).toString()+'.html';
		l.innerHTML = '&larr; Last Program';
		h.appendChild(l)
	}
	if(x<6) {
		var r = d.createElement('a');
		r.id = 'lr';
		r.href = (x+1).toString()+'.html';
		r.innerHTML = 'Next Program &rarr;';
		h.appendChild(r)
	}
}

