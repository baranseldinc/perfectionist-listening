const audio = document.querySelector('audio');
var perEngWorkApp = {}
var timer = undefined;
var videoName = '';
var videoNotes = '';
var videoLastCurrentTime = '';

if (!localStorage.getItem('perEngWorkApp')) {
    localStorage.setItem('perEngWorkApp', JSON.stringify(perEngWorkApp));
} else {
    perEngWorkApp = JSON.parse(localStorage.getItem('perEngWorkApp'));
}

const setAudioSource = (link, callback, errorCallback) => {
    saveData('link', link);
    audio.src = link;
    audio.addEventListener('loadedmetadata', callback, false);
    audio.addEventListener('error', errorCallback, false);
}

const saveData = (key, value) => {
    perEngWorkApp[key] = value;
    localStorage.setItem('perEngWorkApp', JSON.stringify(perEngWorkApp));
}

const getData = key => {
    return perEngWorkApp[key];
}

const srcLink = getReqParam('srcLink');
if (srcLink) {
    setAudioSource(srcLink, () => {
        videoName = 'video-' + audio.duration.toString();
        videoNotes = videoName + '-notes';
        videoLastCurrentTime = videoName + '-last-current-time';

        const lastCurrentTime = getData(videoLastCurrentTime);
        const notes = getData(videoNotes);
        if (lastCurrentTime)
            audio.currentTime = lastCurrentTime;

        if (notes) {
            document.querySelector('textarea').value = notes;
        }

        showMessage('Ready!');
        audio.play();
        timer = setInterval(main, 2000);
    }, () => {
        showMessage('Video akışı sağlanamadı. Lütfen ders bağlantısını google drive üzerinden yeniden açın ve konsoldan kodu çalıştırın.');
        alert('Video akışı sağlanamadı. Lütfen ders bağlantısını google drive üzerinden yeniden açın ve konsoldan kodu çalıştırın.');
        if(timer)
            clearInterval(timer);
    });
} else {
    showMessage('Kaynak bağlantısı alınamadı! Lütfen ders bağlantısını google drive üzerinden yeniden açın ve konsoldan kodu çalıştırın.');
}

function showMessage(message) {
    document.querySelector('.note-section-status').innerHTML = message;
}


function saveCurrentDuration() {
    saveData(videoName, audio.currentTime)
}

function main() {
    saveData(videoLastCurrentTime, audio.currentTime);
    saveData(videoNotes, document.querySelector('textarea').value);
}


function getReqParam(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

function copyCode() {
    const origin = document.location.origin + '?srcLink=';
    const code = `var all = document.querySelectorAll('audio');\
    var audio = Array.from(all).filter(item => item.currentSrc)[0];\
    var src = audio.currentSrc;\
    audio.pause();\
    window.open('${origin}' + src);`;
    async function copyOperation(text) {
        await navigator.clipboard.writeText(text)
        alert('Kopyalandı. Dersin ses kaydını açtığınız ekranda konsola yapıştırıp enter\'layın!')
    }
    
    
    setTimeout(() => { copyOperation(code) }, 1000)
}