function plus_value(identity,unit,total){
    var inc = parseInt(document.getElementById(identity).innerHTML);
    inc++;
    document.getElementById(identity).innerHTML = inc;
    var unit_price = parseInt(document.getElementById(unit).innerHTML.substring(1))
    document.getElementById(total).innerHTML = '$'+ String(unit_price*inc) +'.00';
    reload_total();
}

function minus_value(identity,unit,total){
    var decr = parseInt(document.getElementById(identity).innerHTML);
    decr--;
    document.getElementById(identity).innerHTML = decr;
    var unit_price = parseInt(document.getElementById(unit).innerHTML.substring(1))
    document.getElementById(total).innerHTML = '$'+ String(unit_price*decr) +'.00';
    reload_total();
}

function reload_total(){
    var line_total_1 = parseInt(document.getElementById('total_1').innerHTML.substring(1))
    var line_total_2 = parseInt(document.getElementById('total_2').innerHTML.substring(1))
    document.getElementById('subtotal').innerHTML = '$'+ String(line_total_1+line_total_2) +'.00';
    document.getElementById('all_total').innerHTML = '$'+ String(line_total_1+line_total_2+5) +'.00';
    $.ajax({
        type: 'POST',
        url: '/demo_order',
        data: {'all_total': (line_total_1+line_total_2+5)*100}
    });
    
}

