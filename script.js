// WeatherWise Widget - Weather Dashboard Application
class WeatherWidget {
    constructor() {
        this.apiKey = 'demo_key'; // In production, use environment variables
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.recentSearches = JSON.parse(localStorage.getItem('weatherwise-recent')) || [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadRecentSearches();
        this.showDemo(); // Show demo data since we don't have real API key
    }

    bindEvents() {
        document.getElementById('searchBtn').addEventListener('click', () => this.searchWeather());
        document.getElementById('cityInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchWeather();
        });
        document.getElementById('locationBtn').addEventListener('click', () => this.getCurrentLocation());
        document.getElementById('dismissError').addEventListener('click', () => this.hideError());
        
        // City input suggestions
        document.getElementById('cityInput').addEventListener('input', (e) => {
            this.showSuggestions(e.target.value);
        });
    }

    async searchWeather() {
        const city = document.getElementById('cityInput').value.trim();
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        this.showLoading();
        
        try {
            // Since we don't have a real API key, show demo data
            this.showDemo(city);
            this.addToRecentSearches(city);
        } catch (error) {
            this.showError('Failed to fetch weather data. Please try again.');
        }
    }

    showDemo(city = 'New York') {
        // Demo weather data
        const demoData = {
            current: {
                city: city,
                country: 'US',
                temperature: 22,
                description: 'partly cloudy',
                icon: 'fa-cloud',
                humidity: 65,
                windSpeed: 12,
                pressure: 1013,
                visibility: 10,
                uvIndex: 5,
                feelsLike: 25
            },
            forecast: [
                { day: 'Today', icon: 'fa-cloud', high: 25, low: 18 },
                { day: 'Tomorrow', icon: 'fa-sun', high: 28, low: 20 },
                { day: 'Wednesday', icon: 'fa-cloud-rain', high: 23, low: 16 },
                { day: 'Thursday', icon: 'fa-sun', high: 26, low: 19 },
                { day: 'Friday', icon: 'fa-cloud', high: 24, low: 17 }
            ]
        };

        this.displayCurrentWeather(demoData.current);
        this.displayForecast(demoData.forecast);
        this.displayWeatherDetails(demoData.current);
        this.hideLoading();
    }

    displayCurrentWeather(data) {
        const currentWeather = document.getElementById('currentWeather');
        currentWeather.innerHTML = `
            <div class="weather-main">
                <div class="temperature">${data.temperature}°C</div>
                <div class="weather-icon">
                    <i class="fa ${data.icon}"></i>
                </div>
            </div>
            <div class="weather-info">
                <h2>${data.city}, ${data.country}</h2>
                <div class="weather-description">${data.description}</div>
                <div class="location-info">
                    <i class="fa fa-map-marker"></i> 
                    Feels like ${data.feelsLike}°C
                </div>
            </div>
        `;
    }

    displayForecast(forecast) {
        const forecastContainer = document.getElementById('forecastContainer');
        forecastContainer.innerHTML = forecast.map(day => `
            <div class="forecast-item">
                <div class="forecast-day">${day.day}</div>
                <div class="forecast-icon">
                    <i class="fa ${day.icon}"></i>
                </div>
                <div class="forecast-temp">
                    <strong>${day.high}°</strong> / ${day.low}°
                </div>
            </div>
        `).join('');
    }

    displayWeatherDetails(data) {
        const detailsGrid = document.getElementById('detailsGrid');
        detailsGrid.innerHTML = `
            <div class="detail-item">
                <div class="detail-icon"><i class="fa fa-tint"></i></div>
                <div class="detail-info">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${data.humidity}%</div>
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-icon"><i class="fa fa-wind"></i></div>
                <div class="detail-info">
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value">${data.windSpeed} km/h</div>
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-icon"><i class="fa fa-thermometer"></i></div>
                <div class="detail-info">
                    <div class="detail-label">Pressure</div>
                    <div class="detail-value">${data.pressure} hPa</div>
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-icon"><i class="fa fa-eye"></i></div>
                <div class="detail-info">
                    <div class="detail-label">Visibility</div>
                    <div class="detail-value">${data.visibility} km</div>
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-icon"><i class="fa fa-sun-o"></i></div>
                <div class="detail-info">
                    <div class="detail-label">UV Index</div>
                    <div class="detail-value">${data.uvIndex}</div>
                </div>
            </div>
        `;
    }

    showSuggestions(query) {
        if (query.length < 2) {
            document.getElementById('suggestions').style.display = 'none';
            return;
        }

        // Demo city suggestions
        const cities = [
            'New York, US', 'London, UK', 'Tokyo, JP', 'Paris, FR', 
            'Sydney, AU', 'Berlin, DE', 'Toronto, CA', 'Mumbai, IN'
        ];

        const filtered = cities.filter(city => 
            city.toLowerCase().includes(query.toLowerCase())
        );

        if (filtered.length > 0) {
            const suggestions = document.getElementById('suggestions');
            suggestions.innerHTML = filtered.map(city => 
                `<div class="suggestion-item" onclick="weatherWidget.selectSuggestion('${city.split(',')[0]}')">${city}</div>`
            ).join('');
            suggestions.style.display = 'block';
        } else {
            document.getElementById('suggestions').style.display = 'none';
        }
    }

    selectSuggestion(city) {
        document.getElementById('cityInput').value = city;
        document.getElementById('suggestions').style.display = 'none';
        this.searchWeather();
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // In a real app, you'd use coordinates to get weather
                    this.showDemo('Your Location');
                },
                (error) => {
                    this.showError('Unable to get your location. Please search manually.');
                }
            );
        } else {
            this.showError('Geolocation is not supported by this browser.');
        }
    }

    addToRecentSearches(city) {
        if (!this.recentSearches.includes(city)) {
            this.recentSearches.unshift(city);
            this.recentSearches = this.recentSearches.slice(0, 5); // Keep only 5 recent
            localStorage.setItem('weatherwise-recent', JSON.stringify(this.recentSearches));
            this.loadRecentSearches();
        }
    }

    loadRecentSearches() {
        const recentList = document.getElementById('recentList');
        if (this.recentSearches.length === 0) {
            recentList.innerHTML = '<p style="color: #666;">No recent searches</p>';
            return;
        }

        recentList.innerHTML = this.recentSearches.map(city => 
            `<div class="recent-item" onclick="weatherWidget.searchRecentCity('${city}')">${city}</div>`
        ).join('');
    }

    searchRecentCity(city) {
        document.getElementById('cityInput').value = city;
        this.searchWeather();
    }

    showLoading() {
        document.getElementById('loadingSpinner').style.display = 'block';
        document.querySelector('.weather-main')?.remove();
        document.querySelector('.weather-info')?.remove();
    }

    hideLoading() {
        document.getElementById('loadingSpinner').style.display = 'none';
    }

    showError(message) {
        document.getElementById('errorText').textContent = message;
        document.getElementById('errorMessage').style.display = 'block';
    }

    hideError() {
        document.getElementById('errorMessage').style.display = 'none';
    }
}

// Initialize the weather widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weatherWidget = new WeatherWidget();
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-section')) {
        document.getElementById('suggestions').style.display = 'none';
    }
});
// Weather API improvements
// Add geolocation fallback
