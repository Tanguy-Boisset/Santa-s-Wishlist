function checkInfo(){
    let nodePassword = document.getElementById("password");
    let nodePasswordCheck = document.getElementById("passwordCheck");
    
    let nodeError = document.getElementById("error")
    
    console.log(nodePassword);
    console.log(nodePasswordCheck);
    
    let password = nodePassword.value;
    let passwordCheck = nodePasswordCheck.value;

    if (password==passwordCheck){
        document.forms["formSignup"].submit();
        window.location.replace("/loginBackend");
    }
    else{
        nodeError.innerHTML="Le mot de passe doit être identique dans les deux champs !"
    }
}

export default checkInfo;