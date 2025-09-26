import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Shield, Lock, Eye, Database, Users, MapPin, Clock, Zap, Gift, Camera, BarChart3 } from 'lucide-react-native';
// import { lightTheme } from '../theme';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Checkbox } from './ui/checkbox';

export function PrivacyConsent({ onAccept, onDecline }) {
  // Simplified for testing
  const [accepted, setAccepted] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={[styles.scrollWrap, { paddingBottom: insets.bottom + 140 }]}>
        <View style={styles.headerWrap}>
          <Text style={styles.headerTitle}>Privacy & Data Consent</Text>
          <Text style={styles.headerDesc}>Your privacy matters. Please review and consent to data collection.</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardHeaderText}>Data Collection Consent</Text>
          <Text style={styles.cardNoticeText}>
            We need your consent to collect travel data for Kerala's metro planning.
          </Text>
          
          <TouchableOpacity 
            style={[styles.checkbox, accepted && styles.checkboxChecked]} 
            onPress={() => setAccepted(!accepted)}
          >
            <Text style={styles.checkboxText}>{accepted ? '✓' : ''}</Text>
          </TouchableOpacity>
          <Text style={styles.consentText}>I agree to data collection</Text>
        </View>
      </ScrollView>
      
      <View style={[styles.footer, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity
          onPress={onAccept}
          disabled={!accepted}
          style={[styles.acceptButton, !accepted && styles.acceptButtonDisabled]}
        >
          <Text style={styles.acceptButtonText}>Accept & Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDecline}
          style={styles.declineButton}
        >
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    padding: 16,
  },
  scrollWrap: {
    // dynamic paddingBottom added in component using safe area
  },
  headerWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    color: '#1e293b',
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  headerDesc: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 0,
  },
  cardHeaderText: {
    fontSize: 15,
    color: '#1e293b',
    fontWeight: '700',
    marginBottom: 8,
  },
  cardNoticeText: {
    color: '#059669',
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  checkboxChecked: {
    backgroundColor: '#059669',
  },
  checkboxText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  consentText: {
    fontSize: 14,
    color: '#1e293b',
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
  acceptButton: {
    width: '100%',
    backgroundColor: '#059669',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  acceptButtonDisabled: {
    opacity: 0.5,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  declineButton: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: '#fff',
  },
  declineButtonText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },
});
