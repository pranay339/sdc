function form_data (event) {
    event.preventDefault()
    
    
    let name = document.getElementById("username").value
    let password = document.getElementById("password").value
    
    if(name=="Arun" && password=="123") {
        window.location.href = "catalog.html"
    }
    else {
        document.getElementById("login-info").innerText="Password Mismatch"
    }    
}