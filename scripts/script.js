// Thanks TTSMP3, i'll pay for your one-time subscription soon.

let txtInput = document.querySelector('#area');
let voiceList = document.querySelector('#sprachwahl');
let btnSpeak = document.querySelector('#SpeakBTN');
let downloadBtn = document.querySelector('#DownloadBTN');
let synth = window.speechSynthesis;
let latestMP3 = ""
let deb = false;
let deb2 = false;
let voices = [];

function fetchFile(url) {
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = 'New TTS';
        document.body.appendChild(aTag);
        aTag.click();
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
    }).catch(() => {
        alert("Failed to download file!");
    });
}

btnSpeak.addEventListener('click', function() {
    if (deb === false) {
        deb = true
        btnSpeak.innerText = '...'
        let xhr = new XMLHttpRequest(),
        data = `msg=${txtInput.value}&lang=${voiceList.value}&source=ttsmp3`;
        xhr.open('POST','https://wassupcors.herokuapp.com/https://ttsmp3.com/makemp3_new.php', false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("x-requested-with", "*")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
        xhr.onload = function() {
            btnSpeak.innerText = "Reading..."
            latestMP3 = JSON.parse(xhr.responseText).MP3
            let audio = new Audio(JSON.parse(xhr.responseText).URL);
            audio.play();
            audio.addEventListener('ended', function() {
                btnSpeak.innerText = "Read!"
                deb = false
            })
        }
        xhr.send(data);
    }
})

downloadBtn.addEventListener('click', function() {
   if (deb2 === false) {
    if (latestMP3 === "") {
    } else {
        deb2 = true
        downloadBtn.innerText = "..."
        fetchFile('https://wassupcors.herokuapp.com/https://ttsmp3.com/created_mp3/' + latestMP3)
        downloadBtn.innerText = "Download"
        deb2 = false
    }
   }
})