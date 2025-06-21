import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { API_ENDPOINTS } from './config/api';

const ProfessionalProfile = ({ route, navigation }) => {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        console.log('Fetching profile with URL:', API_ENDPOINTS.profiles.profesional(id));
        const response = await fetch(API_ENDPOINTS.profiles.profesional(id));
        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('Response data:', result);
        if (!response.ok) throw new Error(result.mensaje || 'Error al obtener perfil');
        setData(result.data);
      } catch (err) {
        setError(err.message || 'Error de red');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#2196F3" /></View>;
  }
  if (error) {
    return <View style={styles.center}><Text style={styles.error}>{error}</Text></View>;
  }
  if (!data) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerBox}>
        <Image
          source={{ uri: data.avatar || 'https://img.icons8.com/ios-filled/100/cccccc/user-male-circle.png' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{data.nombre} {data.apellido}</Text>
        <Text style={styles.profession}>{data.profesion}</Text>
        {data.especialidades && data.especialidades.length > 0 && (
          <Text style={styles.specialties}>Especialidades: {data.especialidades.join(', ')}</Text>
        )}
        {data.experiencia && (
          <Text style={styles.experience}>Experiencia: {data.experiencia} años</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Servicios ofrecidos</Text>
        {data.servicios && data.servicios.length > 0 ? (
          data.servicios.map((serv, idx) => (
            <Text key={idx} style={styles.serviceItem}>• {serv.nombre}</Text>
          ))
        ) : (
          <Text style={styles.noData}>No hay servicios cargados.</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Calificaciones</Text>
        {data.calificaciones && data.calificaciones.length > 0 ? (
          data.calificaciones.map((cal, idx) => (
            <View key={idx} style={styles.ratingBox}>
              <Text style={styles.ratingScore}>⭐ {cal.puntaje}</Text>
              <Text style={styles.ratingComment}>{cal.comentario}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>Aún no tiene calificaciones.</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
      {/* Botón de WhatsApp */}
      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={() => {
          if (!data.telefono) return;
          // Quitar espacios y símbolos del teléfono
          const phone = data.telefono.replace(/[^0-9]/g, '');
          // Mensaje opcional
          const mensaje = encodeURIComponent('Hola, te contacto desde ProfesionalesUY');
          // Uruguay: +598, asegurar que el número empiece con 9 (celular)
          const url = `https://wa.me/598${phone.startsWith('9') ? phone : '9' + phone}?text=${mensaje}`;
          Linking.openURL(url);
        }}
      >
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' }}
          style={styles.whatsappIcon}
        />
        <Text style={styles.whatsappText}>Enviar Mensaje</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 0,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerBox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 40,
    paddingBottom: 24,
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#2196F3',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#2196F3',
    marginBottom: 12,
    backgroundColor: '#e0e0e0',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#174A6A',
    marginBottom: 2,
  },
  profession: {
    fontSize: 18,
    color: '#2196F3',
    fontWeight: '500',
    marginBottom: 4,
  },
  specialties: {
    fontSize: 15,
    color: '#555',
    marginBottom: 2,
  },
  experience: {
    fontSize: 15,
    color: '#888',
    marginBottom: 2,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 18,
    padding: 16,
    elevation: 2,
    shadowColor: '#2196F3',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#174A6A',
    marginBottom: 8,
  },
  serviceItem: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  noData: {
    fontSize: 15,
    color: '#888',
    fontStyle: 'italic',
  },
  ratingBox: {
    marginBottom: 8,
    backgroundColor: '#f0f6fa',
    borderRadius: 8,
    padding: 8,
  },
  ratingScore: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  ratingComment: {
    fontSize: 15,
    color: '#222',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginTop: 10,
  },
  whatsappIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  whatsappText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfessionalProfile; 