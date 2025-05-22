import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, Dimensions } from 'react-native';

export default function ProfileUser({ navigation }) {
  const [isPrivate, setIsPrivate] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [receiveMessages, setReceiveMessages] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      {/* Avatar y nombre */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/200/cccccc/user-male-circle.png' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
      </View>
      {/* Info y switches */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.label}>Website</Text>
        <Text style={styles.label}>Bio</Text>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Private profile</Text>
          <Switch
            value={isPrivate}
            onValueChange={setIsPrivate}
            trackColor={{ false: '#ccc', true: '#4caf50' }}
            thumbColor={isPrivate ? '#fff' : '#fff'}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#ccc', true: '#4caf50' }}
            thumbColor={notifications ? '#fff' : '#fff'}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Receive messages</Text>
          <Switch
            value={receiveMessages}
            onValueChange={setReceiveMessages}
            trackColor={{ false: '#ccc', true: '#4caf50' }}
            thumbColor={receiveMessages ? '#fff' : '#fff'}
          />
        </View>
      </View>
      {/* Barra de navegación inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Messages')}>
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navText, styles.navTextActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ededed',
  },
  backText: {
    fontSize: 16,
    color: '#222',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  infoContainer: {
    paddingHorizontal: 32,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#222',
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 15,
    color: '#444',
  },
  navTextActive: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});
