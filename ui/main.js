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

//Submit Name
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
                    //Capture a list of names & render it as a list
                var names = request.responseText;
                names = JSON.parse(names);
                var list ='';
                for(var i=0; i<names.length; i++){
                    list+= '<li>'+names[i]+'</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
    };
    var nameInput = document.getElementById("name");
    var name = nameInput.value;
    //Make a request
    request.open('GET','http://nehajeevan28.imad.hasura-app.io/submit-name?name='+ name,true);
    request.send(null);

}
