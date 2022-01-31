let $loginForm = document.getElementById('loginForm');
$loginForm.addEventListener('submit',function(e){
    e.preventDefault();
    let form = new FormData($loginForm);
    let sendObject={
        email:form.get('email'),
        contraseña:form.get('password')
    }
    fetch('http://localhost:8080/api/messages/login',{
        method:"POST",
        body:JSON.stringify(sendObject),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>{
        console.log(json);
        location.replace('/chat.html')
    })
})