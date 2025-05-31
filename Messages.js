import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

const messages = [
  { id: 1, user: 'Jane Doe', avatar: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png', align: 'right' },
  { id: 2, user: 'User1', avatar: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png', align: 'left' },
  { id: 3, user: 'Jane Doe', avatar: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png', align: 'right' },
  { id: 4, user: 'User2', avatar: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png', align: 'left' },
  { id: 5, user: 'Jane Doe', avatar: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png', align: 'right' },
  { id: 6, user: 'User3', avatar: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png', align: 'left' },
];

export default function Messages({ navigation }) {
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
        <Image source={{ uri: messages[0].avatar }} style={styles.avatar} />
        <Text style={styles.name}>Jane Doe</Text>
      </View>
      {/* Mensajes */}
      <ScrollView contentContainerStyle={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((msg, idx) => (
          <View key={msg.id} style={[styles.messageRow, msg.align === 'right' ? styles.right : styles.left]}>
            {msg.align === 'left' && <Image source={{ uri: msg.avatar }} style={styles.msgAvatar} />}
            <View style={styles.bubble} />
            {msg.align === 'right' && <Image source={{ uri: msg.avatar }} style={styles.msgAvatar} />}
          </View>
        ))}
      </ScrollView>
      {/* Barra de navegación inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navText, styles.navTextActive]}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileUser')}>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const bubbleWidth = width * 0.6;

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
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    marginBottom: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 70,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  msgAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
  bubble: {
    width: bubbleWidth,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 24,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginBottom: 40,
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
