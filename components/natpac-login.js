import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Building2, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function NatpacLogin({ onLogin, onBack }) {
  const [formData, setFormData] = useState({ adminId: '', password: '' });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.adminId && formData.password;

  const handleSubmit = () => {
    if (isFormValid) {
      onLogin();
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <LinearGradient colors={["#2563eb", "#60a5fa"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <View style={styles.headerOverlay} />
        <View style={styles.headerBackBtnWrap}>
          <Button
            onPress={onBack}
            variant="ghost"
            size="sm"
            style={styles.headerBackBtn}
          >
            <ArrowLeft color="#fff" size={18} style={{ marginRight: 6 }} />
            <Text style={styles.headerBackBtnText}>Back</Text>
          </Button>
        </View>
        <View style={styles.headerTextWrap}>
          <View style={styles.headerIconRow}>
            <Building2 color="#60a5fa" size={24} />
            <Text style={styles.headerTitle}>NATPAC Admin Portal</Text>
          </View>
          <Text style={styles.headerSubtitle}>Kerala State Transport Planning Authority</Text>
        </View>
      </LinearGradient>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollWrap}>
          {/* Welcome Message */}
          <View style={styles.welcomeWrap}>
            <Text style={styles.welcomeTitle}>NATPAC Administrator</Text>
            <Text style={styles.welcomeDesc}>Access travel analytics and metro planning data</Text>
          </View>
          {/* Login Form */}
          <Card style={styles.card}>
            <View style={styles.cardHeader}><Text style={styles.cardHeaderText}>Secure Login</Text></View>
            <View style={styles.cardContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Admin ID</Text>
                <View style={styles.inputWrap}>
                  <Building2 color="#a3a3a3" size={18} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your admin ID"
                    value={formData.adminId}
                    onChangeText={text => handleInputChange('adminId', text)}
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
                <Text style={styles.submitButtonText}>Access Portal</Text>
                <ArrowRight color="#fff" size={18} style={{ marginLeft: 8 }} />
              </Button>
            </View>
          </Card>
          {/* Security Notice */}
          <Card style={styles.securityCard}>
            <View style={styles.cardContent}>
              <Text style={styles.securityTitle}>Security Notice</Text>
              <View style={styles.securityRow}><View style={styles.securityDot} /><Text style={styles.securityText}>All access is logged and monitored</Text></View>
              <View style={styles.securityRow}><View style={styles.securityDot} /><Text style={styles.securityText}>Data is encrypted and secure</Text></View>
              <View style={styles.securityRow}><View style={styles.securityDot} /><Text style={styles.securityText}>User privacy is protected</Text></View>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#eff6ff',
  },
  header: {
    height: 150,
    backgroundColor: '#2563eb',
    justifyContent: 'flex-end',
    position: 'relative',
    paddingTop: 20,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerBackBtnWrap: {
    position: 'absolute',
    top: 36,
    left: 16,
    zIndex: 2,
  },
  headerBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerBackBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
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
    justifyContent: 'center',
    marginBottom: 2,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 8,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 13,
    opacity: 0.9,
    textAlign: 'center',
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
    backgroundColor: '#2563eb',
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
  securityCard: {
    backgroundColor: 'rgba(59,130,246,0.08)',
    borderColor: '#bfdbfe',
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 18,
  },
  securityTitle: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  securityDot: {
    width: 6,
    height: 6,
    backgroundColor: '#2563eb',
    borderRadius: 3,
    marginRight: 8,
  },
  securityText: {
    color: '#2563eb',
    fontSize: 13,
  },
});
