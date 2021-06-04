function chess(d) {
	console.log(d);
	document.getElementById('bullet').innerHTML = d['chess_bullet']['last']['rating'];
	document.getElementById('blitz').innerHTML = d['chess_blitz']['last']['rating'];
	document.getElementById('rapid').innerHTML = d['chess_rapid']['last']['rating'];
	document.getElementById('lessons').innerHTML = d['lessons']['highest']['rating'];
	document.getElementById('tactics').innerHTML = d['tactics']['highest']['rating'];
};
		
function fetchData() {
	fetch('https://www.reddit.com/user/StardustGogeta/about.json').then(r=>r.json()).then(body => {
		document.getElementById('karma1').innerHTML = body.data.link_karma;
		document.getElementById('karma2').innerHTML = body.data.comment_karma;
	});
	fetch("https://api.chess.com/pub/player/stardustgogeta/stats")
	.then(r=>r.text()).then(body => chess(JSON.parse(body)));
	fetch("https://api.stackexchange.com/2.2/users/5732397?site=stackoverflow").then(r=>r.json())
	.then(body => document.getElementById('SOrep').innerHTML = body.items[0].reputation);
}
