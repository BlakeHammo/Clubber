const vueinst = Vue.createApp({
    data() {
        return {
            signIn: true,
            username: "",
            password: "",
            repeatPassword: "",
            email: ""
        };
    }
}).mount("#app");

function login(event)
{
    //use the event object to prevent the form executing it's default behaviour (POST to / since no "action" property is specifed in the html)
    //this way, if the login is unsucessful, the page will just remain the same so the user can try again
    //if the login is successful, they will be redirect to feed.html by the window.location.href below.
    event.preventDefault();

    var xhttp = new XMLHttpRequest();

    let userData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState === 4 && xhttp.status === 200)
        {
            alert('successful login');
            window.location.href = '/feed.html'; // Redirect to feed.html
        } else if(xhttp.readyState === 4 && xhttp.status === 401)
        {
           alert('unsucessful login');
        }
    };

    xhttp.open('POST', '/login');
    xhttp.setRequestHeader('Content-Type','application/json');
    xhttp.send(JSON.stringify(userData));
}

function signup()
{

    var xhttp = new XMLHttpRequest();
    let password = document.getElementById('password-creation');
    let repeatPassword = document.getElementById('password-repeat');


    if(password.value !== repeatPassword.value)
    {
        alert("Passwords don't match, please try again");
        return;
    }

    //create JSON payload
    let userData ={
        email: document.getElementById('email').value,
        username: document.getElementById('username-creation').value,
        password: password.value
    };

    xhttp.onreadystatechange = function()
    {
        if(xhttp.readyState === 4 && xhttp.status === 200)
        {
            alert('Account Created');
        } else if(xhttp.readyState === 4 && xhttp.status === 401)
        {
           alert('Account Creation Failed');
        }
    };

    xhttp.open('POST', '/signup');
    xhttp.setRequestHeader('Content-Type','application/json');
    xhttp.send(JSON.stringify(userData));
}
