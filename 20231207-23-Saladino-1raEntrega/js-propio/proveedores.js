let proveedores = []
const addProviderBtn = document.getElementById('agregar-proveedor');
const modalContainer = document.getElementById('ModalLoginForm');
const closeModal = document.getElementById('close-modal');
const tbProveedores = document.getElementById('tb-proveedores');
const confirmProvider = document.getElementById('confirmar-proveedor');

// Chequeamos si el storage esta vacio o no
if(localStorage.getItem('misProveedores')===null){
    localStorage.setItem('misProveedores',JSON.stringify([]))
}

// Functions
function addRow (arr) {
    return `
        <tr id="proveedor-${arr.Código}">
        <td>${arr.RazónSocial}</td>
        <td>${arr.Código}</td>
        <td><a href="#">${arr.Email}</a></td>
        <td>${arr.Dirección.CalleyN}</td>
        <td>
            <div class="d-flex">
                <button id="boton-delete-${arr.Código}" class="btn btn-danger me-2">
                    <i class="bx bx-trash text-light"></i>
                </button>
                <button value="${arr.Código}" id="boton-delete-${arr.Código}" class="btn btn-primary">
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
document.querySelector('#ModalLoginForm .modal-dialog').style.transform = 'none'

proveedores = JSON.parse(localStorage.getItem('misProveedores'))

for (let i = 0; i < proveedores.length; i++) {
    tbProveedores.innerHTML += addRow(proveedores[i])
}

for (let i = 0; i < tbProveedores.rows.length; i++) {
    let boton = tbProveedores.rows[i].children[4].children[0].children[0]
    boton.addEventListener('click', () => {
        let tempArray = JSON.parse(localStorage.getItem('misProveedores'));
        tempArray = tempArray.filter(item => item.Código != proveedores[i].Código)
        localStorage.setItem('misProveedores', JSON.stringify(tempArray));
        window.location.reload();
    });
}

for (let i = 0; i < tbProveedores.rows.length; i++) {
    let boton = tbProveedores.rows[i].children[4].children[0].children[1]
    boton.addEventListener('click', () => {
        alert('editando')
        changeStyle();
        let array2 = JSON.parse(localStorage.getItem('misProveedores')).filter(item => item.Código == boton.value)
        document.querySelector('#ModalLoginForm input[name="codigo-proveedor"]').value = array2[0].Código;
        document.querySelector('#ModalLoginForm input[name="razon-social"]').value =  array2[0].RazónSocial;
        document.querySelector('#ModalLoginForm input[name="rubro"]').value =  array2[0].Rubro;
        document.querySelector('#ModalLoginForm input[name="email"]').value =  array2[0].Email;
        document.querySelector('#ModalLoginForm input[name="sitio-web"]').value =  array2[0].SitioWeb;
        document.querySelector('#ModalLoginForm input[name="telefono"]').value =  array2[0].Teléfono;
        document.querySelector('#ModalLoginForm input[name="calle-num"]').value =  array2[0].Dirección.CalleyN;
        document.querySelector('#ModalLoginForm input[name="cp"]').value =  array2[0].Dirección.CP;
        document.querySelector('#ModalLoginForm input[name="localidad"]').value =  array2[0].Dirección.Localidad;
        document.querySelector('#ModalLoginForm input[name="provincia"]').value =  array2[0].Dirección.Provincia;
        document.querySelector('#ModalLoginForm input[name="pais"]').value =  array2[0].Dirección.País;
        document.querySelector('#ModalLoginForm input[name="cuit"]').value =  array2[0].DatosFiscales.CUIT;
        document.querySelector('#ModalLoginForm input[name="condicion"]').value = array2[0].DatosFiscales.CondiciónIVA;
        document.querySelector('#ModalLoginForm input[name="nombre"]').value = array2[0].DatosContacto.Nombre;
        document.querySelector('#ModalLoginForm input[name="apellido"]').value = array2[0].DatosContacto.Apellido;
        document.querySelector('#ModalLoginForm input[name="telefono-usuario"]').value = array2[0].DatosContacto.Teléfono
        document.querySelector('#ModalLoginForm input[name="email-usuario"]').value = array2[0].DatosContacto.Email
        document.querySelector('#ModalLoginForm input[name="rol"]').value = array2[0].DatosContacto.Rol
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

    let codProv = document.querySelector('#ModalLoginForm input[name="codigo-proveedor"]');
    let razónSocial = document.querySelector('#ModalLoginForm input[name="razon-social"]');
    let rubro = document.querySelector('#ModalLoginForm input[name="rubro"]');
    let email = document.querySelector('#ModalLoginForm input[name="email"]');
    let sitioWeb = document.querySelector('#ModalLoginForm input[name="sitio-web"]');
    let telefono = document.querySelector('#ModalLoginForm input[name="telefono"]');
    let calleyNum = document.querySelector('#ModalLoginForm input[name="calle-num"]');
    let cp = document.querySelector('#ModalLoginForm input[name="cp"]');
    let localidad = document.querySelector('#ModalLoginForm input[name="localidad"]');
    let prov = document.querySelector('#ModalLoginForm input[name="provincia"]');
    let pais = document.querySelector('#ModalLoginForm input[name="pais"]');
    let cuit = document.querySelector('#ModalLoginForm input[name="cuit"]');
    let condicion = document.querySelector('#ModalLoginForm input[name="condicion"]');
    let nombre = document.querySelector('#ModalLoginForm input[name="nombre"]');
    let apellido = document.querySelector('#ModalLoginForm input[name="apellido"]');
    let telUsuario = document.querySelector('#ModalLoginForm input[name="telefono-usuario"]');
    let emUsuario = document.querySelector('#ModalLoginForm input[name="email-usuario"]');
    let rol = document.querySelector('#ModalLoginForm input[name="rol"]');

    // Verificar si algún campo está vacío
    if (
        codProv.value === "" ||
        razónSocial.value === "" ||
        rubro.value === "" ||
        email.value === "" ||
        sitioWeb.value === "" ||
        telefono.value === "" ||
        calleyNum.value === "" ||
        cp.value === "" ||
        localidad.value === "" ||
        prov.value === "" ||
        pais.value === "" ||
        cuit.value === "" ||
        condicion.value === "" ||
        nombre.value === "" ||
        apellido.value === "" ||
        telUsuario.value === "" ||
        emUsuario.value === "" ||
        rol.value === ""
    ) {
        alert('Debes completar todos los campos');
        return;
    }
    
    let list = {
        Código: codProv.value,
        RazónSocial: razónSocial.value,
        Rubro: rubro.value,
        SitioWeb: sitioWeb.value,
        Email: email.value,
        Teléfono: telefono.value,
        Dirección: {
            CalleyN: calleyNum.value,
            CP: cp.value,
            Localidad: localidad.value,
            Provincia: prov.value,
            País: pais.value
        },
        DatosFiscales: {
            CUIT: cuit.value,
            CondiciónIVA: condicion.value
        },
        DatosContacto: {
            Nombre: nombre.value,
            Apellido: apellido.value,
            Teléfono: telUsuario.value,
            Email: emUsuario.value,
            Rol: rol.value
        }
    };
    if(proveedores.find(item => item.Código == codProv.value)) {
        alert("Ya ingresaste este producto, sera reemplazado")
        let array3 = proveedores.filter(item => item.Código != codProv.value);
        array3.push(list);
        tbProveedores.innerHTML = ``;
        localStorage.setItem('misProveedores', JSON.stringify(array3));
        for (let i = 0; i < array3.length; i++) {
            tbProveedores.innerHTML += addRow(array3[i]);
        }
        window.location.reload()
        return;
    }
    proveedores.push(list);
    tbProveedores.innerHTML = ``;
    localStorage.setItem('misProveedores', JSON.stringify(proveedores));
    for (let i = 0; i < proveedores.length; i++) {
        tbProveedores.innerHTML += addRow(proveedores[i]);
    }
    window.location.reload()
});