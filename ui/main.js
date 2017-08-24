var button = document.getElementById("counter");
var counter = 0;
button.onclick = function(){
    //Make request to counter end point
    
    //Capture the response & store in variable
    
    //Render the variable to span
    counter+=1;
    var span = document.getElementById("count");
    span.innerHTML = counter.toString();
};