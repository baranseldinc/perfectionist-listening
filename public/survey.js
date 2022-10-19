const selectedHours = [];
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