let ordenes = []
const addProviderBtn = document.getElementById('agregar-orden');
const modalContainer = document.getElementById('ModalLoginForm3');
const closeModal = document.getElementById('close-modal3');
const tbProveedores = document.getElementById('tb-proveedores3');
const confirmProvider = document.getElementById('confirmar-proveedor3');

if(localStorage.getItem('misOrdenes')===null){
    localStorage.setItem('misOrdenes',JSON.stringify([]))
}
document.getElementById("op-prov").innerHTML = `<option selected>Open this select menu</option>`
if(localStorage.getItem('misProveedores')!=null){
    let nomProvedores = JSON.parse(localStorage.getItem('misProveedores'));
    for (let i = 0; i < nomProvedores.length; i++) {
        document.getElementById("op-prov").innerHTML += `<option value="${nomProvedores[i].Código}">${nomProvedores[i].Código}</option>`
    }
}
document.getElementById("op-prod").innerHTML = `<option selected>Open this select menu</option>`
if(localStorage.getItem('misProdServ')!=null){
    let prod = JSON.parse(localStorage.getItem('misProdServ'));
    console.log(prod)
    for (let i = 0; i < prod.length; i++) {
        document.getElementById("op-prod").innerHTML += `<option value="${prod[i].Sku}">${prod[i].Sku}</option>`
    }
}
// Funciones
function addRow (arr) {
    return `
    <tr id="orden-${arr.Orden}">
        <td>${arr.Orden}</td>
        <td>${arr.Emision}</td>
        <td>${arr.Entrega}</td>
        <td>${arr.Direccion}</td>
        <td>${arr.Proveedor}</td>
        <td>${arr.Producto}</td>
        <td>${arr.Cantidad}</td>
        <td>
            <div class="d-flex">
                <button id="boton-delete-${arr.Orden}" class="btn btn-danger me-2">
                    <i class="bx bx-trash text-light"></i>
                </button>
                <button value="${arr.Orden}" id="boton-delete-${arr.Orden}" class="btn btn-primary">
                    <i class="bx bx-edit-alt text-light"></i>
                </button>
            </div>
        </td>
    </tr>`
}
ordenes = JSON.parse(localStorage.getItem('misOrdenes'))

document.querySelector('#ModalLoginForm3 .modal-dialog').style.transform = 'none'

for (let i = 0; i < ordenes.length; i++) {
    tbProveedores.innerHTML += addRow(ordenes[i])
}

for (let i = 0; i < tbProveedores.rows.length; i++) {
    let boton = tbProveedores.rows[i].children[7].children[0].children[0]
    boton.addEventListener('click', () => {
        console.log('llegamos')
        let tempArray = JSON.parse(localStorage.getItem('misOrdenes'));
        tempArray = tempArray.filter(item => item.Orden != ordenes[i].Orden)
        localStorage.setItem('misOrdenes', JSON.stringify(tempArray));
        alert(tempArray + ordenes[i].Orden)
        window.location.reload();
    });
}
for (let i = 0; i < tbProveedores.rows.length; i++) {
    let boton = tbProveedores.rows[i].children[7].children[0].children[1]
    boton.addEventListener('click', () => {
        alert('editando')
        modalContainer.classList.add('d-block');
        modalContainer.classList.add('opacity-100');
        modalContainer.style.background = '#15000045';
        let array2 = JSON.parse(localStorage.getItem('misOrdenes')).filter(item => item.Orden == boton.value)
        console.log(array2)
        document.querySelector('#op-prov').value = array2[0].Proveedor;
        document.querySelector('#op-prod').value =  array2[0].Producto;
        document.querySelector('#ModalLoginForm3 input[name="numero-orden"]').value =  array2[0].Orden;
        document.querySelector('#ModalLoginForm3 input[name="emision"]').value =  array2[0].Emision;
        document.querySelector('#ModalLoginForm3 input[name="entrega"]').value =  array2[0].Entrega;
        document.querySelector('#ModalLoginForm3 input[name="cant"]').value =  array2[0].Cantidad;
        document.querySelector('#ModalLoginForm3 input[name="direc"]').value =  array2[0].Direccion;
    });
}

addProviderBtn.addEventListener('click', () => {
    modalContainer.classList.add('d-block');
    modalContainer.classList.add('opacity-100');
    modalContainer.style.background = '#15000045'
})

closeModal.addEventListener('click', () => {
    modalContainer.classList.remove('d-block');
    modalContainer.classList.remove('opacity-100');
})

confirmProvider.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('al')
    let selectProv = document.querySelector('#op-prov')
    let selectProd = document.querySelector('#op-prod')
    let numOrd = document.querySelector('#ModalLoginForm3 input[name="numero-orden"]');
    let emision = document.querySelector('#ModalLoginForm3 input[name="emision"]');
    let entrega = document.querySelector('#ModalLoginForm3 input[name="entrega"]');
    let cant = document.querySelector('#ModalLoginForm3 input[name="cant"]');
    let direc = document.querySelector('#ModalLoginForm3 input[name="direc"]');

    // Verificar si algún campo está vacío
    if (
        selectProv.value === "" ||
        selectProd.value === "" ||
        numOrd.value === "" ||
        emision.value === "" ||
        entrega.value === "" ||
        cant.value === "" ||
        direc.value === ""
    ) {
        console.log('Debes completar todos los campos');
        return;
    }

    let list = {
        Orden: numOrd.value,
        Emision: emision.value,
        Entrega: entrega.value,
        Direccion: direc.value,
        Proveedor: selectProv.value,
        Producto: selectProd.value,
        Cantidad: cant.value
    };
    if(ordenes.find(item => item.Orden == numOrd.value)) {
        alert("Ya ingresaste este producto, sera reemplazado")
        let array3 = ordenes.filter(item => item.Orden != numOrd.value);
        console.log(array3)
        array3.push(list);
        console.log(array3)
        tbProveedores.innerHTML = ``;
        localStorage.setItem('misOrdenes', JSON.stringify(array3));
        for (let i = 0; i < array3.length; i++) {
            tbProveedores.innerHTML += addRow(array3[i]);
        }
        window.location.reload()
        return;
    }
    console.log(list);
    ordenes.push(list);
    console.log(ordenes);

    tbProveedores.innerHTML = ``;
    localStorage.setItem('misOrdenes', JSON.stringify(ordenes));

    for (let i = 0; i < ordenes.length; i++) {
        tbProveedores.innerHTML += addRow(ordenes[i]);
    }
    window.location.reload()
});