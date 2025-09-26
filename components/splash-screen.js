import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export function SplashScreen({ onComplete }) {
  // Removed animations for pulse and loading dots for a static splash experience

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    // Removed pulse and loading dot animations
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Header gradient */}
      <View style={styles.gradientBg} />
      {/* Content */}
      <View style={styles.content}>
        {/* App Logo/Icon with pulse */}
        <View style={styles.logoWrap}>
          <View style={styles.logoPulse} />
          <View style={styles.logoIconWrap}>
            <MapPin color="#fff" size={48} />
          </View>
        </View>
        {/* App Name */}
        <View style={styles.titleWrap}>
          <Text style={styles.title}>OriGo</Text>
          <View style={styles.titleDividerWrap}>
            <View style={styles.titleDivider} />
            <Text style={styles.titleSubtitle}>Kerala Travel Companion</Text>
            <View style={styles.titleDivider} />
          </View>
          <Text style={styles.titleDesc}>Building Kerala's future together • Powered by NATPAC</Text>
        </View>
        {/* Features highlight */}
        <View style={styles.featuresRow}>
          <View style={styles.featureCol}>
            <View style={styles.featureIconWrap}><MapPin color="#fff" size={20} /></View>
            <Text style={styles.featureText}>Smart Tracking</Text>
          </View>
          <View style={styles.featureCol}>
            <View style={styles.featureIconWrap}><Zap color="#fff" size={20} /></View>
            <Text style={styles.featureText}>Energy Saving</Text>
          </View>
          <View style={styles.featureCol}>
            <View style={styles.featureIconWrap}><Text style={{fontSize:16}}>🎁</Text></View>
            <Text style={styles.featureText}>Rewards</Text>
          </View>
        </View>
        {/* Loading indicator */}
        <View style={styles.loadingWrap}>
          <View style={styles.loadingDot} />
          <View style={styles.loadingDot} />
          <View style={styles.loadingDot} />
        </View>
        {/* Version info */}
        <View style={styles.versionWrap}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#022c22',
    position: 'relative',
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#022c22',
    opacity: 0.95,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    zIndex: 10,
  },
  logoWrap: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoPulse: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignSelf: 'center',
  },
  logoIconWrap: {
    width: 96,
    height: 96,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    marginBottom: 0,
  },
  titleWrap: {
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  titleDividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleDivider: {
    height: 1,
    width: 32,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 8,
  },
  titleSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    paddingHorizontal: 8,
  },
  titleDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 18,
  },
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  featureCol: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  featureIconWrap: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  featureText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  loadingWrap: {
    flexDirection: 'row',
    marginBottom: 32,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginHorizontal: 2,
  },
  versionWrap: {
    position: 'absolute',
    bottom: 16,
    left: width / 2 - 60,
    width: 120,
    alignItems: 'center',
  },
  versionText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
});
