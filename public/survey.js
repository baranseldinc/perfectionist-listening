var selectedHours = [];
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
        hour.classList.toggle('bg-selected');
        const data = parentValue + '#' + value;
        const indexOf = selectedHours.indexOf(data)
        if (hour.classList.contains('bg-selected')) {
            if (indexOf === -1) {
                selectedHours.push(data);
            }
        } else {
            if (indexOf > -1) {
                selectedHours.splice(indexOf, 1);
            }
        }
        console.log(selectedHours);
    });
})
const username = localStorage.getItem('username');

setTimeout(() => {
    if (username) {
        window.persistence.getUserData(username, data => {
            window.userData = data;
            selectedHours = data.response;
            renderTable();
        }, error => {
            alert(username + ' kullanıcısına ait veriler sunucudan alınamadı.');
            console.log(error);
        })
    }
}, 2000);


function renderTable() {
    selectedHours.forEach(item => {
        const dataArr = item.split('#');
        const parentValue = dataArr[0];
        const value = dataArr[1];

        const element = document.querySelector(`.day-box[data-value="${parentValue}"] .hour-box[data-value="${value}"]`)
        element.classList.toggle('bg-selected');
    })
}

function kaydet() {
    if (username) {
        window.persistence.updateUserResponse(username, selectedHours, () => {
            alert('Başarıyla güncellendi..!');
        }, err => {
            alert('HATA: güncelleme işlemi başarısız!');
            console.log(err);
        });
    } else {
        let xusername = prompt('Kendiniz için bir kullanıcı adı belirtin:');
        if (!xusername) {
            return;
        }
        window.persistence.checkUserName(xusername, success => {
            if (success) {
                window.persistence.insertResponse(xusername, selectedHours, () => {
                    alert('Cevaplarınız başarıyla kaydedildi');
                }, () => {
                    alert('HATA: kaydetme işlemi başarısız');
                    console.log(err);
                });
            } else {
                alert(`'${xusername}' başka bir kullanıcı tarafından kullanılıyor. Lütfen başka bir kullanıcı adı deneyin.`);
                return;
            }
        })
    }
}