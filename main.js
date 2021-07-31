var song=""; 
left_wrist_x = "";
right_wrist_x = "";
left_wrist_y = "";
right_wrist_y = "";
score_left_wrist="";
score_right_wrist="";

function preload() {
     song = loadSound("The_Score.mp3");
 }

 function draw() {
   image(video, 0, 0, 600, 500);
   fill("#FF0000");
   stroke("#FF0000");

   if(score_left_wrist > 0.2) {
    circle(left_wrist_x, left_wrist_y, 20);
   iNumberLeftWrist_y = Number(left_wrist_y);
   remove_decimals = floor(iNumberLeftWrist_y);
   volume = remove_decimals/500;
   console.log("Volume" + volume);
   document.getElementById("volume").innerHTML = "volume = " + volume;
   song.setVolume(volume);
   }

   if(score_right_wrist > 0.2){
    circle(right_wrist_x, right_wrist_y, 20);
    if(right_wrist_y > 0 && right_wrist_y <= 100){
      document.getElementById("speed").innerHTML = "speed = 0.5x";
      song.rate(0.5);
    }
    else if(right_wrist_y > 100 && right_wrist_y <= 200){
      document.getElementById("speed").innerHTML = "speed = 1x";
      song.rate(1); 
    }
    else if(right_wrist_y > 200 && right_wrist_y <= 300){
      document.getElementById("speed").innerHTML = "speed = 1.5x";
      song.rate(1.5); 
    }
    else if(right_wrist_y > 300 && right_wrist_y <= 400){
      document.getElementById("speed").innerHTML = "speed = 2x";
      song.rate(2); 
    }
    else if(right_wrist_y > 400 && right_wrist_y <= 500){
      document.getElementById("speed").innerHTML = "speed = 2.5x";
      song.rate(2.5); 
    }
   }
  }
  

 function setup() {
   canvas = createCanvas(600, 500);
   canvas.center();
   video = createCapture(VIDEO);
   video.hide();
   poseNet = ml5.poseNet(video, modelLoaded);
   poseNet.on('pose', gotPoses);
 }

 function play_sound() {
     song.play();
 }

 function modelLoaded() {
   console.log("Model  is loaded successfully.")
 }

 function gotPoses(results) {
   if(results.length > 0){
     console.log(results);
     left_wrist_x  = results[0].pose.leftWrist.x;
     left_wrist_y  = results[0].pose.leftWrist.y;
     right_wrist_x  = results[0].pose.rightWrist.x;
     right_wrist_y  = results[0].pose.rightWrist.y;
     console.log("leftWrist_x = " + left_wrist_x + "rightWrist_x = " + right_wrist_x + " + leftWrist_y = " + left_wrist_y + "rightWrist_y = " + right_wrist_y );
     score_right_wrist = results[0].pose.keypoints[10].score;
     score_left_wrist = results[0].pose.keypoints[9].score;
     console.log(score_left_wrist);
     console.log(score_right_wrist);
    }
  }