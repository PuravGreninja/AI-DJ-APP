var song = "";
var rightWristX = 0;
var rightWristY = 0;
var leftWristX = 0;
var leftWristY = 0;

var leftWristScore= 0;
var rightWristScore= 0;
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    Canvas = createCanvas(600, 500);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();


    poseNet = ml5.poseNet(Video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(Video, 0, 0, 600, 500);

    if(leftWristScore>0.2){
        fill ("red");
        stroke ("red");
        circle (leftWristX , leftWristY , 20);
        leftWristY_num=Number(leftWristY);
        leftWristY_round=floor(leftWristY_num);
        volume=leftWristY_round/500;
        document.getElementById("volume").innerHTML="Volume - " + volume;
        song.setVolume(volume);
    } 
    if (rightWristScore>0.2) {
        fill ("red");
        stroke ("red");
        circle (rightWristX , rightWristY , 20);
        if (rightWristY > 0 && rightWristY <= 100) {
           song.rate(0.5);
           document.getElementById("speed").innerHTML="Speed - 0.5x"; 
        }
        if (rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);
            document.getElementById("speed").innerHTML="Speed - 1x";
         }
         if (rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML="Speed - 1.5x";
         }
         if (rightWristY > 300 && rightWristY <= 400) {
            song.rate(2);
            document.getElementById("speed").innerHTML="Speed - 2x";
         }
         if (rightWristY > 400 && rightWristY <= 500) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML="Speed - 2.5x";
         }
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() {
    console.log("Model is loaded");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWrist X= " + leftWristX + " Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWrist X= " + rightWristX + " Y = " + rightWristY);

        rightWristScore=results[0].pose.keypoints[10].score;
        console.log("rightWristScore = " + rightWristScore);
        
        leftWristScore=results[0].pose.keypoints[9].score;
        console.log("leftWristScore = " + leftWristScore);
    }
}