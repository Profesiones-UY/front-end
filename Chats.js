import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Chat({ route, navigation }) {
  const { user } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim() === '') return;
    setMessages([...messages, { text: message, fromMe: true }]);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <SafeAreaView>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png' }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{user}</Text>
        </View>
      </SafeAreaView>
      {/* Área de mensajes */}
      <ScrollView style={styles.messagesArea} contentContainerStyle={styles.messagesContent}>
        {messages.map((msg, idx) => (
          <View
            key={idx}
            style={msg.fromMe ? styles.bubbleMe : styles.bubbleOther}
          >
            <Text style={styles.bubbleText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Barra de envío de mensaje */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={28} color="#2196F3" />
        </TouchableOpacity>
      </View>
      {/* Barra de navegación inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Messages')}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 32,
    paddingVertical: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    margin: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 12,
  },
  userName: {
    fontSize: 24,
    color: '#222',
    fontWeight: 'bold',
  },
  messagesArea: {
    flex: 1,
    backgroundColor: '#ededed',
    marginHorizontal: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  messagesContent: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  bubbleMe: {
    alignSelf: 'flex-end',
    backgroundColor: '#2196F3',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    maxWidth: '80%',
  },
  bubbleOther: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  bubbleText: {
    color: '#222',
    fontSize: 16,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2196F3',
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
