Webcam.set({
height:300,
width:350,
img_format:'png',
png_quality:90,
});
Camera= document.getElementById("camera");

Webcam.attach('#Camera');
    
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'" >'
    })
}

console.log("ml5 version",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/RTtzzVmn6/model.json",modelLoaded);

function modelLoaded(){
console.log("model is loaded");
}
prediction_1="";
prediction_2="";
function speak(){
    synth=window.speechSynthesis;
    speak_data_1="THE FIRST PREDICTION IS" + prediction_1;
    speak_data_2=" AND THE SECOND PREDICTION IS" + prediction_2;
    utterThis= new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById('captured_image');
 classifier.classify(img,gotResults);   
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
prediction_1=results[0].label;
prediction_2=results[1].label;
speak();
if(results[0].label == "happy"){
    document.getElementById("update_emoji").innerHTML="&#128522;";
}
if(results[0].label == "sad"){
    document.getElementById("update_emoji").innerHTML="&#128532;";
}
if(results[0].label == "angry"){
    document.getElementById("update_emoji").innerHTML="&#128545;";
}
 
if(results[1].label == "happy"){
    document.getElementById("update_emoji_2").innerHTML="&#128522;";
}
if(results[1].label == "sad"){
    document.getElementById("update_emoji_2").innerHTML="&#128532;";
}

if(results[1].label == "angry"){
    document.getElementById("update_emoji_2").innerHTML="&#128545;";
}
    }

}
