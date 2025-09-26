import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, Mail, Phone, ArrowRight, MapPin, Users, Gift, Star, Shield, Eye } from 'lucide-react-native';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function SignupScreen({ onSignup, onSkip }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const insets = useSafeAreaInsets();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.name && formData.email && formData.phone;

  const handleSubmit = () => {
    if (isFormValid) {
      onSignup();
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerOverlay} />
        <View style={styles.headerTextWrap}>
          <View style={styles.headerIconRow}>
            <MapPin color="#34d399" size={24} />
            <Text style={styles.headerTitle}>OriGo</Text>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={[styles.scrollWrap, { paddingBottom: insets.bottom + 140 }]}>
          {/* Welcome Message */}
          <View style={styles.welcomeWrap}>
            <Text style={styles.welcomeTitle}>
              Excited to start your journey with OriGo?{' '}
              <Text style={styles.welcomeTitleHighlight}>Sign up here</Text>
            </Text>
            <Text style={styles.welcomeDesc}>
              Join thousands of Kerala travelers helping build our state's future transport system
            </Text>
          </View>
          {/* Signup Form */}
          <Card style={styles.card}>
            <View style={styles.cardHeader}><Text style={styles.cardHeaderText}>Create Your Account</Text></View>
            <View style={styles.cardContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputWrap}>
                  <User color="#a3a3a3" size={18} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChangeText={text => handleInputChange('name', text)}
                    placeholderTextColor="#a3a3a3"
                  />
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.inputWrap}>
                  <Mail color="#a3a3a3" size={18} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChangeText={text => handleInputChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#a3a3a3"
                  />
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.inputWrap}>
                  <Phone color="#a3a3a3" size={18} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChangeText={text => handleInputChange('phone', text)}
                    keyboardType="phone-pad"
                    placeholderTextColor="#a3a3a3"
                  />
                </View>
              </View>
              <Button
                onPress={handleSubmit}
                disabled={!isFormValid}
                style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
              >
                <Text style={styles.submitButtonText}>Start My Journey</Text>
                <ArrowRight color="#fff" size={18} style={{ marginLeft: 8 }} />
              </Button>
            </View>
          </Card>
          {/* Benefits */}
          <Card style={styles.benefitsCard}>
            <View style={styles.cardContent}>
              <Text style={styles.benefitsTitle}>Why join OriGo?</Text>
              <View style={styles.benefitRow}><View style={styles.benefitDot} /><Text style={styles.benefitText}>Earn rewards for every kilometer traveled</Text></View>
              <View style={styles.benefitRow}><View style={styles.benefitDot} /><Text style={styles.benefitText}>Help shape Kerala's metro future</Text></View>
              <View style={styles.benefitRow}><View style={styles.benefitDot} /><Text style={styles.benefitText}>Connect with fellow travelers</Text></View>
              <View style={styles.benefitRow}><View style={styles.benefitDot} /><Text style={styles.benefitText}>Get personalized travel insights</Text></View>
            </View>
          </Card>
          {/* Social Proof */}
          <View style={styles.socialProofWrap}>
            <Text style={styles.socialProofText}>Join <Text style={{ color: '#059669' }}>25,000+</Text> Kerala travelers</Text>
            <View style={styles.starsRow}>
              {[1,2,3,4,5].map(star => (
                <Text key={star} style={styles.star}>⭐</Text>
              ))}
              <Text style={styles.ratingText}>4.8/5 rating</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Footer Options */}
      <View style={styles.footer}>
        <Button
          onPress={onSkip}
          variant="outline"
          style={styles.skipButton}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </Button>
        <Text style={styles.footerNote}>You can always create an account later in settings</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  header: {
    height: 120,
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
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  headerIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 8,
  },
  scrollWrap: {
    padding: 16,
    paddingBottom: 120,
  },
  welcomeWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 30,
  },
  welcomeTitleHighlight: {
    color: '#059669',
    fontWeight: '700',
  },
  welcomeDesc: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 0,
  },
  cardHeader: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cardHeaderText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 4,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 8,
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: '#222',
    backgroundColor: 'transparent',
  },
  submitButton: {
    backgroundColor: '#059669',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  benefitsCard: {
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderColor: '#a7f3d0',
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 18,
  },
  benefitsTitle: {
    color: '#059669',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  benefitDot: {
    width: 6,
    height: 6,
    backgroundColor: '#059669',
    borderRadius: 3,
    marginRight: 8,
  },
  benefitText: {
    color: '#059669',
    fontSize: 13,
  },
  socialProofWrap: {
    alignItems: 'center',
    marginBottom: 18,
  },
  socialProofText: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: '#facc15',
    fontSize: 14,
    marginRight: 1,
  },
  ratingText: {
    fontSize: 11,
    color: '#6b7280',
    marginLeft: 4,
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
  skipButton: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: '#fff',
  },
  skipButtonText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },
  footerNote: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
});
