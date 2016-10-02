function chess(d) {
	document.getElementById('blitz').innerHTML = d[0];
	document.getElementById('bullet').innerHTML = d[1];
	document.getElementById('standard').innerHTML = d[2];
	document.getElementById('tactics').innerHTML = d[5];
};
		
function fetchData() {
	fetch('https://www.reddit.com/user/StardustGogeta/about.json').then(r=>r.json()).then(body => {
		document.getElementById('karma1').innerHTML = body.data.link_karma;
		document.getElementById('karma2').innerHTML = body.data.comment_karma;
	});
	fetch("https://query.yahooapis.com/v1/public/yql?q=select%20content%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.chess.com%2Fmember%2FStardustGogeta'%20and%20xpath%3D'%2F%2Fdiv%5B%40class%3D%22right%22%5D'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=chess")
	.then(r=>r.text()).then(body => chess(JSON.parse(body.substr(10,140)+'}').query.results.div));
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

function daily(x) {
	var d = document;
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
	if(x<5) {
		var r = d.createElement('a');
		r.id = 'lr';
		r.href = (x+1).toString()+'.html';
		r.innerHTML = 'Next Program &rarr;';
		h.appendChild(r)
	}
}