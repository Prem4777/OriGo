
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SplashScreen } from './components/splash-screen';
import { LoginScreen } from './components/login-screen';
import { SignupScreen } from './components/signup-screen';
import { WelcomeScreen } from './components/welcome-screen';
import { PrivacyConsent } from './components/privacy-consent';
import { MainDashboard } from './components/main-dashboard';
import { NatpacLogin } from './components/natpac-login';
import { NatpacDashboard } from './components/natpac-dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  const handleSplashComplete = () => setCurrentScreen('signup');
  const handleLogin = () => setCurrentScreen('dashboard');
  const handleSignup = () => setCurrentScreen('welcome');
  const handleGoToSignup = () => setCurrentScreen('signup');
  const handleSkipSignup = () => setCurrentScreen('welcome');
  const handleNatpacLogin = () => setCurrentScreen('natpac-login');
  const handleBackToLogin = () => setCurrentScreen('login');
  const handleNatpacAccess = () => setCurrentScreen('natpac-dashboard');
  const handleNatpacLogout = () => setCurrentScreen('login');
  const handleWelcomeContinue = () => setCurrentScreen('consent');
  const handleConsentAccept = () => setCurrentScreen('dashboard');
  const handleConsentDecline = () => setCurrentScreen('welcome');
  const handleUserLogout = () => setCurrentScreen('login');

  console.log('App loaded, currentScreen:', currentScreen);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {currentScreen === 'splash' && (
          console.log('Rendering SplashScreen'),
          <SplashScreen onComplete={handleSplashComplete} />
        )}
        {currentScreen === 'login' && (
          console.log('Rendering LoginScreen'),
          <LoginScreen 
            onLogin={handleLogin} 
            onSignup={handleGoToSignup}
            onNatpacLogin={handleNatpacLogin}
          />
        )}
        {currentScreen === 'signup' && (
          console.log('Rendering SignupScreen'),
          <SignupScreen onSignup={handleSignup} onSkip={handleSkipSignup} />
        )}
        {currentScreen === 'natpac-login' && (
          console.log('Rendering NatpacLogin'),
          <NatpacLogin 
            onLogin={handleNatpacAccess}
            onBack={handleBackToLogin}
          />
        )}
        {currentScreen === 'natpac-dashboard' && (
          console.log('Rendering NatpacDashboard'),
          <NatpacDashboard onLogout={handleNatpacLogout} />
        )}
        {currentScreen === 'welcome' && (
          console.log('Rendering WelcomeScreen'),
          <WelcomeScreen onContinue={handleWelcomeContinue} />
        )}
        {currentScreen === 'consent' && (
          console.log('Rendering PrivacyConsent'),
          <PrivacyConsent 
            onAccept={handleConsentAccept} 
            onDecline={handleConsentDecline} 
          />
        )}
        {currentScreen === 'dashboard' && (
          console.log('Rendering MainDashboard'),
          <MainDashboard onLogout={handleUserLogout} />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
