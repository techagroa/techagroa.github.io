export interface DistrictWeatherData {
  district: string;
  province: string;
  season: string;
  temp: number;
  condition: string;
  icon: string;
  advisory: string;
  humidity: number;
  wind: number;
  rainProbability: number;
  updatedTime: string;
  forecast: {
    day: string;
    date: string;
    temp: string;
    condition: string;
    icon: string;
  }[];
}

const DISTRICT_PROVINCES: Record<string, string> = {
  Polonnaruwa: 'North Central Province',
  Anuradhapura: 'North Central Province',
  Kurunegala: 'North Western Province',
  Ampara: 'Eastern Province',
  Matara: 'Southern Province',
  Colombo: 'Western Province',
  Gampaha: 'Western Province',
  Kalutara: 'Western Province',
  Kandy: 'Central Province',
  Matale: 'Central Province',
  'Nuwara Eliya': 'Central Province',
  Galle: 'Southern Province',
  Hambantota: 'Southern Province',
  Jaffna: 'Northern Province',
  Kilinochchi: 'Northern Province',
  Mannar: 'Northern Province',
  Vavuniya: 'Northern Province',
  Mullaitivu: 'Northern Province',
  Batticaloa: 'Eastern Province',
  Trincomalee: 'Eastern Province',
  Puttalam: 'North Western Province',
  Badulla: 'Uva Province',
  Monaragala: 'Uva Province',
  Ratnapura: 'Sabaragamuwa Province',
  Kegalle: 'Sabaragamuwa Province'
};

export function getDistrictWeather(district: string = 'Polonnaruwa'): DistrictWeatherData {
  const province = DISTRICT_PROVINCES[district] || 'North Central Province';
  const now = new Date();
  
  // Sri Lanka Colombo Time string
  const timeString = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Colombo',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Determine current cultivation season
  const month = now.getMonth() + 1;
  const isYala = month >= 3 && month <= 8;
  const season = isYala ? 'Yala Season 2026' : 'Maha Season 2025/26';

  // Realistic climate variations by zone
  let temp = 31;
  let humidity = 78;
  let wind = 14;
  let condition = 'Thunderstorm with rain';
  let icon = 'ti-cloud-rain';
  let advisory = 'High humidity alerts for fungal blast in seedling nurseries. Ensure perimeter canal drainage.';

  if (district === 'Nuwara Eliya' || district === 'Badulla') {
    temp = 18;
    humidity = 88;
    wind = 18;
    condition = 'Misty with light drizzle';
    icon = 'ti-cloud-fog';
    advisory = 'Cold spells expected. Protect sensitive vegetable nurseries from frost.';
  } else if (district === 'Jaffna' || district === 'Mannar' || district === 'Hambantota') {
    temp = 34;
    humidity = 68;
    wind = 22;
    condition = 'Sunny & Dry';
    icon = 'ti-sun';
    advisory = 'High evaporation rates. Schedule drip irrigation during early mornings.';
  } else if (district === 'Colombo' || district === 'Gampaha' || district === 'Kalutara') {
    temp = 30;
    humidity = 82;
    wind = 12;
    condition = 'Scattered showers';
    icon = 'ti-cloud-rain';
    advisory = 'Inter-monsoonal showers active. Clear field bund drainage channels.';
  }

  // Generate 5-day forecast with real upcoming dates
  const forecast = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 0; i < 5; i++) {
    const fDate = new Date(now.getTime() + i * 86400000);
    const dayName = i === 0 ? 'Today' : days[fDate.getDay()];
    const dateStr = `${fDate.getDate()} ${months[fDate.getMonth()]}`;
    const fTemp = `${temp - (i % 2)}° / ${temp - 7}°`;
    const fCond = i % 2 === 0 ? 'Rain' : 'Cloudy';
    const fIcon = i % 2 === 0 ? 'ti-cloud-rain' : 'ti-cloud';

    forecast.push({
      day: dayName,
      date: dateStr,
      temp: fTemp,
      condition: fCond,
      icon: fIcon
    });
  }

  return {
    district,
    province,
    season,
    temp,
    condition,
    icon,
    advisory,
    humidity,
    wind,
    rainProbability: 75,
    updatedTime: `Updated today, ${timeString} (Asia/Colombo)`,
    forecast
  };
}
