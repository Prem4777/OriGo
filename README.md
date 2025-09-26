# OriGo - Kerala Transportation Planning App

OriGo is a comprehensive mobile application designed to track travel patterns and contribute to Kerala state transportation planning through NATPAC (National Transportation Planning and Research Centre).

## 🌟 Features

### For Regular Users
- **Trip Tracking**: Real-time trip monitoring with start/pause functionality
- **Co-traveler Connect**: QR code-based system to connect with fellow travelers
- **Community Sharing**: Share scenic photos and discover popular Kerala destinations
- **Rewards System**: Earn points for trips and unlock Kerala tourism rewards
- **Personal Insights**: Track your travel patterns and distances

### For NATPAC Administrators
- **Analytics Dashboard**: Comprehensive view of Kerala transportation data
- **Real-time Monitoring**: Live trip data and transportation capacity tracking
- **Daily Reports**: Automated daily summaries with key metrics
- **Data Export**: CSV export functionality for further analysis

## 🚀 Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and toolchain (~54.0.10)
- **React Navigation**: Navigation library for seamless user experience
- **Lucide React Native**: Beautiful icons and graphics
- **React Native Chart Kit**: Data visualization for analytics
- **Expo Linear Gradient**: Enhanced UI gradients
- **React Native SVG**: Scalable vector graphics support

## 📱 App Structure

### User Interface
1. **Splash Screen**: Welcome screen with privacy consent
2. **Authentication**: Signup/Login system
3. **Main Dashboard**: 5-tab navigation (Home, Trips, Connect, Community, Insights)
4. **Trip Tracking**: Real-time journey monitoring
5. **Community Feed**: Photo sharing and trending destinations

### Admin Interface
6. **NATPAC Dashboard**: Professional analytics interface with charts and reports

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- React Native development environment

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/origo.git
   cd origo
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm start
   # or
   expo start
   ```

4. **Run on device/simulator**
   ```sh
   # For Android
   npm run android
   
   # For iOS (macOS only)
   npm run ios
   
   # For Web
   npm run web
   ```

## 📊 Key Components

### Project Structure
- `App.js`: Main entry point and navigation setup
- `components/main-dashboard.js`: User interface with 5-tab navigation
- `components/natpac-dashboard.js`: Admin analytics dashboard
- `components/ui/`: Reusable UI components (Button, Card, Badge, Progress)
- `package.json`: Project configuration and dependencies

## 🎨 Design Features

- **Modern UI**: Clean, professional design with consistent theming
- **Responsive Layout**: Optimized for different screen sizes
- **Kerala Theme**: Color scheme reflecting Kerala's natural beauty
- **Professional Analytics**: Dashboard suitable for government presentations
- **Accessible Design**: Proper contrast ratios and readable typography

## 🔐 Privacy & Data Protection

- **Consent-based Data Sharing**: Users explicitly consent before sharing trip data
- **Anonymized Analytics**: Personal identity remains private in all shared data
- **Transparent Communication**: Clear explanation of what data is collected and why
- **User Control**: Users can decline data sharing while still using the app


## 📈 Data Insights

The app provides valuable insights for transportation planning:
- Peak hour analysis
- Popular destination tracking
- Transportation mode preferences
- Group travel patterns
- Infrastructure demand forecasting

## 🔄 Version History

- **v1.0.0**: Initial release with core trip tracking and analytics features
  - User dashboard with 5-tab navigation
  - NATPAC admin dashboard with comprehensive analytics
  - Data sharing consent system
  - Community features and rewards system

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit)

---

**Built with ❤️ for Kerala's transportation future**

*Contributing to smarter, more connected transportation planning through community-driven data collection and analysis.*
