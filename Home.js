import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Profile from './Profile';

const users = [
  {
    id: '1',
    name: 'Dan Williams',
    professions: 'Abogado, Penalista',
  },
  {
    id: '2',
    name: 'Karen Han',
    professions: 'Arquitecto, Comercial',
  },
];

export default function Home({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Profile', {
      name: item.name,
      profession: item.professions,
      avatar: item.avatar, // si tienes avatar, si no puedes omitirlo
    })}>
      <View style={styles.card}>
        <View style={styles.userRow}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/cccccc/user-male-circle.png' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userProf}>{item.professions}</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/200/cccccc/picture.png' }}
            style={styles.mainImage}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
      {/* Lista de usuarios */}
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
      {/* Barra de navegación inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Messages')}>
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileUser')}>
          <Text style={[styles.navText, styles.navTextActive]}>Profile</Text>
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
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ededed',
  },
  logoutText: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 70,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#ccc',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  userProf: {
    fontSize: 13,
    color: '#444',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    height: 140,
  },
  mainImage: {
    width: '90%',
    height: 120,
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
  safeArea: {
    backgroundColor: '#fff',
  },
});
