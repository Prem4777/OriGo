import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { lightTheme } from '../theme';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MapPin, Users, Camera, Zap, Shield, Gift, BarChart3, Link2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export function WelcomeScreen({ onContinue }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const insets = useSafeAreaInsets();

  const features = [
    {
      icon: <MapPin color="#059669" size={32} />,
      title: 'Smart Travel Tracking',
      description: 'Automatically log your daily journeys across Kerala with precise origin-to-destination mapping.'
    },
    {
      icon: <Users color="#2563eb" size={32} />,
      title: 'Co-Traveler Connect',
      description: 'Scan unique QR codes to log group travels and help NATPAC understand travel patterns.'
    },
    {
      icon: <Camera color="#7c3aed" size={32} />,
      title: 'Community Forum',
      description: 'Share scenic captures and connect with fellow travelers in Kerala.'
    },
    {
      icon: <Zap color="#eab308" size={32} />,
      title: 'Energy Saving Mode',
      description: 'GPS activates only when movement is detected, preserving your battery life.'
    },
    {
      icon: <Shield color="#dc2626" size={32} />,
      title: 'Blockchain Consent',
      description: 'Your privacy is secured with blockchain-based consent management.'
    },
    {
      icon: <Gift color="#ec4899" size={32} />,
      title: 'Travel Rewards',
      description: 'Earn points and coupons for every kilometer traveled across Kerala.'
    },
    {
      icon: <BarChart3 color="#6366f1" size={32} />,
      title: 'Personal Insights',
      description: 'Get detailed analytics about your travel patterns and preferences.'
    },
    {
      icon: <Link2 color="#14b8a6" size={32} />,
      title: 'Smart Trip Linking',
      description: 'Automatic sequencing for connected trips with unique trip IDs.'
    }
  ];

  const slidesCount = Math.ceil(features.length / 2);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <LinearGradient colors={["#059669", "#34d399"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <View style={styles.headerOverlay} />
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>OriGo</Text>
          <Text style={styles.headerSubtitle}>Building Kerala's future together</Text>
        </View>
      </LinearGradient>

      {/* Features */}
      <ScrollView contentContainerStyle={[styles.featuresWrap, { paddingBottom: insets.bottom + 140 }]}>
        <View style={styles.featuresInner}>
          <Text style={styles.featuresTitle}>Discover Amazing Features</Text>
          <Text style={styles.featuresSubtitle}>Help shape Kerala's transportation future while earning rewards</Text>

          {/* Feature cards carousel */}
          <View style={styles.cardsWrap}>
            {features.slice(currentSlide * 2, (currentSlide * 2) + 2).map((feature, index) => (
              <Card key={currentSlide * 2 + index} style={styles.card}>
                <View style={styles.cardContent}>
                  <View style={styles.iconWrap}>{feature.icon}</View>
                  <View style={styles.cardTextWrap}>
                    <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">{feature.title}</Text>
                    <Text style={styles.cardDesc} numberOfLines={3} ellipsizeMode="tail">{feature.description}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          {/* Navigation dots */}
          <View style={styles.dotsWrap}>
            {Array.from({ length: slidesCount }).map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentSlide(index)}
                style={[styles.dot, index === currentSlide && styles.dotActive]}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <Button onPress={onContinue} style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Get Started</Text>
        </Button>
        <Text style={styles.footerNote}>
          By continuing, you agree to help improve Kerala's metro planning
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.background,
  },
  header: {
    height: 160,
    backgroundColor: '#059669',
    justifyContent: 'flex-end',
    position: 'relative',
    paddingTop: 20,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerTextWrap: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  featuresWrap: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100,
  },
  featuresInner: {
    maxWidth: 400,
    alignSelf: 'center',
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  featuresSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
    textAlign: 'center',
  },
  cardsWrap: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    marginBottom: 12,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  iconWrap: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: '#64748b',
  },
  dotsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#059669',
    width: 24,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 6,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerNote: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
});
