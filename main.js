"use strict";

let citas = [];

let admin = [
    { "Nombre": "admin", "Password": 'admin' }
];

/**
 * Ver las citas sin modo administrador.
 */
function verCitas(admin) {
    if (citas.length > 0) {
        let contenido = '<table class ="table text-white table-striped table-responsive-sm">';
        contenido += '<tr>';
        contenido += '<th class ="text-white"> Nombre </th>';
        contenido += '<th class ="text-white"> Fecha </th>';
        contenido += '<th class ="text-white"> Hora </th>';
        if (admin) {
            contenido += '<th class ="text-white"> </th>';
            $('#textoAdmin').append('<h1 class="mt-5 text-center text-white">Zona Administrador</h1>');
        }
        contenido += '</tr>';
    
        for (let i = 0; i < citas.length; i++) {
            contenido += '<tr>';
            contenido += '<td class="text-light">' + citas[i].Nombre + '</td>';
            contenido += '<td class="text-light">' + citas[i].Fecha + '</td>';
            contenido += '<td class="text-light">' + citas[i].Hora + '</td>';
            if (admin) {
                contenido += `<td class="text-light"><i id="${i}" class="fa-solid fa-trash"></i></td>`;
            }
    
            contenido += '</tr>';
        }
    
        contenido += '</table>';
    
        $('#tabla').append(contenido);
    }

    /**
     * Comprobar cual a sigo pulsado para poder borrarlo.
     */
    let trashes = document.querySelectorAll('i');
    trashes.forEach((trash) => {
        trash.addEventListener('click', (e) => {
            $('table').remove();
            $('#textoError').empty();
            citas.splice(e.target.id,1);
            verCitas(true);
        });
    });
}

$('#textoError').css({ "color": 'red', "text-align": 'center' });

/**
 * Cuando se clicke el submit de añadir.
 */
$('#anhadir').submit((e) => {
    $('table').remove();
    $('#textoError').empty();

    let hoy = new Date();
    e.preventDefault();
    let nombre = $('#nombre').val();
    let fecha = $('#fecha').val();
    let hora = $('#hora').val();

    let cita = hacerFecha(fecha, hora);

    let boo = false;
    if (hoy > cita) {
        $('#textoError').append('<p>Has puesto una fecha posterior al día de hoy.</p>');
        boo = true;
    }

    for (let cit of citas) {
        let citaDeLaLista = hacerFecha(cit.Fecha, Hora(cit.Hora));
        if (Date.parse(cita) == Date.parse(citaDeLaLista)) {
            boo = true;
            $('#textoError').append('<p>Existe una cita a la misma hora.</p>');
        }
    }
    if (!boo) {
        citas.push({ "Nombre": nombre, "Fecha": fecha, "Hora": `${hora}:00` });
    }

    $('input[type="text"]').val('');
    $('input[type="date"]').val('');
    $('input[type="number"]').val('');

    verCitas(false);
});

/**
 * Cuando se pulse el submit para
 * registrarse comprueba si existe o no el administrador
 * y si existe te muestra para poder borrar las citas.
 */
$('#administrador').submit((e) => {
    $('table').remove();
    $('#textoError').empty();

    e.preventDefault();
    let user = $('#user').val();
    let pass = $('#pass').val();
    $('input[type="text"]').val('');
    $('input[type="password"]').val('');

    for (let us of admin) {
        if (user == us.Nombre && pass == us.Password) {
            return verCitas(true);
        }
    }
    return $('#textoError').append('<p>Error al loguearto como administrador</p>');
});

/**
 * Funcion que divide la fecha.
 * @param {String} fecha 
 * @param {String} hora 
 * @returns 
 */
function hacerFecha(fecha, hora) {
    let contador = 0;
    let anho = '';
    let mes = '';
    let dia = '';
    for (let numero of fecha) {
        switch (contador) {
            case 0:
                if (numero != '-') {
                    anho += numero;
                }
                break;

            case 1:
                if (numero != '-') {
                    mes += numero
                }
                break;

            case 2:
                dia += numero;
                break;
        }
        if (numero == '-') {
            contador++;
        }
    }
    mes--;

    return new Date(anho, mes, dia, hora);
}

/**
 * Funcion que divide la hora.
 * @param {String} hora 
 * @returns {String} la hora
 */
function Hora(hora) {
    let h = '';
    for (let numero of hora) {
        if (numero == ':') {
            return h;
        }
        h += numero
    }
}

verCitas(false);