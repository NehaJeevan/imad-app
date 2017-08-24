var button = document.getElementById("counter");
button.onclick = function(){
    //Create a request object
    var request = new XMLHttpRequest();
    
    //Capture the response & store in variable
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE)
        {
            //Do something
            if(request.status == 200){
                var counter = request.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
        }
    };
    
    //Make a request
    request.open('GET','http://nehajeevan28.imad.hasura-app.io/counter',true);
    request.send(null);
};