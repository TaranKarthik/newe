status = "";
emptyArray = [];
obj_name = "";


function preload(){

}


function setup(){
    ctx = createCanvas(300,300);
    ctx.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(300,300);
   
}

function draw(){
    image(video,0,0,300,300);
    if(status != ""){
        idenitify.detect(video,gotResults);
        document.getElementById("status").innerHTML = "whatever objects were there are detected";
        for(i=0;i<emptyArray.length;i++){
            percent = floor(emptyArray[i].confidence * 100);
            fill("#6a82c4");
            text(emptyArray[i].label + " " + percent + " %", emptyArray[i].x+15,emptyArray[i].y+15);
            noFill();
            stroke("#6a82c4");
            width = emptyArray[i].width;
            height = emptyArray[i].height;
            x = emptyArray[i].x;
            y = emptyArray[i].y;
            rect(x,y,width,height);
   
            if(emptyArray[i].label == obj_name){
                
                idenitify.detect(gotResults);
                document.getElementById("particular_obj_detected").innerHTML = "object found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(obj_name + " object found");
                synth.speak(utterThis);
    
    
            }else{
                document.getElementById("status").innerHTML = "object not found";
            }

        }
        
    }

}

function gotResults(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        emptyArray = results;
    }

}


function start(){
    idenitify = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    obj_name = document.getElementById("serch").value;
    console.log(obj_name);
}


function modelLoaded(){
    console.log("MOdel loaded");
    status = true;
    
    
}

