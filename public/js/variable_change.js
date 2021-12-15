function plus_value(identity,unit,total){
    var inc = parseInt(document.getElementById(identity).innerHTML);
    inc++;
    document.getElementById(identity).innerHTML = inc;
    var unit_price = parseInt(document.getElementById(unit).innerHTML.substring(1))
    document.getElementById(total).innerHTML = '$'+ String(unit_price*inc) +'.00';
}

function minus_value(identity,unit,total){
    var decr = parseInt(document.getElementById(identity).innerHTML);
    decr--;
    document.getElementById(identity).innerHTML = decr;
    var unit_price = parseInt(document.getElementById(unit).innerHTML.substring(1))
    document.getElementById(total).innerHTML = '$'+ String(unit_price*decr) +'.00';
}

