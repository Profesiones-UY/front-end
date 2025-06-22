import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_ENDPOINTS } from './config/api';
import { useUser } from './UserContext';

export default function Messages({ navigation }) {
  const [search, setSearch] = useState('');
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  console.log('Usuario en contexto Messages:', user);

  // Cargar las conexiones del cliente
  useEffect(() => {
    if (user && user._id) {
      loadConnections();
    }
  }, [user]);

  // Escuchar cuando la pantalla se enfoca para actualizar la lista
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (user && user._id) {
        loadConnections();
      }
    });

    return unsubscribe;
  }, [navigation, user]);

  const loadConnections = async () => {
    // Esta guarda es importante para evitar errores si se llama sin un usuario válido
    if (!user || !user._id) return;
    
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.connections.cliente(user._id));
      const data = await response.json();
      
      if (data.success) {
        setConnections(data.data);
      } else {
        Alert.alert('Error', data.mensaje || 'Error al cargar las conexiones');
      }
    } catch (error) {
      console.error('Error al cargar conexiones:', error);
      Alert.alert('Error', 'No se pudieron cargar las conexiones');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar conexiones según el texto de búsqueda
  const filteredConnections = connections.filter(connection =>
    connection.profesional.nombre.toLowerCase().includes(search.toLowerCase()) ||
    connection.profesional.apellido.toLowerCase().includes(search.toLowerCase()) ||
    connection.profesional.profesion.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatRow} 
      onPress={() => navigation.navigate('Chat', { 
        profesional: item.profesional,
        connectionId: item._id
      })}
    >
      <Image 
        source={{ 
          uri: item.profesional.avatar || 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png' 
        }} 
        style={styles.avatar} 
      />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>
          {item.profesional.nombre} {item.profesional.apellido}
        </Text>
        <Text style={styles.professionText}>{item.profesional.profesion}</Text>
        {item.profesional.promedioCalificacion > 0 && (
          <Text style={styles.ratingText}>⭐ {item.profesional.promedioCalificacion.toFixed(1)}</Text>
        )}
      </View>
      <Text style={styles.connectionDate}>
        {new Date(item.fechaConexion).toLocaleDateString()}
      </Text>
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
          placeholder="Buscar profesional conectado..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      
      {/* Lista de chats */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando conexiones...</Text>
        </View>
      ) : connections.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbubbles-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No tienes conexiones aún</Text>
          <Text style={styles.emptySubtext}>
            Busca y conecta con profesionales para poder chatear con ellos
          </Text>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.searchButtonText}>Buscar Profesionales</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredConnections}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={loadConnections}
        />
      )}
      
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
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
  },
  professionText: {
    fontSize: 14,
    color: '#444',
  },
  ratingText: {
    fontSize: 14,
    color: '#444',
  },
  connectionDate: {
    fontSize: 12,
    color: '#444',
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
    color: '#444',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
  },
  searchButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
