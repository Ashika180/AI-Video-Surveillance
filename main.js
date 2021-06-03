video = "";
status = "";
objects = [];

function preload(){
    video = createVideo("video.mp4");
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start(){
    Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Object Detection has started.";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function getResults(error, results){
if(error){
    console.log(error);
}

else{
    console.log(results);
    objects = results;
}
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(status !=  ""){
    Detector.detect(video, getResults);

     for(i = 0; i < objects.length; i++){
     document.getElementById("status").innerHTML = "Objects Detected.";
     document.getElementById("no_of_objects").innerHTML = "Number of objects detcted are " + objects.length + ".";

     fill("#FFFFFF");
     percent = floor(objects[i].confidence * 100);
     text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
     noFill();
     stroke("#FFFFFF");
     rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
}
    }
}