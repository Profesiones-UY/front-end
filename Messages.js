import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const chats = [
  { id: '1', name: 'Jane Doe', avatar: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png' },
  { id: '2', name: 'Juan Perez', avatar: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png' },
  { id: '3', name: 'Ana Lopez', avatar: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png' },
  { id: '4', name: 'Carlos Ruiz', avatar: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png' },
  { id: '5', name: 'Maria Gomez', avatar: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png' },
];

export default function Messages({ navigation }) {
  const [search, setSearch] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatRow} onPress={() => navigation.navigate('Chat', { user: item.name })}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.chatName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Messages</Text>
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar chat..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Lista de chats */}
      <FlatList
        data={filteredChats}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 8,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 70,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ccc',
    marginRight: 12,
  },
  chatName: {
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
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
