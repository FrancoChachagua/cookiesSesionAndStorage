const socket = io();
const $productsFaker = document.getElementById('productsFaker');
// msgs
const $chat = document.getElementById('chat');
const $formChatLive = document.getElementById('formChatLive');
const $btnFormChat = document.getElementById('btnFormChat');
//new
const $FormAddMessages = document.getElementById('FormAddMessages');

// // table
// const $divPostTD = document.querySelector('#formPost');
// const $formOne = document.querySelector('#addProducts');
// const $handlebarsTable = document.getElementById('handlebarsTable');


socket.on('chatHistory',data=>{
    console.log(data);
    console.log(data.history);
    let newData = JSON.parse(JSON.stringify(data.history));
    console.log(newData);
    let messagess = newData.map((msjs)=>{
        return `<div>
                    <span> <b class="text-primary">${msjs.usuarioEmail}</b> <span class="text-secondary"> ${msjs.created_at}</span> : <span class="text-success fst-italic">${msjs.mensaje}</span> </span>
                </div>`
    } ).join('');
    $chat.innerHTML= messagess
})


fetch('http://localhost:8080/api/productos-test')
        .then(str=>str.text())
        .then(getProducts=>{
            let newData = JSON.parse(getProducts);
            console.log(newData);
            let products = newData.products.map((p)=>{
                return `<tbody>
                            <tr class="${p.id}">
                                <th scope="row"></th>
                                <td>${p.id}</td>
                                <td>${p.nombre}</td>
                                <td>$${p.precio}</td>
                                <td><img class="rounded" width="90" height="70" src=${p.foto} alt=${p.nombre}></td>
                            </tr>
                        </tbody>
                        `
            }).join('');
            $productsFaker.innerHTML= products;
        })


$FormAddMessages.addEventListener('submit',function(e){
    e.preventDefault();
    let data = new FormData($FormAddMessages);
    let objectData = {
        nombre: data.get('name'),
        apellido: data.get('lastname'),
        edad: data.get('age'),
        email: data.get('email') ,
        avatar: data.get('avatar'),
        alias:data.get('nickname'),
        contraseña:data.get('password')
        // text:data.get('text')
    }
    fetch('http://localhost:8080/api/messages/create',{
        method:'POST',
        body:JSON.stringify(objectData),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(result=>result.json())
    .then(json=>{
        $FormAddMessages.reset();
    })
})