// --- Theme Toggle ---
document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// --- Mock fetchWeather function ---
async function fetchWeatherMock(city) {
  await new Promise(r => setTimeout(r, 500));
  const now = new Date();
  const forecast = [];
  for (let i = 1; i <= 5; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    forecast.push({
      day: d.toLocaleDateString(undefined, { weekday: 'short' }),
      temp: 20 + Math.random() * 10,
      icon: ''
    });
  }
  return {
    name: city,
    temp: 25 + Math.random() * 6,
    humidity: Math.round(40 + Math.random() * 40),
    wind: (1 + Math.random() * 6).toFixed(1),
    condition: ['Sunny','Cloudy','Rainy','Partly Cloudy'][Math.floor(Math.random()*4)],
    icon: '',
    forecast
  };
}

// --- Render Current Weather ---
function renderCurrent(data) {
  document.getElementById('cityName').textContent = data.name || '—';
  document.getElementById('conditionText').textContent = data.condition || '—';
  document.getElementById('temp').textContent = Math.round(data.temp) + '°C';
  document.getElementById('humidity').textContent = data.humidity;
  document.getElementById('wind').textContent = data.wind;
}

// --- Render Forecast ---
function renderForecast(forecast) {
  const container = document.getElementById('forecastCards');
  container.innerHTML = '';
  forecast.forEach(day => {
    const card = document.createElement('div');
    card.className = 'card fade-in';
    card.innerHTML = `
      <h3>${day.day}</h3>
      <p>${Math.round(day.temp)} °C</p>
      <p>${day.icon || '🌤️'}</p>
    `;
    container.appendChild(card);
  });
}

// --- Do Search ---
async function doSearch(city) {
  if (!city) return;
  const data = await fetchWeatherMock(city);
  renderCurrent(data);
  renderForecast(data.forecast);
}

// --- Event Listeners ---
document.getElementById('searchBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  doSearch(city);
});

document.getElementById('cityInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    doSearch(e.target.value.trim());
  }
});
