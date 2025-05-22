import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const profileImages = Array(6).fill({
  uri: 'https://img.icons8.com/ios-filled/200/cccccc/picture.png',
});

export default function Profile({ route, navigation }) {
  // Recibe los datos del usuario desde la navegación
  const { name = 'John Doe', profession = 'Arquitecto', avatar } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      {/* Info usuario */}
      <View style={styles.userInfo}>
        <Image
          source={avatar ? { uri: avatar } : { uri: 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userProf}>{profession}</Text>
        </View>
      </View>
      {/* Grid de imágenes */}
      <FlatList
        data={profileImages}
        renderItem={({ item }) => (
          <View style={styles.imageCard}>
            <Image source={{ uri: item.uri }} style={styles.gridImage} />
          </View>
        )}
        keyExtractor={(_, idx) => idx.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
      {/* Barra de navegación inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileUser')}>
          <Text style={[styles.navText, styles.navTextActive]}>Profile</Text>
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
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: '#ccc',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#222',
  },
  userProf: {
    fontSize: 16,
    color: '#444',
  },
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 70,
  },
  imageCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 6,
    width: cardSize,
    height: cardSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridImage: {
    width: '80%',
    height: '80%',
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
