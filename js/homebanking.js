
        //-----Declaración de variables-----//
  //Variables de usuario
  let nombreUsuario = "Germán Alaggia";
  let saldoCuenta = 15000;
  let limiteExtraccion = 5000;
  let codigoSeguridad = 9876;

  //Constante con la longitud de los CBU
  const longitudCuenta = 7;
  const longitudCodigoSeguridad = 4;

  //Servicios
  let servicios = [["Agua", 350], ["Telefono", 425], ["Luz", 210], ["Internet", 570]]; //se podria colocar como constante, pero no me parece correcto ya que los valores pueden ser modificados.

  //Cuentas Amigas
  let cuentasAmigas = [[1234567,"Cuenta amiga 1"],[7654321,"Cuenta amiga 2"]];


    //----Ejecución de las funciones que actualizan----//
        //los valores de las variables en el HTML.//
window.onload = function() {
    iniciarSesion();
}

          //-------Funciones a crear------------//

function sumarDinero(cantDinero){
  saldoCuenta += cantDinero;
}

function restarDinero(cantDinero){
  saldoCuenta -= cantDinero;
}


          // -------- Mensajes --------//

//Mensaje para indicar que un valor ingresado no es número.
function valorNoNumero(){
  alert("el valor ingresado no es numérico.\nPor favor volver a intentar");
}

//Mensaje para indicar que el monto no es entero.
function noSePermitenDecimales(){
  alert("El número ingresado no puede ser decimal.\nPor favor volver a intentar");
}

//Mensaje para indicar que no se permite realizar depositos menores a 100$.
function esMenorAcien(){
  alert("El monto debe ser mayor a 100$.");
}

//Mensaje indicando que el monto a extraer no es multiplo de 100.
function montoNoMultiploDeCien(){
  alert("Solo puedes extraer billetes de 100$.\nPor favor ingresar un número multiplo de 100.");
}

//Mensaje indicando que el monto a extraer es mayor al limiteExtraccion
function montoMayorAlLimite(){
  alert("La cantidad de dinero que desea extraer es mayor a tu limite de extraccion");
}

//Mensaje indicando que no hay saldo disponible para la extracción solicitada.
function noHaySaldo(){
  alert("No hay saldo disponible en tu cuenta para la operación deseada.");
}

//Mensaje de pago de servicios.
function servicioPagado(i, saldo){
  alert("Has pagado el servicio " + (servicios[i][0]) + "\nSaldo anterior: $" + saldo + "\nDinero descontado: $" + servicios[i][1] + "\nSaldo actual: $" + saldoCuenta + "");
}

//Mensaje indicando que la longitud del codigo ingresado no corresponde a un CBU.
function noLongitudCBU(){
  alert("la longitud del CBU debe ser de 7 caracteres.\nPor favor verificar el número ingresado.");
}

//Mensaje de operación cancelada.
function operacionCancelada(){
  alert("Operación cancelada.");
}

//Mensaje de CBU ya registrado.
function cbuRegistrado(){
  alert("El CBU ingresado ya se encuentra registrado como cuenta amiga.");
}

//Mensaje Código incorrecto o no registrado.
function codigoIncorrecto(){
  alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.");
}

//Mensaje longitud de código de seguridad no valido.
function noLongitudCodSeguridad(){
  alert("la longitud del código de seguridad debe ser de 4 dígitos.\nPor favor verificar el número ingresado.");
}

function noCuentaAmiga(){
  alert("El CBU ingresado no corresponde con una cuenta amiga.");
}

//Mensaje servicio a pagar no existe.
function servicioNoExiste(){
  alert("El servicio selecciondo no existe.");
}
            //-----Validaciones y verificaciones-----//

//verifica si el valor es null.
function verSiEsNull(valor){
  if (typeof(valor) !== "object") {
    return true;
  }else {
    operacionCancelada();
    return false;
  }
}

//Verifica si lo ingresado es un número.
function verSiEsNumero(valor){
  if (!isNaN(valor) && valor > 0) { //isNaN devuelve true si no puede convertir el valor a número. Por ende para validar si es número lo niego.
    return true;
  }else {
    valorNoNumero();
    return false;
  }
}

//Verifica si el número ingresado es un entero.
function verSiEsEntero(valor){
  if (parseFloat(valor)%1 === 0) {
    return true;
  }else {
    noSePermitenDecimales();
    return false;
  }
}

//Verifica que el limite a extraer sea menor al limite de extracción registrado.
function verificarLimite(valor){
  if (valor <= limiteExtraccion) {
    return true;
  }else{
    montoMayorAlLimite();
    return false;
  }
}

//Verifica que el monto a extraer sea posible solo en billetes de 100$.
function verSiEsMultiploCien(valor){
  if (valor%100 === 0) {
    return true;
  }else {
    montoNoMultiploDeCien();
    return false;
  }
}

//Verificar si hay saldo disponible
function verSiHaySaldo(valor){
  if (valor <= saldoCuenta) {
    return true;
  }else {
    noHaySaldo();
    return false;
  }
}

//Verificar si el CBU se encuentra registrado.
function verSiExisteCBU(valor){
  for (var i = 0; i < cuentasAmigas.length; i++) {
    if (valor === cuentasAmigas[i][0]) {
      cbuRegistrado();
      return false;
    }
  }
  return true;
}

//Verificar si el código de seguridad concuerda con el del usuario.
function verificarCodigoSeguridad(codigo){
  if (codigo === codigoSeguridad) {
    return true;
  }else {
    codigoIncorrecto();
    noCargarPantalla();
    return false;
  }
}

//Validar la longitud de array cuentasAmigas y la longitud del código de seguridad.
function validarlongitud(cuenta, longitud){ // lo modifique para poder utilizar una sola función para verificar ambas longitudes.
  switch (longitud) {
    case 7 ://Verifica longitud del array cuentasAmigas.
      if (cuenta.length === longitud) {
        return true;
      }else{
        noLongitudCBU();
        return false;
      }
    case 4 ://Verifica longitud del codigoSeguridad.
      if (cuenta.length === longitud) {
        return true;
      }else{
        noLongitudCodSeguridad();
        return false;
      }
    default: return false;
  }
}

//Pagar un servicio de forma generica.
function pagoDeServicios(indice){
  let saldoAnterior = saldoCuenta;
  restarDinero(servicios[indice][1]);
  servicioPagado(indice, saldoAnterior);
  actualizarSaldoEnPantalla();
}

//Verificar si la cuenta ingresada es una cuenta registrada como amiga.
function verSiEsCuentaAmiga(valor){
  let tamañoArray = cuentasAmigas.length;
  let indice = 0;
  let variableMuleta;
  while(indice < tamañoArray){
    variableMuleta = cuentasAmigas[indice][0];
    if (valor === variableMuleta) {
      return indice;
    }
    indice++;
  }
  noCuentaAmiga();
  return false;
}

//Funciones que tenes que completar---------------------------------------------
function cambiarLimiteDeExtraccion() {
  let montoIngresado = prompt("Ingrese su nuevo limite de extracción");
  if (verSiEsNull(montoIngresado)) {
    if (verSiEsNumero(montoIngresado)) {
      if (verSiEsEntero(montoIngresado)) {
        if (verSiEsMultiploCien(montoIngresado)) {
          montoIngresado = parseInt(montoIngresado);
          limiteExtraccion = montoIngresado;
          actualizarLimiteEnPantalla();
          alert("Limite de extracción actualizado a " + limiteExtraccion + "$.");
        }
      }
    }
  }
}

function extraerDinero() {
  let montoIngresado = prompt("Ingresar el monto a extraer.\nEl monto debe ser multiplo de 100.");
  if (verSiEsNull(montoIngresado)) {
    if (verSiEsNumero(montoIngresado)) {
      if (verSiEsEntero(montoIngresado)) {
        if (verSiEsMultiploCien(montoIngresado)) {
          if (verSiHaySaldo(montoIngresado)) {
            if (verificarLimite(montoIngresado)) {
              montoIngresado = parseInt(montoIngresado);
              let saldoAnterior = saldoCuenta;
              restarDinero(montoIngresado);
              alert("Has retirado: " + montoIngresado + "\n" +
               "Saldo anterior: " + saldoAnterior + "\n " +
                "Saldo actual: " + saldoCuenta);
              actualizarSaldoEnPantalla();
            }
          }
        }
      }
    }
  }
}

// Maneja el deposito, verificando que el valor ingresado sea número y entero.
function depositarDinero() {
  let montoIngresado = prompt("Ingresar el monto a depositar.\nEl monto debe ser mayor a 100$ y no incluir centavos." );
  if (verSiEsNull(montoIngresado)) {
    if (verSiEsNumero(montoIngresado)) {
      if (verSiEsEntero(montoIngresado)) {
        if (verSiEsMultiploCien(montoIngresado)) {
          montoIngresado = parseInt(montoIngresado);
          let saldoAnterior = saldoCuenta;
          sumarDinero(montoIngresado);
          alert("Has depositado: " + montoIngresado + "\n" +
           "Saldo anterior: " + saldoAnterior + "\n " +
            "Saldo actual: " + saldoCuenta);
          actualizarSaldoEnPantalla();
        }
      }
    }
  }
}

function pagarServicio() {
  let servicioApagar = prompt("Ingrese el número que corresponda con el servicio que desea pagar:\n1- Agua\n2- Teléfono\n3- Luz\n4- Internet");
  if (verSiEsNull(servicioApagar)) {
    if (verSiEsNumero(servicioApagar)) {
      if (verSiEsEntero(servicioApagar)) {
        parseInt(servicioApagar);
        --servicioApagar;
        switch (servicioApagar) {
          case 0:
            if (verSiHaySaldo(servicios[servicioApagar][1])) {
              pagoDeServicios(servicioApagar);
            }
            break;
          case 1:
            if (verSiHaySaldo(servicios[servicioApagar][1])) {
              pagoDeServicios(servicioApagar);
            }
            break;
          case 2:
            if (verSiHaySaldo(servicios[servicioApagar][1])) {
              pagoDeServicios(servicioApagar);
            }
            break;
          case 3:
            if (verSiHaySaldo(servicios[servicioApagar][1])) {
              pagoDeServicios(servicioApagar);
            }
            break;
          default:servicioNoExiste();
        }
      }
    }
  }
}

function transferirDinero() {
  let montoAtransferir = prompt("Ingrese el monto a transferir");
  if (verSiEsNull(montoAtransferir) && verSiEsNumero(montoAtransferir) && verSiEsEntero(montoAtransferir) && verSiHaySaldo(montoAtransferir)) {
    montoAtransferir = parseInt(montoAtransferir);
    let cuentaAtransferir = prompt("Ingrese el número de cuenta a la cual desea transferir.");
    if (verSiEsNull(cuentaAtransferir) && verSiEsNumero(cuentaAtransferir) && verSiEsEntero(cuentaAtransferir) && validarlongitud(cuentaAtransferir, longitudCuenta)) {
      cuentaAtransferir = parseInt(cuentaAtransferir);
      let puntero = verSiEsCuentaAmiga(cuentaAtransferir);
      if (puntero !== false) {
        restarDinero(montoAtransferir);
        actualizarSaldoEnPantalla();
        alert("Se han trasnferido: " + montoAtransferir + "$.\nCuenta destino: " + cuentasAmigas[puntero][1] + ".\nCorrespondiente al CBU: " + cuentasAmigas[puntero][0] + ".\nSaldo actual :" + saldoCuenta + ".");
      }
    }
  }
}

function iniciarSesion() {
  let codigoIngresado = prompt("Por favor ingresar su código de seguridad.\nRecuerde que deben ser 4 dígitos numéricos.");
  if (verSiEsNull(codigoIngresado) && verSiEsNumero(codigoIngresado) && validarlongitud(codigoIngresado, longitudCodigoSeguridad) && verSiEsEntero(codigoIngresado)) {
      codigoIngresado = parseInt(codigoIngresado);
      if (verificarCodigoSeguridad(codigoIngresado)) {
        alert("Bienvenido/a " + nombreUsuario + ", ya puedes comenzar a realizar operaciones.");
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
      }
    }else iniciarSesion();
}

//Bloquea al usuario si el código es incorrecto.
function noCargarPantalla(){
  saldoCuenta = 0;
  limiteExtraccion = 0;
  document.getElementById("nombre").innerHTML = "Bloqueado";
  document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
  document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

//Función adicional-------------------------------------------------
function registrarCuentaAmiga(){
  let cbuAregistrar = prompt("ingresar el CBU de la cuenta a registrar.\nRecuerde que son códigos de 7 dígitos");
  if (verSiEsNull(cbuAregistrar)) {
    if (verSiEsNumero(cbuAregistrar)) {
      if (verSiEsEntero(cbuAregistrar)) {
        if (validarlongitud(cbuAregistrar, longitudCuenta)) {
          cbuAregistrar = parseInt(cbuAregistrar);
          if (verSiExisteCBU(cbuAregistrar)) {
            let indice = cuentasAmigas.length;
            let nuevaCuentaAmiga = "Cuenta amiga " + ++indice;
            cuentasAmigas.push([cbuAregistrar, nuevaCuentaAmiga]);
            alert("Se ha registrado como " + nuevaCuentaAmiga + " al CBU " + cbuAregistrar +".");
          }
        }
      }
    }
  }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
