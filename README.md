# WeatherWise Widget

A modern, responsive weather dashboard application that provides real-time weather information and forecasts. Built with vanilla JavaScript and designed for optimal user experience across all devices.

## Features

### Core Functionality
- 🌤️ **Current Weather**: Real-time weather conditions for any city
- 📅 **5-Day Forecast**: Extended weather predictions
- 📍 **Geolocation**: Automatic weather for current location
- 🔍 **Smart Search**: City suggestions and autocomplete
- 📱 **Responsive Design**: Optimized for all screen sizes

### Advanced Features
- 💾 **Recent Searches**: Quick access to previously searched cities
- 🎨 **Modern UI**: Clean, professional interface with smooth animations
- ⚡ **Fast Performance**: Optimized JavaScript for quick loading
- 🌐 **API Integration**: Ready for OpenWeatherMap API integration
- 📊 **Detailed Metrics**: Humidity, wind speed, pressure, UV index

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Design**: CSS Grid, Flexbox, Modern Gradients
- **Icons**: Font Awesome 4.7.0
- **Storage**: Browser Local Storage
- **API**: OpenWeatherMap API (integration ready)

## Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Internet connection for weather data
- OpenWeatherMap API key (for production use)

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. For production: Add your OpenWeatherMap API key to `script.js`

### API Setup (Production)
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Replace `demo_key` in `script.js` with your actual API key
4. Update the API endpoints as needed

## Usage

### Basic Operations
1. **Search by City**: Enter city name and click search or press Enter
2. **Use Current Location**: Click the location button for automatic detection
3. **View Forecast**: Scroll down to see 5-day weather predictions
4. **Check Details**: View detailed weather metrics below the forecast
5. **Recent Searches**: Click on recent cities for quick access

### Features
- **Auto-suggestions**: Start typing to see city suggestions
- **Responsive Layout**: Works perfectly on mobile and desktop
- **Error Handling**: Clear error messages for failed requests
- **Local Storage**: Remembers your recent searches

## Browser Support

- Chrome 50+
- Firefox 45+
- Safari 10+
- Edge 12+
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

```
weatherwise-widget/
├── index.html          # Main HTML structure
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md          # Project documentation
```

## Customization

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- Update CSS variables for consistent theming
- Customize responsive breakpoints as needed

### Functionality
- Add more weather metrics in `displayWeatherDetails()`
- Extend forecast period beyond 5 days
- Implement weather alerts and notifications
- Add weather maps integration

## Future Enhancements

- [ ] Weather maps integration
- [ ] Severe weather alerts
- [ ] Historical weather data
- [ ] Weather widgets for embedding
- [ ] Dark/light theme toggle
- [ ] Multiple location tracking
- [ ] Weather notifications
- [ ] Offline functionality

## API Endpoints

The application is designed to work with OpenWeatherMap API:
- Current Weather: `/weather`
- 5-Day Forecast: `/forecast`
- Geocoding: `/geo/1.0/direct`

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

MIT License - feel free to use this code for your own projects!

---

*Built with ❤️ for weather enthusiasts everywhere*
