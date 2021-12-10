const generateBtn = document.querySelector('#generate')
const apiKey = '2033b1129012786caf323567e7480336'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

//listen for click event on genrate button
generateBtn.addEventListener('click', function (e) {
  //hide result
  document.querySelector('.result').style.display = 'none'

  //show loader
  document.querySelector('#loader').style.display = 'block'

  setTimeout(generate, 2000)

  //prevent form default action
  e.preventDefault()
})

//event lister generate function
function generate() {
  //Get country input value
  const country = document.querySelector('#country').value
  //Get weather condition input value
  const weatherCondition = document.querySelector('#condition').value
  //Get date input value
  const date = document.querySelector('#date').value

  //check if input country and waether value are empty
  if (country !== '' && weatherCondition !== '' && date !== '') {
    //fetch temperation
    getWeather(baseUrl, country, apiKey).then((data) => {
      //post current weather data
      postWeather('/postData', {
        temperature: data.main.temp,
        userResponse: weatherCondition,
        date: date,
      })
        .then(function () {
          updateUi()
          //show result
          document.querySelector('.result').style.display = 'block'
          //hide loader
          document.querySelector('#loader').style.display = 'none'
        })
        .catch((err) => {
          console.log(err)
        })
    })
  } else {
    const p = document.createElement('p')
    p.classList.add('error-message')
    p.textContent = 'please enter a country name and weather condition'
    const main = document.querySelector('main')
    main.insertAdjacentElement('afterbegin', p)
    //hide loader
    document.querySelector('#loader').style.display = 'none'
  }
}

const getWeather = async (url, cityName, key) => {
  const response = await fetch(`${url}?q=${cityName}&appid=${key}`)
  if (response.status === 404) {
    const p = document.createElement('p')
    p.classList.add('error-message')
    p.textContent = 'country not found please enter a valid country name'
    const main = document.querySelector('main')
    main.insertAdjacentElement('afterbegin', p)
    setTimeout(function () {
      p.remove('error-message')
    }, 3000)
    //hide loader
    document.querySelector('#loader').style.display = 'none'
  }
  try {
    const newWeather = await response.json()
    return newWeather
  } catch (err) {
    console.log(err)
  }
}

const postWeather = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  })
  try {
    const currentWeatherData = response.json()
    return currentWeatherData
  } catch (err) {
    console.log(err)
  }
}
const updateUi = async () => {
  const response = await fetch('/getData')
  if (response.status === 200) {
    const p = document.createElement('p')
    p.classList.add('success-message')
    p.textContent = 'recent entry generated successfully'
    const main = document.querySelector('main')
    main.insertAdjacentElement('afterbegin', p)
    setTimeout(function () {
      p.remove('success-message')
    }, 3000)
    //hide loader
    document.querySelector('#loader').style.display = 'none'
  }
  try {
    const weather = await response.json()
    document.querySelector(
      '.temp'
    ).innerHTML = `temperature: <span>${weather.temperature} degrees Celsius</span>`
    document.querySelector('.resp').innerHTML = `How is the weather today?
    <span>${weather.userResponse}</span>`
    document.querySelector(
      '.date'
    ).innerHTML = `Date: <span>${weather.date}</span>`
  } catch (err) {
    console.log(err)
  }
}
