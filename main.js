hsong = "";
msong = "";
left_Wrist_x = 0;
left_Wrist_y = 0;
right_Wrist_x = 0;
right_Wrist_y = 0;
score_leftwrist = 0;
score_rightwrist = 0;
meta_song = "";
harry_song = "";



function preload(){
    hsong = loadSound("music.mp3");
    msong = loadSound("Meta.mp3");   
}

function setup(){
    canvas = createCanvas(600, 530);
    canvas.center();  

    video = createCapture(VIDEO);
    video.hide();


    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}


function draw(){
    image(video,0,0,600,530);


    fill("green");
    stroke("green");

    harry_song = hsong.isPlaying();
    console.log(harry_song);

    meta_song = msong.isPlaying();
    console.log(meta_song);
 
    if(score_leftwrist >0.2){
      circle(left_Wrist_x,left_Wrist_y,20);
      msong.stop();
        if(harry_song == false){
        hsong.play()
      }
      else{
        document.getElementById("name").innerHTML = "Song name: Harry Potter Song";
      }
    }




    if(score_rightwrist >0.2){
      circle(left_Wrist_x,left_Wrist_y,20);
      hsong.stop();
        if(meta_song == false){
        msong.play()
      }
      else{
        document.getElementById("name").innerHTML = "Song name: Metamorphosis Song";
      }
    }



}

function modelLoaded(){
    console.log("Posenet is initialized");
}

function gotPoses(results){
  if(results.length > 0){
    console.log(results);

    score_leftwrist = results[0].pose.keypoints[9].score;
    console.log(score_leftwrist);

    score_rightwrist = results[0].pose.keypoints[10].score;
    console.log(score_rightwrist);

    left_Wrist_x = results[0].pose.leftWrist.x;
    left_Wrist_y = results[0].pose.leftWrist.y;
    console.log("leftWrist_x = "+left_Wrist_x+" ,leftWrist_y= "+left_Wrist_y);

    right_Wrist_x = results[0].pose.rightWrist.x;
    right_Wrist_y = results[0].pose.rightWrist.y;
    console.log("rightWrist_x = "+right_Wrist_x+" ,rightWrist_y= "+right_Wrist_y); 
  }
}


