import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { API_ENDPOINTS } from './config/api';

export default function Search({ navigation }) {
  const [query, setQuery] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para buscar profesionales en el backend
  const searchProfessionals = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setProfessionals([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.profiles.buscarProfesionales}?profesion=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      
      if (data.success) {
        setProfessionals(data.data);
      } else {
        Alert.alert('Error', data.mensaje || 'Error al buscar profesionales');
        setProfessionals([]);
      }
    } catch (error) {
      console.error('Error al buscar profesionales:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      setProfessionals([]);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para buscar cuando cambia la query (con debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchProfessionals(query);
    }, 500); // Espera 500ms después de que el usuario deje de escribir

    return () => clearTimeout(timeoutId);
  }, [query]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Profile', {
        id: item._id,
        name: `${item.nombre} ${item.apellido}`,
        profession: item.profesion,
        avatar: item.avatar,
        rating: item.promedioCalificacion,
        experience: item.experiencia
      })}
    >
      <Image
        source={{ uri: 'https://img.icons8.com/ios-filled/50/cccccc/user-male-circle.png' }}
        style={styles.avatar}
      />
      <Text style={styles.professionalName}>{item.nombre} {item.apellido}</Text>
      <Text style={styles.professionText}>{item.profesion}</Text>
      {item.promedioCalificacion > 0 && (
        <Text style={styles.ratingText}>⭐ {item.promedioCalificacion.toFixed(1)}</Text>
      )}
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
          placeholder="Buscar por profesión (ej: Plomero, Arquitecto)..."
          value={query}
          onChangeText={setQuery}
        />
      </View>
      
      {/* Loading indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Buscando profesionales...</Text>
        </View>
      )}
      
      {/* Results */}
      {!loading && (
        <>
          <Text style={styles.suggestionsLabel}>
            {professionals.length > 0 
              ? `${professionals.length} profesional(es) encontrado(s)` 
              : query.trim() ? 'No se encontraron profesionales' : 'Ingresa una profesión para buscar'
            }
          </Text>
          <FlatList
            data={professionals}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            numColumns={2}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
      
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#222',
  },
  professionalName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 2,
  },
  professionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 4,
  },
});
