const socket = io();
const $inputMessage = document.getElementById('inputMessages');
const $chat = document.getElementById('chat');
const $userGoodbye = document.getElementById('userGoodbye');
const $btnLogout = document.getElementById('btnLogout');
let user;

$btnLogout.addEventListener('click', (e)=>{
    e.preventDefault();
    fetch('http://localhost:8080/logout')
    .then(res=> console.log('Cookie deleted'))
    .then(res=> {
        $userGoodbye.innerHTML = `Adios ${user.nombre}`
    })
    .then(res=>{
        setTimeout(() => {
            location.replace('/index.html')
        }, 2000);
    })
})


fetch('http://localhost:8080/currentUser').then(result=>result.json()).then(json=>{
    user = json;
    console.log(user);
})

$inputMessage.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        if(e.target.value){
            socket.emit('message',{message:e.target.value})
            e.target.value="";
        }
    }
})

socket.on("messageLog",data=>{
    console.log(data.payload);
    newData = data.payload
    let messagess = newData.map((msjs)=>{
        return `<div>
                    <span> <b class="text-primary">${msjs.author.email}</b> <span class="text-secondary"> </span> : <span class="text-success fst-italic">${msjs.text}</span> </span>
                    <span> <img class="rounded-circle" src="${msjs.author.avatar}" width="30px" alt=""> <b class="text-primary">${msjs.author.email}</b> <span class="text-secondary"> [${msjs.createdAt}]</span> : <span class="text-success fst-italic">${msjs.text}</span> </span>
                
                </div>`
    } ).join('');
    $chat.innerHTML= messagess
})