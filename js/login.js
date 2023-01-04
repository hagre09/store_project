const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


function sinnigUp() {
    var regexOnlyLetter = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/
    var regexForEmail = /^[a-zA-Z]+(@)(gmail|outlook|yahoo)(.com)$/
    var regexForPassword = /(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}/

    var signUpName = document.getElementById("signUpName").value
    var signUpEmail = document.getElementById("signUpEmail").value
    var signUpPassword = document.getElementById("signUpPassword").value

    // console.log(signUpName,signUpEmail,signUpPassword)

    if (!regexOnlyLetter.test(signUpName)) {
        alert("user name Must contain on letter or more.");
    } else if (!regexForEmail.test(signUpEmail)) {
        alert("The email must be standard (contain @) for ex: any-letters@(gmail or yahoo or outlook).com");
    } else if (!regexForPassword.test(signUpPassword)) {
        alert("Password Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
    } else {
        localStorage.setItem("password", signUpPassword)
        localStorage.setItem("email", signUpEmail)
        alert("wellcom : "+ signUpName +" your information saved successfully .");
    }
}


function sinnigIn(){
    var signInEmail= document.getElementById("signInEmail").value
    var signInPassword= document.getElementById("signInPassword").value

    if(localStorage.getItem("email")==signInEmail && localStorage.getItem("password")==signInPassword){
        alert("valid email .. wellcome ")
    }else{
        alert("You are not registered , please go to sign up and registere .")
    }
}


function myFunction() {
    var x = document.getElementById("signUpPassword");
    var y = document.getElementById("signInPassword");
    if (x.type === "password" || y.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  }