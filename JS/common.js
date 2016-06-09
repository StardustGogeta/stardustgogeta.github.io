function daily(x)
{
	var d = document;
	var y = x.toString();
	var t = d.createElement('title');
	d.head.appendChild(t);
	t.innerHTML = "Stardust "+y;
	var h1 = d.createElement("h1");
	h1.innerHTML = "Program "+y;
	d.body.insertBefore(h1, d.body.childNodes[0]);
	d.body.appendChild(d.createElement('br'));
	var h2 = d.createElement('h2');
	d.body.appendChild(h2);
	if(x>1)
	{
		var l = d.createElement('a');
		l.id = 'll';
		l.href = (x-1).toString()+'.html';
		l.innerHTML = '&larr; Last Program';
		h2.appendChild(l)
	}
	if(x<4)
	{
		
		var r = d.createElement('a');
		r.id = 'lr';
		r.href = (x+1).toString()+'.html';
		r.innerHTML = 'Next Program &rarr;';
		h2.appendChild(r)
	}
}