import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Home, MapPin, Users, Camera, BarChart3, Play, Pause, Zap, Gift, QrCode, Navigation, Clock, Car, Bus, Train, Bike, LogOut, Shield } from 'lucide-react-native';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import MapTracker from './map-tracker';

const TABS = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'trips', label: 'Trips', icon: MapPin },
  { key: 'connect', label: 'Connect', icon: Users },
  { key: 'community', label: 'Community', icon: Camera },
  { key: 'insights', label: 'Insights', icon: BarChart3 },
];

export function MainDashboard({ onLogout }) {
  const insets = useSafeAreaInsets();
  const [isTracking, setIsTracking] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [rewardPoints, setRewardPoints] = useState(1250);
  const [energySaveMode, setEnergySaveMode] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [tripHistory, setTripHistory] = useState([
    { id: 'TRP001', origin: 'Home - Kochi', destination: 'Office - Thiruvananthapuram', mode: 'bus', startTime: '08:30 AM', endTime: '10:45 AM', date: '2025-09-19', distance: 220, companions: 0, companionDetails: 'Solo Travel', points: 44 },
    { id: 'TRP002', origin: 'Office - Thiruvananthapuram', destination: 'Shopping Mall - Kollam', mode: 'car', startTime: '06:00 PM', endTime: '07:30 PM', date: '2025-09-18', distance: 85, companions: 2, companionDetails: 'Spouse, Child (Age 8)', points: 17 },
    { id: 'TRP003', origin: 'Home - Kochi', destination: 'Munnar Hills', mode: 'bus', startTime: '09:00 AM', endTime: '12:30 PM', date: '2025-09-17', distance: 130, companions: 3, companionDetails: 'Friends (2 Adults, 1 Child)', points: 26 }
  ]);

  useEffect(() => {
    if (isTracking) {
      setCurrentTrip({
        id: 'TRP_' + Date.now(),
        startTime: new Date(),
        origin: 'Kochi',
        destination: 'Alappuzha',
        mode: 'bus',
        distance: 24.5,
        coTravelers: 2
      });
    } else {
      setCurrentTrip(null);
    }
  }, [isTracking]);

  // Data sharing permission handler
  const handleTripEnd = () => {
    Alert.alert(
      "🔒 Data Sharing Permission",
      "NATPAC would like to use your anonymized trip data for transport planning research to improve Kerala's public transportation system.\n\n" +
      "Data shared includes:\n" +
      "• Origin and destination locations\n" +
      "• Trip duration and distance\n" +
      "• Transportation mode used\n" +
      "• Number of co-travelers\n\n" +
      "Your personal identity remains completely private.",
      [
        {
          text: "Decline & End Trip",
          onPress: () => {
            setIsTracking(false);
            // End trip without sharing data
          },
          style: "cancel"
        },
        {
          text: "Allow & End Trip",
          onPress: () => {
            setIsTracking(false);
            // Show success message for data contribution
            setTimeout(() => {
              Alert.alert(
                "🙏 Thank You!",
                "Your contribution helps NATPAC plan better transportation infrastructure for Kerala. Together, we're building a smarter, more connected state!",
                [{ text: "Continue", style: "default" }]
              );
            }, 500);
          },
          style: "default"
        }
      ],
      {
        cancelable: false
      }
    );
  };

  const recentTrips = [
    { id: 'TRP_001', origin: 'Thiruvananthapuram', destination: 'Kochi', distance: 220, mode: 'train', date: '2024-01-15', points: 44 },
    { id: 'TRP_002', origin: 'Kochi', destination: 'Munnar', distance: 130, mode: 'bus', date: '2024-01-14', points: 26 },
    { id: 'TRP_003', origin: 'Kozhikode', destination: 'Wayanad', distance: 85, mode: 'car', date: '2024-01-13', points: 17 }
  ];

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'car': return <Car size={18} color="#2563eb" />;
      case 'bus': return <Bus size={18} color="#059669" />;
      case 'train': return <Train size={18} color="#8b5cf6" />;
      case 'bike': return <Bike size={18} color="#f59e0b" />;
      default: return <Navigation size={18} color="#64748b" />;
    }
  };

  // Tab content renderers
  const renderHome = () => (
    <ScrollView contentContainerStyle={[styles.tabContent, { paddingBottom: insets.bottom + 120 }]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.subGreeting}>Ready for your Kerala journey?</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
              <LogOut size={18} color="#64748b" />
              <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
              <Gift size={18} color="#059669" />
              <Text style={styles.pointsText}>{rewardPoints} points</Text>
            </View>
          </View>
          <Badge style={styles.energyBadge}>
            <Zap size={14} color="#059669" />
            <Text style={styles.energyBadgeText}>{energySaveMode ? 'Energy Saving' : 'Normal'}</Text>
          </Badge>
        </View>
      </View>
      {/* Current Trip Card */}
      {isTracking && currentTrip ? (
        <Card style={styles.liveTripCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.liveTripTitle}>Trip in Progress</Text>
            <Badge style={styles.liveBadge}>Live</Badge>
          </View>
          <View style={styles.cardContentRow}>
            {getModeIcon(currentTrip.mode)}
            <Text style={styles.tripRoute}>{currentTrip.origin} → {currentTrip.destination}</Text>
          </View>
          <View style={styles.tripStatsRow}>
            <View style={styles.tripStat}><Text style={styles.tripStatLabel}>Distance</Text><Text style={styles.tripStatValue}>{currentTrip.distance} km</Text></View>
            <View style={styles.tripStat}><Text style={styles.tripStatLabel}>Duration</Text><Text style={styles.tripStatValue}>45 min</Text></View>
            <View style={styles.tripStat}><Text style={styles.tripStatLabel}>Co-travelers</Text><Text style={styles.tripStatValue}>{currentTrip.coTravelers}</Text></View>
          </View>
          <Progress value={65} style={styles.progressBar} />
          <View style={styles.mapContainer}>
            <MapTracker isActive={isTracking} />
          </View>
        </Card>
      ) : (
        <Card style={styles.startTripCard}>
          <View style={{ alignItems: 'center', paddingVertical: 24 }}>
            <MapPin size={40} color="#a3a3a3" style={{ marginBottom: 8 }} />
            <Text style={styles.startTripTitle}>Start Your Journey</Text>
            <Text style={styles.startTripDesc}>Tap to begin tracking your Kerala travel</Text>
            <Button onPress={() => setIsTracking(true)} style={styles.startTripBtn}>
              <Play size={16} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.startTripBtnText}>  Start Trip</Text>
            </Button>
          </View>
        </Card>
      )}
      {/* Quick Actions */}
      <View style={styles.quickActionsRow}>
        <Card style={styles.quickActionCard}>
          <View style={{ alignItems: 'center', paddingVertical: 16 }}>
            <QrCode size={28} color="#8b5cf6" style={{ marginBottom: 4 }} />
            <Text style={styles.quickActionText}>Scan Co-traveler</Text>
          </View>
        </Card>
        <Card style={styles.quickActionCard}>
          <View style={{ alignItems: 'center', paddingVertical: 16 }}>
            <Camera size={28} color="#3b82f6" style={{ marginBottom: 4 }} />
            <Text style={styles.quickActionText}>Capture Moment</Text>
          </View>
        </Card>
      </View>
      {/* Recent Trips */}
      <Card style={styles.recentTripsCard}>
        <Text style={styles.recentTripsTitle}>Recent Trips</Text>
        {recentTrips.map(trip => (
          <View key={trip.id} style={styles.recentTripRow}>
            {getModeIcon(trip.mode)}
            <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.recentTripRoute} numberOfLines={1} ellipsizeMode="tail">{trip.origin} → {trip.destination}</Text>
              <Text style={styles.recentTripMeta}>{trip.date} • {trip.distance} km</Text>
            </View>
            <Badge style={styles.recentTripBadge}>{`+${trip.points} pts`}</Badge>
          </View>
        ))}
      </Card>
    </ScrollView>
  );

  const renderTrips = () => (
    <ScrollView contentContainerStyle={[styles.tabContent, { paddingBottom: insets.bottom + 120 }]}>
      <Text style={styles.sectionTitle}>Trip History</Text>
      {tripHistory.map(trip => (
        <Card key={trip.id} style={styles.tripHistoryCard}>
          <View style={styles.tripHistoryHeader}>
            {getModeIcon(trip.mode)}
            <Text style={styles.tripId}>{trip.id}</Text>
            <Badge style={styles.tripPointsBadge}>{`+${trip.points} pts`}</Badge>
          </View>
          <View style={styles.tripHistoryBody}>
            <Text style={styles.tripHistoryRoute}>{trip.origin} ↓ {trip.destination}</Text>
            <Text style={styles.tripHistoryMeta}>Time: {trip.startTime} - {trip.endTime} | Date: {trip.date}</Text>
            <Text style={styles.tripHistoryMeta}>Distance: {trip.distance} km | Mode: {trip.mode}</Text>
            <Text style={styles.tripHistoryMeta}>Travelers: {trip.companions + 1} ({trip.companionDetails})</Text>
          </View>
        </Card>
      ))}
      <Card style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Your Travel Summary</Text>
        <Text style={styles.summaryText}>Total Distance: {tripHistory.reduce((sum, trip) => sum + trip.distance, 0)} km</Text>
        <Text style={styles.summaryText}>Total Points: {tripHistory.reduce((sum, trip) => sum + trip.points, 0)} pts</Text>
        <Text style={styles.summaryText}>Most Used Mode: {tripHistory.reduce((acc, trip) => { acc[trip.mode] = (acc[trip.mode] || 0) + 1; return acc; }, {}).bus > 1 ? 'Bus' : 'Mixed'}</Text>
        <Text style={styles.summaryText}>Travel Days: {new Set(tripHistory.map(t => t.date)).size} days</Text>
      </Card>
    </ScrollView>
  );

  const renderConnect = () => (
    <ScrollView contentContainerStyle={[styles.tabContent, { paddingBottom: insets.bottom + 120 }]}>
      <View style={styles.connectHeader}>
        <View style={styles.connectIconWrap}>
          <Users size={32} color="#8b5cf6" />
        </View>
        <Text style={styles.connectTitle}>Co-traveler Connect</Text>
        <Text style={styles.connectDesc}>
          Scan unique QR codes to log group travels and help NATPAC understand travel patterns
        </Text>
      </View>

      {/* QR Scanner Section */}
      <Card style={styles.scannerCard}>
        <View style={styles.scannerHeader}>
          <QrCode size={24} color="#8b5cf6" />
          <Text style={styles.scannerTitle}>QR Code Scanner</Text>
        </View>
        <View style={styles.scannerPreview}>
          <View style={styles.scannerFrame}>
            <View style={styles.scannerCorner} />
            <View style={styles.scannerCorner} />
            <View style={styles.scannerCorner} />
            <View style={styles.scannerCorner} />
            <QrCode size={64} color="#a3a3a3" />
            <Text style={styles.scannerText}>Position QR code within the frame</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.scannerBtn}>
          <Camera size={18} color="#fff" />
          <Text style={styles.scannerBtnText}>Start Scanning</Text>
        </TouchableOpacity>
      </Card>

      {/* Features */}
      <Card style={styles.featuresCard}>
        <Text style={styles.featuresTitle}>How Co-traveler Connect Works</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <View style={styles.featureNumber}><Text style={styles.featureNumberText}>1</Text></View>
            <Text style={styles.featureText}>Each traveler gets a unique QR code in their OriGo profile</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureNumber}><Text style={styles.featureNumberText}>2</Text></View>
            <Text style={styles.featureText}>Scan QR codes before starting group trips (family, friends, etc.)</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureNumber}><Text style={styles.featureNumberText}>3</Text></View>
            <Text style={styles.featureText}>View co-traveler locations during the trip for safety</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureNumber}><Text style={styles.featureNumberText}>4</Text></View>
            <Text style={styles.featureText}>Help NATPAC plan stations based on group travel patterns</Text>
          </View>
        </View>
      </Card>

      {/* Privacy Notice */}
      <Card style={styles.privacyCard}>
        <View style={styles.privacyHeader}>
          <Shield size={20} color="#059669" />
          <Text style={styles.privacyTitle}>Privacy Protected</Text>
        </View>
        <Text style={styles.privacyText}>
          Co-traveler locations are visible only to you during trips. NATPAC admins receive only anonymized group travel data for planning purposes.
        </Text>
      </Card>

      {/* Your QR Code */}
      <Card style={styles.myQrCard}>
        <Text style={styles.myQrTitle}>Your QR Code</Text>
        <View style={styles.myQrCodeWrap}>
          <View style={styles.qrCodeDisplay}>
            <QrCode size={80} color="#1e293b" />
            <Text style={styles.qrCodeId}>ID: TRV-KL-{Date.now().toString().slice(-6)}</Text>
          </View>
        </View>
        <Text style={styles.myQrDesc}>Share this with travel companions to connect</Text>
        <Button variant="outline" style={styles.shareQrBtn}>
          <Text style={styles.shareQrBtnText}>Share My QR Code</Text>
        </Button>
      </Card>
    </ScrollView>
  );

  const renderCommunity = () => (
    <ScrollView contentContainerStyle={[styles.tabContent, { paddingBottom: insets.bottom + 120 }]}>
      <View style={styles.communityHeader}>
        <Text style={styles.sectionTitle}>Kerala Scenery Community</Text>
        <TouchableOpacity style={styles.captureBtn}>
          <Camera size={16} color="#fff" />
          <Text style={styles.captureBtnText}>Capture Moment</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Post */}
      <Card style={styles.communityCard}>
        <View style={styles.postHeader}>
          <View style={styles.communityAvatar}><Text style={styles.communityAvatarText}>RK</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.communityUser}>Rahul Krishnan</Text>
            <Text style={styles.communityMeta}>Alappuzha Backwaters • 2h ago</Text>
          </View>
          <Badge style={styles.locationBadge}>🏞️ Popular Spot</Badge>
        </View>
        <View style={styles.communityImage}>
          <Camera size={40} color="#059669" />
          <Text style={styles.imageCaption}>Kerala Backwaters</Text>
        </View>
        <Text style={styles.communityPost}>
          Mesmerizing sunset over the Alappuzha backwaters! The traditional houseboat ride through these pristine waters showcases Kerala's natural beauty. Perfect for metro planning - this destination sees 500+ visitors daily! 🛶✨
        </Text>
        <View style={styles.communityStats}>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.communityStat}>❤️ 124</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.communityStat}>💬 28</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.communityStat}>📤 Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.communityStat}>🗺️ Add to Trip</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* More Posts */}
      <Card style={styles.communityCard}>
        <View style={styles.postHeader}>
          <View style={styles.communityAvatar}><Text style={styles.communityAvatarText}>MP</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.communityUser}>Meera Pillai</Text>
            <Text style={styles.communityMeta}>Munnar Tea Gardens • 4h ago</Text>
          </View>
          <Badge style={styles.locationBadge}>⛰️ Hill Station</Badge>
        </View>
        <View style={styles.communityImage}>
          <Camera size={40} color="#059669" />
          <Text style={styles.imageCaption}>Tea Plantation Views</Text>
        </View>
        <Text style={styles.communityPost}>
          Early morning mist rolling over Munnar's tea plantations. The winding roads here could benefit from better public transport connectivity to reduce private vehicle usage. 🍃
        </Text>
        <View style={styles.communityStats}>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.communityStat}>❤️ 89</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.communityStat}>💬 15</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.communityStat}>📤 Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.communityStat}>🗺️ Add to Trip</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Kerala Locations Trending */}
      <Card style={styles.trendingCard}>
        <Text style={styles.trendingTitle}>🔥 Trending Kerala Destinations</Text>
        <View style={styles.trendingList}>
          <View style={styles.trendingItem}>
            <Text style={styles.trendingPlace} numberOfLines={1} ellipsizeMode="tail">🏖️ Kovalam Beach</Text>
            <Text style={styles.trendingCount}>47 posts today</Text>
          </View>
          <View style={styles.trendingItem}>
            <Text style={styles.trendingPlace} numberOfLines={1} ellipsizeMode="tail">🌿 Thekkady Wildlife</Text>
            <Text style={styles.trendingCount}>32 posts today</Text>
          </View>
          <View style={styles.trendingItem}>
            <Text style={styles.trendingPlace} numberOfLines={1} ellipsizeMode="tail">🏛️ Fort Kochi</Text>
            <Text style={styles.trendingCount}>28 posts today</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );

  const renderInsights = () => (
    <ScrollView contentContainerStyle={[styles.tabContent, { paddingBottom: insets.bottom + 120 }]}>
      <Text style={styles.sectionTitle}>Personal Travel Insights</Text>
      
      {/* Stats Overview */}
      <View style={styles.insightsRow}>
        <Card style={styles.insightCard}>
          <Text style={styles.insightValue}>1,847</Text>
          <Text style={styles.insightLabel}>Total km</Text>
          <Text style={styles.insightSubtext}>This month</Text>
        </Card>
        <Card style={styles.insightCard}>
          <Text style={[styles.insightValue, { color: '#3b82f6' }]}>23</Text>
          <Text style={styles.insightLabel}>Cities visited</Text>
          <Text style={styles.insightSubtext}>Across Kerala</Text>
        </Card>
      </View>
      
      <View style={styles.insightsRow}>
        <Card style={styles.insightCard}>
          <Text style={[styles.insightValue, { color: '#ec4899' }]}>127</Text>
          <Text style={styles.insightLabel}>Co-travelers</Text>
          <Text style={styles.insightSubtext}>Connected</Text>
        </Card>
        <Card style={styles.insightCard}>
          <Text style={[styles.insightValue, { color: '#f59e0b' }]}>18</Text>
          <Text style={styles.insightLabel}>Photos shared</Text>
          <Text style={styles.insightSubtext}>In community</Text>
        </Card>
      </View>

      {/* Kerala Explorer Rewards */}
      <LinearGradient colors={["#8b5cf6", "#ec4899"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gamificationCard}>
        <View style={styles.rewardHeader}>
          <Gift size={24} color="#fff" />
          <Text style={styles.gamificationTitle}>Kerala Explorer Rewards</Text>
        </View>
        <Text style={styles.gamificationDesc}>You're 250 km away from your next reward!</Text>
        <Progress value={75} style={styles.gamificationProgress} />
        <View style={styles.rewardDetails}>
          <Text style={styles.gamificationNext}>Next: ₹100 Kerala Tourism Voucher</Text>
          <Text style={styles.rewardLevel}>Level 7: Backwater Navigator</Text>
        </View>
      </LinearGradient>

      {/* Available Rewards */}
      <Card style={styles.rewardsCard}>
        <Text style={styles.rewardsTitle}>Available Rewards</Text>
        <View style={styles.rewardsList}>
          <View style={styles.rewardItem}>
            <View style={styles.rewardIcon}>
              <Text style={styles.rewardEmoji}>🏖️</Text>
            </View>
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardName}>Beach Resort Discount</Text>
              <Text style={styles.rewardDesc}>20% off at Kovalam resorts</Text>
            </View>
            <Text style={styles.rewardPoints}>800 pts</Text>
          </View>
          <View style={styles.rewardItem}>
            <View style={styles.rewardIcon}>
              <Text style={styles.rewardEmoji}>🚁</Text>
            </View>
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardName}>KSRTC Bus Pass</Text>
              <Text style={styles.rewardDesc}>Free rides for 1 week</Text>
            </View>
            <Text style={styles.rewardPoints}>1200 pts</Text>
          </View>
          <View style={styles.rewardItem}>
            <View style={styles.rewardIcon}>
              <Text style={styles.rewardEmoji}>🍴</Text>
            </View>
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardName}>Kerala Cuisine</Text>
              <Text style={styles.rewardDesc}>Traditional meal at local eatery</Text>
            </View>
            <Text style={styles.rewardPoints}>500 pts</Text>
          </View>
        </View>
      </Card>

      {/* Achievements */}
      <Card style={styles.achievementsCard}>
        <Text style={styles.achievementsTitle}>🏆 Recent Achievements</Text>
        <View style={styles.achievementsList}>
          <View style={styles.achievementItem}>
            <Text style={styles.achievementBadge}>🌊</Text>
            <Text style={styles.achievementText}>Backwater Explorer - Visited 5 backwater destinations</Text>
          </View>
          <View style={styles.achievementItem}>
            <Text style={styles.achievementBadge}>📸</Text>
            <Text style={styles.achievementText}>Community Contributor - Shared 10 scenic photos</Text>
          </View>
          <View style={styles.achievementItem}>
            <Text style={styles.achievementBadge}>👥</Text>
            <Text style={styles.achievementText}>Social Traveler - Connected with 50 co-travelers</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );

  // Tab switcher
  const renderTabBar = () => (
    <View style={[styles.tabBar, { bottom: insets.bottom + 12, marginHorizontal: 16, borderRadius: 20 }]}>
      {TABS.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity 
            key={tab.key} 
            style={[styles.tabBarItem, isActive && styles.tabBarItemActive]} 
            onPress={() => setActiveTab(tab.key)}
          >
            <View style={[styles.tabBarIconContainer, isActive && styles.tabBarIconContainerActive]}>
              <Icon size={20} color={isActive ? '#fff' : '#64748b'} />
            </View>
            <Text style={[styles.tabBarLabel, isActive && styles.tabBarLabelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {activeTab === 'home' && renderHome()}
      {activeTab === 'trips' && renderTrips()}
      {activeTab === 'connect' && renderConnect()}
      {activeTab === 'community' && renderCommunity()}
      {activeTab === 'insights' && renderInsights()}
      {renderTabBar()}
      {isTracking && (
        <View style={[styles.fabWrap, { bottom: insets.bottom + 85 }]}>
          <TouchableOpacity onPress={handleTripEnd} style={styles.fabBtn}>
            <Pause size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f0fdf4', position: 'relative' },
  tabContent: { padding: 16, paddingBottom: 100 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
  greeting: { fontSize: 20, fontWeight: '700', color: '#1e293b' },
  subGreeting: { fontSize: 13, color: '#64748b' },
  logoutBtn: { padding: 8, borderRadius: 8, backgroundColor: '#f3f4f6', flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoutBtnText: { color: '#64748b', fontSize: 13, fontWeight: '600', marginLeft: 6 },
  pointsText: { color: '#059669', fontWeight: '600', marginLeft: 4 },
  energyBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f2fe', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginTop: 2 },
  energyBadgeText: { color: '#059669', fontSize: 12, marginLeft: 4 },
  liveTripCard: { backgroundColor: '#d1fae5', borderColor: '#6ee7b7', borderWidth: 1, borderRadius: 12, marginBottom: 16, padding: 16 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  liveTripTitle: { color: '#059669', fontWeight: '700', fontSize: 16 },
  liveBadge: { backgroundColor: '#059669', color: '#fff', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, fontSize: 12 },
  cardContentRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  tripRoute: { color: '#1e293b', fontSize: 15, marginLeft: 8 },
  tripStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  tripStat: { alignItems: 'center', flex: 1 },
  tripStatLabel: { color: '#64748b', fontSize: 12 },
  tripStatValue: { color: '#1e293b', fontWeight: '600', fontSize: 14 },
  progressBar: { height: 6, borderRadius: 3, backgroundColor: '#a7f3d0' },
  mapContainer: { marginTop: 12, borderRadius: 12, overflow: 'hidden', height: 220 },
  startTripCard: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, padding: 16 },
  startTripTitle: { color: '#1e293b', fontWeight: '700', fontSize: 16, marginBottom: 4 },
  startTripDesc: { color: '#64748b', fontSize: 13, marginBottom: 12 },
  startTripBtn: { backgroundColor: '#059669', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' },
  startTripBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  quickActionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  quickActionCard: { flex: 1, marginHorizontal: 4, backgroundColor: '#fff', borderRadius: 12 },
  quickActionText: { color: '#1e293b', fontSize: 13, textAlign: 'center' },
  recentTripsCard: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, padding: 12 },
  recentTripsTitle: { color: '#1e293b', fontWeight: '700', fontSize: 15, marginBottom: 8 },
  recentTripRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  recentTripRoute: { color: '#1e293b', fontSize: 13 },
  recentTripMeta: { color: '#64748b', fontSize: 11 },
  recentTripBadge: { backgroundColor: '#e0f2fe', color: '#059669', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, fontSize: 12, marginLeft: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b', marginBottom: 12 },
  tripHistoryCard: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, padding: 12 },
  tripHistoryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  tripId: { color: '#2563eb', fontFamily: 'monospace', fontSize: 13, marginLeft: 8 },
  tripPointsBadge: { backgroundColor: '#e0f2fe', color: '#059669', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, fontSize: 12, marginLeft: 'auto' },
  tripHistoryBody: { marginLeft: 24 },
  tripHistoryRoute: { color: '#1e293b', fontSize: 13, marginBottom: 2 },
  tripHistoryMeta: { color: '#64748b', fontSize: 11 },
  summaryCard: { backgroundColor: '#d1fae5', borderRadius: 12, marginBottom: 12, padding: 12 },
  summaryTitle: { color: '#059669', fontWeight: '700', fontSize: 15, marginBottom: 4 },
  summaryText: { color: '#1e293b', fontSize: 13 },
  connectHeader: { alignItems: 'center', marginBottom: 20 },
  connectIconWrap: { backgroundColor: '#f3e8ff', borderRadius: 20, padding: 12, marginBottom: 12 },
  connectTitle: { fontSize: 20, fontWeight: '700', color: '#1e293b', marginBottom: 8 },
  connectDesc: { color: '#64748b', fontSize: 14, textAlign: 'center', lineHeight: 20, paddingHorizontal: 16 },
  scannerCard: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 20, padding: 20 },
  scannerHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  scannerTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b', marginLeft: 8 },
  scannerPreview: { alignItems: 'center', marginBottom: 16 },
  scannerFrame: { width: 200, height: 200, backgroundColor: '#f8fafc', borderRadius: 12, borderWidth: 2, borderColor: '#8b5cf6', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  scannerCorner: { position: 'absolute', width: 20, height: 20, borderColor: '#8b5cf6', borderWidth: 3 },
  scannerText: { color: '#64748b', fontSize: 12, textAlign: 'center', marginTop: 8 },
  scannerBtn: { backgroundColor: '#8b5cf6', borderRadius: 12, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  scannerBtnText: { color: '#fff', fontWeight: '600', fontSize: 15, marginLeft: 8 },
  featuresCard: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 20, padding: 20 },
  featuresTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 16 },
  featuresList: { },
  featureItem: { flexDirection: 'row', alignItems: 'flex-start' },
  featureNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#8b5cf6', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  featureNumberText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  featureText: { flex: 1, color: '#64748b', fontSize: 14, lineHeight: 20 },
  privacyCard: { borderColor: '#a7f3d0', borderWidth: 1, borderRadius: 16, marginBottom: 20, padding: 16 },
  privacyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  privacyTitle: { fontSize: 14, fontWeight: '600', color: '#059669', marginLeft: 8 },
  privacyText: { color: '#047857', fontSize: 13, lineHeight: 18 },
  myQrCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center' },
  myQrTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 16 },
  myQrCodeWrap: { marginBottom: 12 },
  qrCodeDisplay: { alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  qrCodeId: { color: '#64748b', fontSize: 11, marginTop: 8, fontFamily: 'monospace' },
  myQrDesc: { color: '#64748b', fontSize: 13, textAlign: 'center', marginBottom: 12 },
  shareQrBtn: { backgroundColor: '#fff', borderColor: '#8b5cf6', borderWidth: 1, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 20 },
  shareQrBtnText: { color: '#8b5cf6', fontWeight: '600', fontSize: 14 },
  communityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  captureBtn: { backgroundColor: '#059669', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 8 },
  captureBtnText: { color: '#fff', fontSize: 12, fontWeight: '600', marginLeft: 8 },
  communityCard: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 16, padding: 16 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  locationBadge: { backgroundColor: '#f0f9ff', borderColor: '#7dd3fc', borderWidth: 1, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 },
  imageCaption: { color: '#059669', fontSize: 11, marginTop: 4, fontWeight: '500' },
  statButton: { marginRight: 16 },
  trendingCard: {  borderColor: '#fed7aa', borderWidth: 1, borderRadius: 16, padding: 16 },
  trendingTitle: { fontSize: 16, fontWeight: '600', color: '#ea580c', marginBottom: 12 },
  trendingList: { },
  trendingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4, marginBottom: 8 },
  trendingPlace: { fontSize: 14, color: '#1e293b', fontWeight: '500', flex: 1, marginRight: 8 },
  trendingCount: { fontSize: 12, color: '#64748b' },
  communityAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#d1fae5', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  communityAvatarText: { color: '#059669', fontWeight: '700', fontSize: 13 },
  communityUser: { color: '#1e293b', fontWeight: '700', fontSize: 13 },
  communityMeta: { color: '#64748b', fontSize: 11 },
  communityImage: { width: '100%', height: 120, backgroundColor: '#a7f3d0', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  communityPost: { color: '#1e293b', fontSize: 13, marginBottom: 8 },
  communityStats: { flexDirection: 'row' },
  communityStat: { color: '#64748b', fontSize: 12, marginRight: 12 },
  insightsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  insightCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 4, alignItems: 'center', padding: 16 },
  insightValue: { fontSize: 22, fontWeight: '700', color: '#059669', marginBottom: 2 },
  insightLabel: { color: '#64748b', fontSize: 13 },
  insightSubtext: { color: '#9ca3af', fontSize: 11, marginTop: 2 },
  rewardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  rewardDetails: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  rewardLevel: { color: '#e5e7eb', fontSize: 11 },
  rewardsCard: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 16, padding: 16 },
  rewardsTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 12 },
  rewardsList: { },
  rewardItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: 12, padding: 12 },
  rewardIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e0f2fe', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  rewardEmoji: { fontSize: 20 },
  rewardInfo: { flex: 1 },
  rewardName: { fontSize: 14, fontWeight: '600', color: '#1e293b', marginBottom: 2 },
  rewardDesc: { fontSize: 12, color: '#64748b' },
  rewardPoints: { fontSize: 12, fontWeight: '600', color: '#8b5cf6', backgroundColor: '#f3e8ff', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  achievementsCard: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 16, padding: 16 },
  achievementsTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 12 },
  achievementsList: { },
  achievementItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fefce8', borderRadius: 8, padding: 10, marginBottom: 10 },
  achievementBadge: { fontSize: 24, marginRight: 10 },
  achievementText: { flex: 1, fontSize: 13, color: '#713f12', lineHeight: 18 },
  gamificationCard: { backgroundColor: '#8b5cf6', borderRadius: 12, padding: 16, alignItems: 'center' },
  gamificationTitle: { color: '#fff', fontWeight: '700', fontSize: 16, marginBottom: 4 },
  gamificationDesc: { color: '#fff', fontSize: 13, marginBottom: 8 },
  gamificationProgress: { height: 6, borderRadius: 3, backgroundColor: '#a7f3d0', width: '100%' },
  gamificationNext: { color: '#fff', fontSize: 12, marginTop: 6 },
  tabBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    height: 70, 
    backgroundColor: '#fff', 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#f1f5f9'
  },
  tabBarItem: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 8,
    paddingHorizontal: 4
  },
  tabBarItemActive: {
    transform: [{ scale: 1.05 }]
  },
  tabBarIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent'
  },
  tabBarIconContainerActive: {
    backgroundColor: '#059669',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4
  },
  tabBarLabel: { 
    fontSize: 11, 
    color: '#64748b', 
    marginTop: 2,
    fontWeight: '500',
    textAlign: 'center'
  },
  tabBarLabelActive: {
    color: '#059669',
    fontWeight: '700'
  },
  fabWrap: { position: 'absolute', right: 24, zIndex: 10 },
  fabBtn: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#ef4444', 
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: '#ef4444', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 8,
    borderWidth: 3,
    borderColor: '#fff'
  },
});
