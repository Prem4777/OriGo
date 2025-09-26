import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Mail, Lock, ArrowRight, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function LoginScreen({ onLogin, onSignup, onNatpacLogin }) {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.email && formData.password;

  const handleSubmit = () => {
    if (isFormValid) {
      onLogin();
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <LinearGradient colors={["#059669", "#10b981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <View style={styles.headerOverlay} />
        <View style={styles.headerTextWrap}>
          <View style={styles.headerIconRow}>
            <MapPin color="#34d399" size={24} />
            <Text style={styles.headerTitle}>OriGo</Text>
          </View>
          <Text style={styles.headerSubtitle}>Building Kerala's future together</Text>
        </View>
      </LinearGradient>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={[styles.scrollWrap, { paddingBottom: insets.bottom + 140 }]}>
          {/* Welcome Message */}
          <View style={styles.welcomeWrap}>
            <Text style={styles.welcomeTitle}>Welcome back to OriGo</Text>
            <Text style={styles.welcomeDesc}>Sign in to continue your journey with Kerala's travel companion</Text>
          </View>
          {/* Login Form */}
          <Card style={styles.card}>
            <View style={styles.cardHeader}><Text style={styles.cardHeaderText}>Sign In</Text></View>
            <View style={styles.cardContent}>
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
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputWrap}>
                  <Lock color="#a3a3a3" size={18} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChangeText={text => handleInputChange('password', text)}
                    secureTextEntry
                    placeholderTextColor="#a3a3a3"
                  />
                </View>
              </View>
              <Button
                onPress={handleSubmit}
                disabled={!isFormValid}
                style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
              >
                <Text style={styles.submitButtonText}>Sign In</Text>
                <ArrowRight color="#fff" size={18} style={{ marginLeft: 8 }} />
              </Button>
              <TouchableOpacity style={styles.forgotBtn}>
                <Text style={styles.forgotBtnText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </Card>
          {/* Sign Up Option */}
          <Card style={styles.signupCard}>
            <View style={styles.cardContent}>
              <Text style={styles.signupPrompt}>Don't have an account?</Text>
              <Button
                onPress={onSignup}
                variant="outline"
                style={styles.signupBtn}
              >
                <User color="#059669" size={18} style={{ marginRight: 8 }} />
                <Text style={styles.signupBtnText}>Create New Account</Text>
              </Button>
            </View>
          </Card>
          {/* NATPAC Admin Login */}
          <TouchableOpacity onPress={onNatpacLogin} style={styles.natpacBtn}>
            <Text style={styles.natpacBtnText}>NATPAC admin? Login here</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f0fdf4' },
  header: { height: 120, backgroundColor: '#059669', justifyContent: 'flex-end', position: 'relative', paddingTop: 20 },
  headerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  headerTextWrap: { position: 'absolute', bottom: 16, left: 0, right: 0, alignItems: 'center' },
  headerIconRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '700', marginLeft: 8 },
  headerSubtitle: { color: '#fff', fontSize: 13, opacity: 0.9, textAlign: 'center' },
  scrollWrap: { padding: 16, paddingBottom: 120 },
  welcomeWrap: { alignItems: 'center', marginBottom: 24 },
  welcomeTitle: { fontSize: 22, fontWeight: '700', color: '#1e293b', marginBottom: 8, textAlign: 'center' },
  welcomeDesc: { fontSize: 13, color: '#64748b', textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 14, marginBottom: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 0 },
  cardHeader: { paddingVertical: 12, alignItems: 'center' },
  cardHeaderText: { fontSize: 16, color: '#1e293b', fontWeight: '600' },
  cardContent: { padding: 16 },
  inputGroup: { marginBottom: 12 },
  inputLabel: { fontSize: 13, color: '#374151', marginBottom: 4 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 8 },
  inputIcon: { marginRight: 6 },
  input: { flex: 1, height: 40, fontSize: 15, color: '#222', backgroundColor: 'transparent' },
  submitButton: { backgroundColor: '#059669', borderRadius: 14, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  submitButtonDisabled: { opacity: 0.5 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  forgotBtn: { alignItems: 'center', marginTop: 12 },
  forgotBtnText: { color: '#059669', fontSize: 13, textDecorationLine: 'underline' },
  signupCard: { backgroundColor: 'rgba(16,185,129,0.08)', borderColor: '#a7f3d0', borderWidth: 1, borderRadius: 14, marginBottom: 18 },
  signupPrompt: { color: '#374151', fontSize: 14, marginBottom: 8, textAlign: 'center' },
  signupBtn: { width: '100%', borderRadius: 14, borderWidth: 1, borderColor: '#d1fae5', paddingVertical: 14, alignItems: 'center', marginBottom: 6, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center' },
  signupBtnText: { color: '#059669', fontSize: 15, fontWeight: '600' },
  natpacBtn: { alignItems: 'center', marginTop: 8 },
  natpacBtnText: { color: '#2563eb', fontSize: 13, textDecorationLine: 'underline' },
});
