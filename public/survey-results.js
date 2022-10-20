var hoursResults = {};
const allHours = document.querySelectorAll('.hour-box');
const shortDays = {
    pazartesi: 'Pzt',
    sali: 'Sal',
    carsamba: 'Çrs',
    persembe: 'Prs',
    cuma: 'Cuma',
    cumartesi: 'Cts',
    pazar: ' Pzr'
}

Array.from(allHours).forEach(hour => {
    const value = hour.dataset.value;
    const parentValue = hour.parentElement.dataset.value;
    const shortParentValue = shortDays[parentValue];
    // hour.innerText = `${shortParentValue}\n${value}`;
    hour.innerHTML = `<strong>${shortParentValue}</strong>\
    <span>${value}</span>`;

    hour.addEventListener('click', e => {
        let text = '';
        hoursResults[parentValue + '#' + value].forEach(item => {
            text += " - " + item + "\n";
        })
        alert(text);
    });
})
const username = localStorage.getItem('username');

if (username) {
    setTimeout(() => {
        main();
    }, 2000);
} else {
    document.writeln('Bu sayfayı (oy kullanmadığınız için) görme yetkiniz bulunmamaktadır. ')
}

function main() {
    window.persistence.getAllData(res => {
        let maxLength = 0;
        for (let item in res) {
            let responseArray = res[item].response;
            responseArray?.forEach(xx => {
                if (!hoursResults[xx]) {
                    hoursResults[xx] = []
                }
                hoursResults[xx].push(item);
                if (hoursResults[xx].length > maxLength)
                    maxLength = hoursResults[xx].length;

            })
        }
        renderTable(maxLength);
        document.querySelector('.availability-table').style.display = 'flex';

    }, error => {
        console.log(error);
        alert('HATA: Veriler sunucudan alınamadı.');
    })
}

function renderTable(maxLength) {
    for (vote in hoursResults) {
        const votedUsersArray = hoursResults[vote];
        const splittedArr = vote.split('#');
        const day = splittedArr[0];
        const hour = splittedArr[1];
        const element = document.querySelector(`.day-box[data-value="${day}"] .hour-box[data-value="${hour}"]`);

        const maxDiff = (maxLength < 1 ? 1 : maxLength) - 1;
        const base = 0;
        const step = Math.floor((255 - base) / 9);
        let decimal = (votedUsersArray.length * step + base);
        if (decimal > 254)
            decimal = 254;
        const hexCode = (decimal).toString(16);
        element.style.backgroundColor = '#9f9322' + hexCode;
    }
}