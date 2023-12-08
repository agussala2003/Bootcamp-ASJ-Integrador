let prodServ = []
const addProviderBtn = document.getElementById('agregar-prod-serv');
const modalContainer = document.getElementById('ModalLoginForm2');
const closeModal = document.getElementById('close-modal2');
const tbProveedores = document.getElementById('tb-proveedores2');
const confirmProvider = document.getElementById('confirmar-proveedor2');

if(localStorage.getItem('misProdServ')===null){
    localStorage.setItem('misProdServ',JSON.stringify([]))
}
document.getElementById("op-prov").innerHTML = `<option selected>Open this select menu</option>`
if(localStorage.getItem('misProveedores')!=null){
    let nomProvedores = JSON.parse(localStorage.getItem('misProveedores'));
    for (let i = 0; i < nomProvedores.length; i++) {
        document.getElementById("op-prov").innerHTML += `<option value="${nomProvedores[i].Código}">${nomProvedores[i].Código}</option>`
    }
}

// Funciones
function addRow (arr) {
    return `
    <tr id="producto-${arr.Sku}">
        <td>${arr.Proveedor}</td>
        <td>${arr.Sku}</td>
        <td>${arr.Categoria}</td>
        <td>${arr.Producto}</td>
        <td>${arr.Precio}</td>
        <td>
            <div class="d-flex">
                <button id="boton-delete-${arr.Sku}" class="btn btn-danger me-2">
                    <i class="bx bx-trash text-light"></i>
                </button>
                <button value="${arr.Sku}" id="boton-edit-${arr.Sku}" class="btn btn-primary">
                    <i class="bx bx-edit-alt text-light"></i>
                </button>
            </div>
        </td>
    </tr>`
}
const changeStyle = () => {
    modalContainer.classList.add('d-block');
    modalContainer.classList.add('opacity-100');
    modalContainer.style.background = '#15000045';
}
prodServ = JSON.parse(localStorage.getItem('misProdServ'))
document.querySelector('#ModalLoginForm2 .modal-dialog').style.transform = 'none'
const arrdelete = []
console.log(tbProveedores)
//tbProveedores.innerHTML = ''
let saludo = () => alert('Hola')
for (let i = 0; i < prodServ.length; i++) {
    tbProveedores.innerHTML += addRow(prodServ[i]);
}

for (let i = 0; i < tbProveedores.rows.length; i++) {
    let boton = tbProveedores.rows[i].children[5].children[0].children[0]
    boton.addEventListener('click', () => {
        console.log('llegamos')
        let tempArray = JSON.parse(localStorage.getItem('misProdServ'));
        tempArray = tempArray.filter(item => item.Sku != prodServ[i].Sku)
        localStorage.setItem('misProdServ', JSON.stringify(tempArray));
        alert(tempArray + prodServ[i].Sku)
        window.location.reload();
    });
}

for (let i = 0; i < tbProveedores.rows.length; i++) {
    let boton = tbProveedores.rows[i].children[5].children[0].children[1]
    boton.addEventListener('click', () => {
        alert('editando')
        changeStyle();
        let array2 = JSON.parse(localStorage.getItem('misProdServ')).filter(item => item.Sku == boton.value)
        console.log(array2)
        document.querySelector('#op-prov').value = array2[0].Proveedor;
        document.querySelector('#ModalLoginForm2 input[name="sku"]').value =  array2[0].Sku;
        document.querySelector('#op-cat').value =  array2[0].Categoria;
        document.querySelector('#ModalLoginForm2 input[name="nomProd"]').value =  array2[0].Producto;
        document.querySelector('#ModalLoginForm2 input[name="desc"]').value =  array2[0].Descripcion;
        document.querySelector('#ModalLoginForm2 input[name="precio"]').value =  array2[0].Precio;
    });
}

addProviderBtn.addEventListener('click', () => {
    changeStyle();
})

closeModal.addEventListener('click', () => {
    modalContainer.classList.remove('d-block');
    modalContainer.classList.remove('opacity-100');
})

confirmProvider.addEventListener('click', (e) => {
    e.preventDefault();
    let selectProv = document.querySelector('#op-prov')
    let sku = document.querySelector('#ModalLoginForm2 input[name="sku"]');
    let cat = document.querySelector('#op-cat');
    let nomProd = document.querySelector('#ModalLoginForm2 input[name="nomProd"]');
    let desc = document.querySelector('#ModalLoginForm2 input[name="desc"]');
    let precio = document.querySelector('#ModalLoginForm2 input[name="precio"]');

    // Verificar si algún campo está vacío
    if (
        selectProv.value === "" ||
        sku.value === "" ||
        cat.value === "" ||
        nomProd.value === "" ||
        desc.value === "" ||
        precio.value === ""
    ) {
        console.log('Debes completar todos los campos');
        return;
    }

    let list = {
        Proveedor: selectProv.value,
        Sku: sku.value,
        Categoria: cat.value,
        Producto: nomProd.value,
        Descripcion: desc.value,
        Precio: precio.value
    };
    if(prodServ.find(item => item.Sku == sku.value)) {
        alert("Ya ingresaste este producto, sera reemplazado")
        let array3 = prodServ.filter(item => item.Sku != sku.value);
        console.log(array3)
        array3.push(list);
        console.log(array3)
        tbProveedores.innerHTML = ``;
        localStorage.setItem('misProdServ', JSON.stringify(array3));
        for (let i = 0; i < array3.length; i++) {
            tbProveedores.innerHTML += addRow(array3[i]);;
        }
        window.location.reload()
        return;
    }
    console.log(list);
    prodServ.push(list);
    console.log(prodServ);

    tbProveedores.innerHTML = ``;
    localStorage.setItem('misProdServ', JSON.stringify(prodServ));

    for (let i = 0; i < prodServ.length; i++) {
        tbProveedores.innerHTML += addRow(prodServ[i]);
    }
    window.location.reload()
});