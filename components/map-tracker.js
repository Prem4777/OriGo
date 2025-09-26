import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapTracker({ isActive }) {
  const subscriptionRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [region, setRegion] = useState({
    latitude: 9.9312, // Kochi, Kerala (fallback)
    longitude: 76.2673,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [coords, setCoords] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const startTracking = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        const granted = status === 'granted';
        if (!isMounted) return;
        setHasPermission(granted);
        if (!granted) {
          setErrorMsg('Location permission not granted');
          return;
        }

        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (!isMounted) return;
        const currCoord = {
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
        };
        setRegion(r => ({ ...r, ...currCoord, latitudeDelta: 0.01, longitudeDelta: 0.01 }));
        setCoords([currCoord]);

        const sub = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (loc) => {
            const next = {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            };
            setCoords(prev => [...prev, next]);
            setRegion(r => ({ ...r, ...next }));
          }
        );
        subscriptionRef.current = sub;
      } catch (err) {
        if (!isMounted) return;
        setErrorMsg(err?.message || 'Failed to start location tracking');
      }
    };

    const stopTracking = () => {
      try {
        subscriptionRef.current?.remove?.();
      } catch {}
      subscriptionRef.current = null;
    };

    if (isActive) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      isMounted = false;
      try { subscriptionRef.current?.remove?.(); } catch {}
      subscriptionRef.current = null;
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        region={region}
        showsUserLocation={!!hasPermission}
        showsMyLocationButton
        toolbarEnabled={false}
      >
        {coords.length > 0 && (
          <Marker coordinate={coords[coords.length - 1]} title="You" />
        )}
        {coords.length > 1 && (
          <Polyline coordinates={coords} strokeWidth={4} strokeColor="#2563eb" />
        )}
      </MapView>
      {errorMsg && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  errorBanner: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(239,68,68,0.9)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  errorText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
