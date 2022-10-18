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

        showMessage('Ready!')
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

// function copyCode() {
//     const origin = document.location.origin + '?srcLink=';
//     const code = `const audio = document.querySelector('audio');\
//     const src = audio.currentSrc;\
//     window.open('${origin}' + src);`;

//     navigator.clipboard.writeText(code);
//     alert('Kopyalandı');
// }

// function copyCode() {
//     const origin = document.location.origin + '?srcLink=';
//     const code = `const audio = document.querySelector('audio');\
//     const src = audio.currentSrc;\
//     window.open('${origin}' + src);`;

//     var copyText = document.getElementById("copy-my-contents");
//     copyText.innerHTML = code;
//     var range = document.createRange();
//     var selection = window.getSelection();
//     range.selectNodeContents(copyText);  
//     selection.removeAllRanges();
//     selection.addRange(range);
//     document.execCommand("copy");

//     alert('Kopyalandı');
//   }