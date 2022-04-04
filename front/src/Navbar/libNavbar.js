function logout(){
    console.log(localStorage.clear());
    window.location.href = "/wishlist";
}

export default logout;