function setup(){
    canvas = createCanvas(300,300);
    canvas.position(540,300);
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier("MobileNet", modelo_cargado);
}

function draw(){
    image(video,0,0,300,300);
    classifier.classify(video, gotResults);
}

resultado_anterior = "";

function modelo_cargado(){
    console.log("modelo cargado!!!!!!");
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);
        if((results[0].confidence > 0.5) && (resultado_anterior != results[0].label)){
            resultado_anterior = results[0].label;
            var synth = window.speechSynthesis;
            var speakData = "El coso visto es= " + results[0].label;
            var utterThis = new SpeechSynthesisUtterance(speakData);
            synth.speak(utterThis);
            document.getElementById("Coso").innerHTML = results[0].label;
            document.getElementById("Khe_dijo?").innerHTML = (results[0].confidence * 100).toFixed(3) + "%";
        }
    }
}