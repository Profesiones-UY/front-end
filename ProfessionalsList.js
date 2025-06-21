import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { API_ENDPOINTS } from './config/api';

const ProfessionalsList = ({ navigation }) => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchProfessionals = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_ENDPOINTS.baseURL + '/profiles/profesionales');
      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje || 'Error al obtener profesionales');
      setProfessionals(data.data || []);
    } catch (err) {
      setError(err.message || 'Error de red');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProfessionals();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProfessionalProfile', {
      id: item._id
    })}>
      <View style={styles.avatarBox}>
        <Image
          source={{ uri: item.avatar || 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png' }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.name}>{item.nombre} {item.apellido}</Text>
        <Text style={styles.profession}>{item.profesion || 'Profesional'}</Text>
        {item.especialidades && <Text style={styles.specialties}>{item.especialidades.join(', ')}</Text>}
        {item.experiencia && <Text style={styles.experience}>Experiencia: {item.experiencia} años</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profesionales</Text>
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={<Text style={styles.empty}>No hay profesionales para mostrar.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#174A6A',
    marginBottom: 18,
    alignSelf: 'center',
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 14,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatarBox: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
  },
  infoBox: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  profession: {
    fontSize: 15,
    color: '#2196F3',
    marginTop: 2,
  },
  specialties: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  experience: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  error: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  empty: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default ProfessionalsList; 