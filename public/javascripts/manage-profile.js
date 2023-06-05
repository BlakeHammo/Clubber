const vueinst = new Vue({
    el: '#app',
    data: {
        username: 'Username',
        first_name: 'First Name',
        last_name: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        image: '/images/icon.png',
        edit_profile: false,
        profile_page: true
    }
});

// In menu shows number of unread posts
function updateNotificationBadge() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            const notificationBadge = document.querySelector("#notifications");
            notificationBadge.innerText = req.responseText;
        }
    };
    req.open('GET',`/posts/unread`);
    req.send();
}

updateNotificationBadge();

// Marks the current link page as active
document.getElementById("profile-nav").className = "current-page";

// Hamburger Menu Behaviour

const hamburger = document.querySelector("#hamburger");
const exit = document.querySelector("#exit-menu");
const menu = document.querySelector("#popout-menu");

function toggleMenuOn() {
    hamburger.style.display = "none";
    exit.style.display = "inline";
    menu.style.display = "flex";
    document.body.classList.add("stop-scrolling");
}

function toggleMenuOff() {
    menu.style.display = "none";
    exit.style.display = "none";
    hamburger.style.display = "inline";
    document.body.classList.remove("stop-scrolling");
}

//logout AJAX function called when user clicks logout button (implemented in the nav.js folder for feed.html)
function logout()
{

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if(xhttp.readyState === 4 && xhttp.status === 200)
        {
            alert('Logged Out');
            console.log("logged out");
        } else if(xhttp.readyState === 4 && xhttp.status === 403)
        {
            alert('Not logged in');
        }
    };
    xhttp.open('POST','/logout');
    xhttp.send();
}

hamburger.addEventListener("click", toggleMenuOn, false);
exit.addEventListener("click", toggleMenuOff, false);
