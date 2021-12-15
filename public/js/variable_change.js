function plus_value_one(){
    var inc = parseInt(document.getElementById('qty_1').innerHTML);
    inc++;
    document.getElementById('qty_1').innerHTML = inc;
    var unit_price = parseInt(document.getElementById('unit_price_1').innerHTML.substring(1))
    document.getElementById('total_1').innerHTML = '$'+ String(unit_price*inc) +'.00';
}

function minus_value_one(){
    var decr = parseInt(document.getElementById('qty_1').innerHTML);
    decr--;
    document.getElementById('qty_1').innerHTML = decr;
    var unit_price = parseInt(document.getElementById('unit_price_1').innerHTML.substring(1))
    document.getElementById('total_1').innerHTML = '$'+ String(unit_price*decr) +'.00';
}

function plus_value_two(){
    var inc = parseInt(document.getElementById('qty_2').innerHTML);
    inc++;
    document.getElementById('qty_2').innerHTML = inc;
    var unit_price = parseInt(document.getElementById('unit_price_2').innerHTML.substring(1))
    document.getElementById('total_2').innerHTML = '$'+ String(unit_price*inc) +'.00';
}

function minus_value_two(){
    var decr = parseInt(document.getElementById('qty_2').innerHTML);
    decr--;
    document.getElementById('qty_2').innerHTML = decr;
    var unit_price = parseInt(document.getElementById('unit_price_2').innerHTML.substring(1))
    document.getElementById('total_2').innerHTML = '$'+ String(unit_price*decr) +'.00';
}
