async function grantToken(requestOptions){

    let respRaw = await (await fetch('http://127.0.0.1:5000/login',requestOptions)).text();
    let respJson = JSON.parse(respRaw);
    // console.log(respJson.access_token);
    // console.log(respJson.msg);
    if (respJson.access_token == undefined){
        if (respJson.msg == 'Pseudo is not in database'){
            console.log("GRRRRR");
        }
    }
    else{
        // console.log(respJson.access_token)
        let token = respJson.access_token;
        localStorage.setItem("santaToken", 'Bearer ' + token);
        window.location.href = "/";
    }
}

function submitLogin(){

    let nodeForm = document.getElementsByTagName("input");

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
                            pseudo: nodeForm[0].value,
                            password: nodeForm[1].value,
                            })
        }
    grantToken(requestOptions);
}

export default submitLogin;