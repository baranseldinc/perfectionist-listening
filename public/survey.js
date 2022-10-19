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
        console.log(value, parentValue);
    });
})