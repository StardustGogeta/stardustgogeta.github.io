set = {delimiters:[{left:"`",right:"`",display:false}, {left:"$$",right:"$$",display:true}]};
renderMathInElement(document.getElementsByClassName('container')[0],set);

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})
