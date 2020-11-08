const validateEmail = (email) => {
    if(email==='')
        return true;
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return true;
    else 
        return false;
}
export {
    validateEmail
}