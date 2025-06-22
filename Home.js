import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useUser } from './UserContext';
import Profile from './Profile';
import AbogadoIcono from './assets/IMG/icono1abogado.png';
import AbogadoFondo from './assets/IMG/Estudios-de-abogados-mas-reconocidos-en-Montevideo.jpg';
import ArquitectoIcono from './assets/IMG/ArquitectoIcono.png';
import ArquitectoFondo from './assets/IMG/ArquitectoFondo.jpg';
import { API_ENDPOINTS } from './config/api';

export default function Home({ navigation }) {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user, logout } = useUser();

  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(API_ENDPOINTS.profiles.profesionales);
        const data = await response.json();
        if (!response.ok) throw new Error(data.mensaje || 'Error al obtener profesionales');
        setProfessionals(data.data || []);
      } catch (err) {
        setError(err.message || 'Error de red');
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionals();
  }, []);

  const renderItem = ({ item }) => {
    const isAbogado = item.profesion && item.profesion.toLowerCase().includes('abogado');
    const isArquitecto = item.profesion && item.profesion.toLowerCase().includes('arquitecto');
    let avatarSource = { uri: item.avatar || 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png' };
    let fondoSource = null;
    if (isAbogado) {
      avatarSource = AbogadoIcono;
      fondoSource = AbogadoFondo;
    } else if (isArquitecto) {
      avatarSource = ArquitectoIcono;
      fondoSource = ArquitectoFondo;
    }
    const professionalId = item._id;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProfessionalProfile', { id: professionalId })}>
        <View style={styles.cardNew}>
          <View style={styles.avatarBox}>
            <Image
              source={avatarSource}
              style={styles.avatarNew}
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.userNameNew}>{item.nombre} {item.apellido}</Text>
            <Text style={styles.userProfNew}>{item.profesion}</Text>
          </View>
        </View>
        {fondoSource && (
          <Image source={fondoSource} style={styles.backgroundImage} resizeMode="cover" />
        )}
      </TouchableOpacity>
    );
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.greeting}>¡Hola, {user?.nombre || ''}!</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de profesionales */}
      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={professionals}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContent}
        />
      )}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: '#ededed',
  },
  greeting: {
    fontSize: 20,
    color: '#174A6A',
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 6,
    borderRadius: 6,
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
  cardNew: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#2196F3',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e3eaf2',
  },
  avatarBox: {
    marginRight: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarNew: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#2196F3',
    backgroundColor: '#e0e0e0',
  },
  infoBox: {
    flex: 1,
    justifyContent: 'center',
  },
  userNameNew: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#174A6A',
    marginBottom: 2,
  },
  userProfNew: {
    fontSize: 15,
    color: '#2196F3',
    fontWeight: '500',
  },
  backgroundImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginTop: -10,
    marginBottom: 10,
    alignSelf: 'center',
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
  error: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});
