import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Building2, Users, MapPin, TrendingUp, BarChart3, LogOut, Clock, Route, Zap, Target, Download } from 'lucide-react-native';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart } from 'react-native-chart-kit';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export function NatpacDashboard({ onLogout }) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Comprehensive Kerala Transport Data
  const monthlyDestinations = [
    { destination: 'Kochi', visits: 2450, growth: 12, groupTravel: 68, peakHours: '8-10 AM, 5-7 PM' },
    { destination: 'Thiruvananthapuram', visits: 1890, growth: 8, groupTravel: 52, peakHours: '7-9 AM, 4-6 PM' },
    { destination: 'Kozhikode', visits: 1650, growth: 15, groupTravel: 71, peakHours: '8-10 AM, 6-8 PM' },
    { destination: 'Thrissur', visits: 1420, growth: 5, groupTravel: 45, peakHours: '7-9 AM, 5-7 PM' },
    { destination: 'Alappuzha', visits: 980, growth: 22, groupTravel: 83, peakHours: '9-11 AM, 3-5 PM' },
    { destination: 'Munnar', visits: 756, growth: 35, groupTravel: 91, peakHours: '6-8 AM, 2-4 PM' }
  ];
  const travelModes = [
    { mode: 'KSRTC Bus', count: 4500, color: '#10b981', efficiency: 85, cost: 'Low' },
    { mode: 'Auto/Taxi', count: 2800, color: '#3b82f6', efficiency: 45, cost: 'Medium' },
    { mode: 'Private Vehicle', count: 3200, color: '#8b5cf6', efficiency: 25, cost: 'High' },
    { mode: 'Train', count: 1200, color: '#f59e0b', efficiency: 90, cost: 'Low' }
  ];
  const metroProposals = [
    { route: 'Kochi - Aluva', priority: 'High', demand: 95, feasibility: 88, cost: '₹2,400 Cr' },
    { route: 'Thiruvananthapuram - Technopark', priority: 'High', demand: 89, feasibility: 82, cost: '₹1,800 Cr' },
    { route: 'Kozhikode - Wayanad', priority: 'Medium', demand: 67, feasibility: 71, cost: '₹3,200 Cr' },
    { route: 'Thrissur - Guruvayur', priority: 'Medium', demand: 58, feasibility: 75, cost: '₹900 Cr' }
  ];
  const realTimeData = {
    activeUsers: 25847,
    tripsToday: 12429,
    peakCapacity: 78,
    energySaved: '2.3 MWh',
    dataPoints: '2.4M',
    growthRate: 18.5
  };

  const currentData = selectedPeriod === 'month' ? monthlyDestinations : monthlyDestinations;

  // CSV export example
  const exportToCSV = async (data, filename) => {
    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    const fileUri = FileSystem.cacheDirectory + filename;
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });
    await Sharing.shareAsync(fileUri);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Building2 color="#2563eb" size={32} />
          <View style={styles.headerLeftTextWrap}>
            <Text style={styles.headerTitle}>NATPAC Analytics Portal</Text>
            <Text style={styles.headerSubtitle}>Kerala State Transport Planning</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
          <LogOut color="#2563eb" size={18} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollWrap}>
        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <Card style={styles.summaryCard}>
            <Users size={24} color="#059669" style={styles.summaryIcon} />
            <Text style={styles.summaryValue}>25,847</Text>
            <Text style={styles.summaryLabel}>Active Users</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <MapPin size={24} color="#2563eb" style={styles.summaryIcon} />
            <Text style={styles.summaryValue}>186,429</Text>
            <Text style={styles.summaryLabel}>Total Trips</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <TrendingUp size={24} color="#10b981" style={styles.summaryIcon} />
            <Text style={styles.summaryValue}>+18.5%</Text>
            <Text style={styles.summaryLabel}>Growth</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <BarChart3 size={24} color="#8b5cf6" style={styles.summaryIcon} />
            <Text style={styles.summaryValue}>2.4M</Text>
            <Text style={styles.summaryLabel}>Data Points</Text>
          </Card>
        </View>
        {/* Destinations Bar Chart */}
        <Text style={styles.sectionTitle}>Most Visited Destinations</Text>
        <View style={styles.chartContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.chartScrollContent}
            style={styles.chartScrollView}
          >
            <BarChart
              style={styles.barChartStyle}
              data={{
                labels: currentData.map(d => {
                  // Truncate long destination names for better display
                  return d.destination.length > 10 ? d.destination.substring(0, 10) + '...' : d.destination;
                }),
                datasets: [{ 
                  data: currentData.map(d => d.visits)
                }]
              }}
              width={Math.max(Dimensions.get('window').width - 32, currentData.length * 90)}
              height={240}
              fromZero
              showValuesOnTopOfBars
              yAxisLabel={""}
              yAxisSuffix={""}
              withInnerLines={false}
              withOuterLines={false}
              withHorizontalLabels={true}
              withVerticalLabels={true}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
                style: { 
                  borderRadius: 12,
                  paddingRight: 40,
                  paddingLeft: 15
                },
                propsForLabels: {
                  fontSize: 11,
                  fontWeight: '500',
                  fill: '#374151'
                },
                propsForVerticalLabels: {
                  fontSize: 10,
                  fontWeight: '400',
                  fill: '#6b7280'
                },
                barPercentage: 0.7,
                fillShadowGradientOpacity: 0.3
              }}
            />
          </ScrollView>
        </View>
        {currentData.map(item => (
          <View key={item.destination} style={styles.listRow}>
            <Text
              style={[styles.listText, styles.listDestination]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.destination}
            </Text>
            <Text style={[styles.listText, styles.listVisits]}>{item.visits.toLocaleString()} visits</Text>
            <Badge style={styles.listBadge}>{`${item.growth >= 0 ? '+' : ''}${item.growth}%`}</Badge>
          </View>
        ))}
        <Button onPress={() => exportToCSV(currentData, 'destinations.csv')} style={styles.exportBtn}>
          <Text style={styles.exportBtnText}>Export Destinations CSV</Text>
        </Button>
        
        {/* Daily Report Section */}
        <Text style={styles.sectionTitle}>Today's Report</Text>
        <Card style={styles.dailyReportCard}>
          <View style={styles.reportHeader}>
            <View style={styles.reportDateContainer}>
              <Text style={styles.reportDate}>{new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</Text>
              <Text style={styles.reportTime}>Last updated: {new Date().toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit'
              })}</Text>
            </View>
            <Badge style={styles.liveBadge}>Live</Badge>
          </View>
          
          {/* Key Metrics Row */}
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Users size={20} color="#2563eb" />
              <Text style={styles.metricValue}>12,429</Text>
              <Text style={styles.metricLabel}>Active Trips</Text>
            </View>
            <View style={styles.metricCard}>
              <TrendingUp size={20} color="#059669" />
              <Text style={styles.metricValue}>78%</Text>
              <Text style={styles.metricLabel}>Capacity</Text>
            </View>
            <View style={styles.metricCard}>
              <MapPin size={20} color="#8b5cf6" />
              <Text style={styles.metricValue}>186</Text>
              <Text style={styles.metricLabel}>Routes</Text>
            </View>
          </View>
          
          {/* Transportation Mode Analysis */}
          <View style={styles.reportSection}>
            <Text style={styles.reportSectionTitle}>Transportation Mode Distribution</Text>
            {travelModes.map((mode, index) => (
              <View key={mode.mode} style={styles.modeRow}>
                <View style={styles.modeInfo}>
                  <View style={[styles.modeIndicator, { backgroundColor: mode.color }]} />
                  <Text style={styles.modeName}>{mode.mode}</Text>
                </View>
                <View style={styles.modeStats}>
                  <Text style={styles.modeCount}>{mode.count.toLocaleString()}</Text>
                  <Text style={styles.modeEfficiency}>Efficiency: {mode.efficiency}%</Text>
                </View>
              </View>
            ))}
          </View>
          
          {/* Peak Hours Analysis */}
          <View style={styles.reportSection}>
            <Text style={styles.reportSectionTitle}>Peak Hours Analysis</Text>
            <View style={styles.peakHoursContainer}>
              <View style={styles.peakHourItem}>
                <Text style={styles.peakHourTime}>8:00 - 10:00 AM</Text>
                <Text style={styles.peakHourDesc}>Morning Rush</Text>
                <View style={styles.peakHourBar}>
                  <View style={[styles.peakHourFill, { width: '85%' }]} />
                </View>
                <Text style={styles.peakHourPercent}>85% Capacity</Text>
              </View>
              <View style={styles.peakHourItem}>
                <Text style={styles.peakHourTime}>5:00 - 7:00 PM</Text>
                <Text style={styles.peakHourDesc}>Evening Rush</Text>
                <View style={styles.peakHourBar}>
                  <View style={[styles.peakHourFill, { width: '92%' }]} />
                </View>
                <Text style={styles.peakHourPercent}>92% Capacity</Text>
              </View>
              <View style={styles.peakHourItem}>
                <Text style={styles.peakHourTime}>12:00 - 2:00 PM</Text>
                <Text style={styles.peakHourDesc}>Lunch Hour</Text>
                <View style={styles.peakHourBar}>
                  <View style={[styles.peakHourFill, { width: '65%' }]} />
                </View>
                <Text style={styles.peakHourPercent}>65% Capacity</Text>
              </View>
            </View>
          </View>
          
          {/* Environmental Impact */}
          <View style={styles.reportSection}>
            <Text style={styles.reportSectionTitle}>Environmental Impact</Text>
            <View style={styles.environmentalStats}>
              <View style={styles.envStatItem}>
                <Zap size={16} color="#059669" />
                <Text style={styles.envStatValue}>2.3 MWh</Text>
                <Text style={styles.envStatLabel}>Energy Saved</Text>
              </View>
              <View style={styles.envStatItem}>
                <Text style={styles.envStatEmoji}>🌿</Text>
                <Text style={styles.envStatValue}>1,847 kg</Text>
                <Text style={styles.envStatLabel}>CO₂ Reduced</Text>
              </View>
              <View style={styles.envStatItem}>
                <Text style={styles.envStatEmoji}>🌍</Text>
                <Text style={styles.envStatValue}>94%</Text>
                <Text style={styles.envStatLabel}>Eco-Friendly</Text>
              </View>
            </View>
          </View>
        </Card>
        
        {/* Export Daily Report */}
        <Button 
          onPress={() => {
            const dailyReportData = [
              { metric: 'Active Trips', value: 12429, timestamp: new Date().toISOString() },
              { metric: 'Peak Capacity', value: 92, timestamp: new Date().toISOString() },
              { metric: 'Energy Saved (MWh)', value: 2.3, timestamp: new Date().toISOString() },
              { metric: 'CO2 Reduced (kg)', value: 1847, timestamp: new Date().toISOString() }
            ];
            exportToCSV(dailyReportData, 'daily_report.csv');
          }} 
          style={[styles.exportBtn, styles.reportExportBtn]}
        >
          <Download size={16} color="#fff" />
          <Text style={styles.exportBtnText}>Export Daily Report</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerLeft: { 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  headerLeftTextWrap: {
    marginLeft: 12,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#1e293b' 
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: '#64748b', 
    marginTop: 2 
  },
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#eff6ff', 
    borderRadius: 12, 
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8 // Add gap between icon and text
  },
  logoutText: { 
    color: '#2563eb', 
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8 // Additional margin for spacing
  },
  scrollWrap: { 
    padding: 16,
    paddingBottom: 24 // Extra bottom padding
  },
  summaryRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginBottom: 24,
    gap: 12, // Add gap between cards
  },
  summaryCard: { 
    flex: 1, 
    minWidth: '47%', // Slightly larger to account for gap
    maxWidth: '47%', // Prevent cards from getting too wide
    padding: 16, 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16, // Increased bottom margin
  },
  summaryIcon: {
    marginBottom: 12
  },
  summaryValue: {
    fontSize: 22, // Slightly smaller for better fit
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'center'
  },
  summaryLabel: {
    fontSize: 13, // Slightly smaller
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16 // Better line spacing
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginVertical: 16,
    color: '#1e293b'
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  barChartStyle: {
    height: 240,
    marginVertical: 8,
    borderRadius: 12,
  },
  chartScrollView: {
    maxHeight: 280,
    borderRadius: 12,
  },
  chartScrollContent: {
    paddingRight: 20,
    paddingLeft: 10,
    alignItems: 'flex-start',
  },
  listRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  listText: { 
    fontSize: 15, 
    color: '#1e293b',
    fontWeight: '500'
  },
  listDestination: {
    flex: 1,
    marginRight: 8,
  },
  listVisits: {
    width: '30%',
    textAlign: 'right',
  },
  listBadge: {
    marginLeft: 8,
    alignSelf: 'center',
  },
  exportBtn: { 
    marginTop: 16, 
    backgroundColor: '#059669', 
    borderRadius: 12, 
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exportBtnText: { 
    color: '#fff', 
    fontWeight: '600',
    fontSize: 16
  },
  // Daily Report Styles
  dailyReportCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  reportDateContainer: {
    flex: 1
  },
  reportDate: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4
  },
  reportTime: {
    fontSize: 13,
    color: '#64748b'
  },
  liveBadge: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 8,
    marginBottom: 4
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center'
  },
  reportSection: {
    marginBottom: 24
  },
  reportSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16
  },
  modeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginBottom: 8
  },
  modeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  modeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12
  },
  modeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b'
  },
  modeStats: {
    alignItems: 'flex-end'
  },
  modeCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b'
  },
  modeEfficiency: {
    fontSize: 11,
    color: '#64748b'
  },
  peakHoursContainer: {
    gap: 12
  },
  peakHourItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12
  },
  peakHourTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2
  },
  peakHourDesc: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8
  },
  peakHourBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginBottom: 4
  },
  peakHourFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3
  },
  peakHourPercent: {
    fontSize: 11,
    color: '#3b82f6',
    fontWeight: '500'
  },
  environmentalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  envStatItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4
  },
  envStatEmoji: {
    fontSize: 20,
    marginBottom: 4
  },
  envStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
    marginTop: 4,
    marginBottom: 2
  },
  envStatLabel: {
    fontSize: 11,
    color: '#16a34a',
    textAlign: 'center'
  },
  reportExportBtn: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
});
