import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';

const users = [
  { id: '1', name: 'Dan Williams', professions: 'Plomero Montevideo', avatar: null },
  { id: '2', name: 'Karen Han', professions: 'Arquitecto, Comercial', avatar: null },
  { id: '3', name: 'Juan Perez', professions: 'Plomero Montevideo', avatar: null },
  { id: '4', name: 'Ana Lopez', professions: 'Electricista', avatar: null },
  { id: '5', name: 'Carlos Ruiz', professions: 'Plomero Montevideo', avatar: null },
  { id: '6', name: 'Maria Gomez', professions: 'Gasista', avatar: null },
];

export default function Search({ navigation }) {
  const [query, setQuery] = useState('');

  // Filtra usuarios según el texto ingresado
  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.professions.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Profile', {
        name: item.name,
        profession: item.professions,
        avatar: item.avatar,
      })}
    >
      <Image
        source={{ uri: 'https://img.icons8.com/ios-filled/50/cccccc/user-male-circle.png' }}
        style={styles.avatar}
      />
      <Image
        source={{ uri: 'https://img.icons8.com/ios-filled/200/cccccc/picture.png' }}
        style={styles.mainImage}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.searchLabel}>Search</Text>
        <TextInput
          style={styles.input}
          placeholder="Plomero Montevideo..."
          value={query}
          onChangeText={setQuery}
        />
      </View>
      {/* Suggestions */}
      <Text style={styles.suggestionsLabel}>Suggestions</Text>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
      {/* Barra de navegación inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Messages')}>
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navText, styles.navTextActive]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileUser')}>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const cardSize = (width - 48) / 2;

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
    marginBottom: 10,
  },
  searchLabel: {
    fontSize: 16,
    color: '#222',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  suggestionsLabel: {
    fontSize: 16,
    color: '#222',
    marginLeft: 16,
    marginBottom: 8,
  },
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 70,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 6,
    width: cardSize,
    height: cardSize,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ccc',
    marginBottom: 8,
  },
  mainImage: {
    width: '80%',
    height: '60%',
    resizeMode: 'contain',
    tintColor: '#e0e0e0',
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
