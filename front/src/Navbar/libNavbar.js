function logout(){
    console.log(localStorage.clear());
    window.location.href = "/";
}

export default logout;