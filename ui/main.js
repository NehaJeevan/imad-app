

//Submit Username/Password to login
var submit = document.getElementById("submit_btn");
submit.onclick = function(){
    //Create a request object
    var request = new XMLHttpRequest();
    
    //Capture the response & store in variable
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE)
        {
            //Do something
            if(request.status == 200){
                console.log('user logged in');
                alert('Login successful');
            }else if(request.status == 403){
                alert('Username/Password is uncorrect');    
            }else if(request.status == 500){
                alert('Something went wrong on the server'); 
        }
    }
};
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username);
    console.log(password);
    var name = nameInput.value;
    //Make a request
    request.open('POST','http://nehajeevan28.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username, password: password}));
}