async function grantToken(element, options){
    let respRaw = await (await fetch('http://127.0.0.1:5000/signup',options)).text();
    let respJson = JSON.parse(respRaw);
    // if respJson.token
    if (respJson.access_token == undefined){
        if (respJson.msg == 'Pseudo is already in Database'){
            document.getElementById("pseudo").style.border="2px red solid";
            document.getElementById("pseudo").style.borderRadius="3px";
            document.getElementById("password").style.border="";
            document.getElementById("password").style.borderRadius="";
            document.getElementById("passwordCheck").style.border="";
            document.getElementById("passwordCheck").style.borderRadius="";

        }
        else{
            document.getElementById("password").style.border="2px red solid";
            document.getElementById("password").style.borderRadius="3px";
            document.getElementById("passwordCheck").style.border="2px red solid";
            document.getElementById("passwordCheck").style.borderRadius="3px";
            document.getElementById("pseudo").style.border="";
            document.getElementById("pseudo").style.borderRadius="";
        }
        element.innerHTML=respJson.msg;
    }
    else{
        let token = respJson.access_token;
        localStorage.setItem("santaToken", 'Bearer ' + token);
        window.location.href = "/";
    }
        console.log(respRaw);
}

function submitSignup(){
    let nodePassword = document.getElementById("password");
    let nodePasswordCheck = document.getElementById("passwordCheck");
    let nodeError = document.getElementById("error");
    let nodePseudo = document.getElementById("pseudo");
    
    // console.log(nodePassword);
    // console.log(nodePasswordCheck);
    
    let password = nodePassword.value;
    let passwordCheck = nodePasswordCheck.value;

    if (password==passwordCheck){
        let nodeForm = document.getElementsByTagName("input")
        // document.forms["formSignup"].submit();
        // fetch("127.0.0.1:5000/signup", requestOption);
        const requestOptions = {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                                name: nodeForm[0].value,
                                surname: nodeForm[1].value,
                                pseudo: nodeForm[2].value,
                                password: nodeForm[3].value,
                                })
            }
            
            // fetch('http://127.0.0.1:5000/signup',requestOptions)
            //     .then(response => {
            //         console.log(response.statusText);
            //         return response.text();
            //     })
            //     .then(data => console.log(data));

            grantToken(nodeError, requestOptions); 
    }
    else{
        nodePseudo.style.border="";
        nodePseudo.style.borderRadius="";
        nodePassword.style.border="2px red solid";
        nodePassword.style.borderRadius="3px";
        nodePasswordCheck.style.border="2px red solid";
        nodePasswordCheck.style.borderRadius="3px";
        nodeError.innerHTML="Fields are not matching !"
    }
}

// function submitSignup(e){
//     // console.log("non")
//     const requestOption = {
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//         },
//     body: JSON.stringify({
//                         // name: this.state.name, 
//                         // surname: this.state.surname,
//                         // pseudo: this.state.pseudo,
//                         // password: this.state.password
//                             test:"test"
//                         })
                        
//                     }
//     fetch("http://127.0.0.1:3000/good", requestOption)
    
// }

export default submitSignup;
// export {submitSignup}
