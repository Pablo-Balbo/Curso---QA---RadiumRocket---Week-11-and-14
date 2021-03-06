const fullName = document.getElementById('fullName'),
      email = document.getElementById('email'),
      password = document.getElementById('password'),
      confirmPassword = document.getElementById('confirmPassword'),
      form = document.querySelector('form'),
      submitForm = document.getElementById('form'),
      error = document.getElementById('error');

let flagFullName = flagEmail = flagPassword = flagConfirmPassword = false; 

fullName.onblur = function(e){
        const spanFullName = document.getElementById('spanFullName');
              fullNameValue = fullName.value;

        if(fullNameValue.length <= 6){
            spanFullName.style.display = 'block';
            spanFullName.style.color = 'red';
            spanFullName.innerHTML = '<span>Name must be more than 6 characters</span>';
            flagFullName = false;
            e.preventDefault();
            fullName.focus;
        } else if(fullNameValue.indexOf(' ') === -1){
            spanFullName.style.display = 'block';
            spanFullName.style.color = 'red';
            spanFullName.innerHTML = '<span>Name must have a blank space</span>';
            flagFullName = false;
            e.preventDefault();
        } else {
            flagFullName = true;
        }
};

fullName.onfocus = function(e){
    if(spanFullName.style.display === 'block'){
        spanFullName.style.display = 'none';
    }
};

email.onblur = function(e){
    const emailConditions = new RegExp("^([\dA-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$");
    if(emailConditions.test(email.value) === false){
        spanEmail.style.display = 'block';
        spanEmail.style.color = 'red';
        spanEmail.innerHTML = '<span>Enter a valid email</span>';
        flagEmail = false;
        e.preventDefault();
    } else {
        flagEmail = true;
    }
};

email.onfocus = function(e){
    if(spanEmail.style.display === 'block'){
        spanEmail.style.display = 'none';
    }
};

password.onblur = function(e){
    let passwordValue = password.value;
    const characters = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
    if(passwordValue.length < 8){
        spanPassword.style.display = 'block';
        spanPassword.style.color = 'red';
        spanPassword.innerHTML = '<span>Password must have at least 8 characters</span>';
        flagPassword = false;
        e.preventDefault();
    } else if(characters.test(passwordValue) === false){
        spanPassword.style.display = 'block';
        spanPassword.style.color = 'red';
        spanPassword.innerHTML = '<span>Enter a lowercase, an uppercase and a number</span>';
        flagPassword = false;
        e.preventDefault();
    } else {
        flagPassword = true;
    }
};

password.onfocus = function(e){
    if(spanPassword.style.display === 'block'){
        spanPassword.style.display = 'none';
    }
};

confirmPassword.onblur = function(e){
    let passwordValue = password.value;
    let confirmPasswordValue = confirmPassword.value;
    if(passwordValue != confirmPasswordValue){
        spanConfirmPassword.style.display = 'block';
        spanConfirmPassword.style.color = 'red';
        spanConfirmPassword.innerHTML = '<span>Passwords do not match</span>';
        flagConfirmPassword = false;
        e.preventDefault();
    } else {
        flagConfirmPassword = true;
    }
};

confirmPassword.onfocus = function(e){
    if(spanConfirmPassword.style.display === 'block'){
        spanConfirmPassword.style.display = 'none';
    }
};

submitForm.onsubmit = function(e){
    e.preventDefault();
    if (flagFullName && flagEmail && flagPassword && flagConfirmPassword) {
        fetch(`http://localhost:4000/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                fullName: fullName.value,
                email: email.value,
                password: password.value,
            })
        })
        .then (response => response.json())
        .then (info => {
            error.style.display = 'flex';
            error.style.fontSize = '20px';
            if (info.result === 'Success!') {
                error.style.color = 'green';
                error.innerHTML = fullName.value + ': ' + email.value + '</br>';
            } else {
                error.style.color = 'red';
                error.innerHTML = 'Please, check your data';
            }
        })
        .catch(function(error){
            console.log('Error trying to send the data')
        });
    } else {
        error.style.color = 'red';
        error.innerHTML = 'Please, enter a name, an email and a password';
    }
};