function setMaxDate() {
    const date = document.querySelector('input[type="date"]')

    const today_year = today.getFullYear()
    const today_month = today.getMonth()
    const today_date = today.getDate()
    date.max = `${today_year}-${(today_month < 10) ? "0" : ""}${today_month}-${today_date}`
}

function generatePicture() {
    const background = document.querySelector('.s-home--static')
    const day = document.querySelector('h1')
    const date = document.querySelector('input[type="date"]')
    const description = document.querySelector('p')
    let link = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    if (date.value) {
        link += `&date=${date.value}`
    }

    fetch(link)
        .then((res) => res.json())
        .then((data) => {
            const data_date = data.date

            background.style.backgroundImage = `url(${data.hdurl})`
            day.innerText = new Date(data_date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            description.innerText = data.explanation

            date.value = data_date
        })
}

const today = new Date()
const date = document.querySelector('input[type="submit"]')

date.addEventListener('click', generatePicture)

setMaxDate()
generatePicture()