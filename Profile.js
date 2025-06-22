import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import { API_ENDPOINTS } from './config/api';
import { useUser } from './UserContext';

const profileImages = Array(6).fill({
  uri: 'https://img.icons8.com/ios-filled/200/cccccc/picture.png',
});

export default function Profile({ route, navigation }) {
  // Recibe los datos del usuario desde la navegación
  const { id, name = 'John Doe', profession = 'Arquitecto', avatar, rating, experience } = route.params || {};
  
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connectionId, setConnectionId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { user } = useUser();

  console.log('Usuario en contexto Profile:', user);
  console.log('ID del profesional:', id);

  // Verificar si ya está conectado con este profesional
  useEffect(() => {
    if (id && user && user._id) {
      checkConnectionStatus();
    }
  }, [id, user]);

  const checkConnectionStatus = async () => {
    // Esta guarda es importante para evitar errores si se llama sin un usuario válido
    if (!user || !user._id) return;
    
    try {
      const response = await fetch(`${API_ENDPOINTS.connections.verificar}?clienteId=${user._id}&profesionalId=${id}`);
      const data = await response.json();
      
      if (data.success) {
        setIsConnected(data.isConnected);
        if (data.data) {
          setConnectionId(data.data._id);
        }
      }
    } catch (error) {
      console.error('Error al verificar conexión:', error);
    }
  };

  const handleConnect = async () => {
    if (!id) {
      Alert.alert('Error', 'ID del profesional no disponible');
      return;
    }

    if (!user || !user._id) {
      Alert.alert('Error', 'Usuario no válido. Por favor, inicia sesión nuevamente.');
      return;
    }

    console.log('Intentando conectar con profesional ID:', id);
    console.log('Usuario logueado ID:', user._id);
    console.log('Usuario completo:', user);

    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.connections.crear, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clienteId: user._id,
          profesionalId: id
        })
      });

      console.log('Respuesta del servidor:', response.status);
      const data = await response.json();
      console.log('Datos de respuesta:', data);
      
      if (data.success) {
        console.log('Conexión exitosa, redirigiendo...');
        setIsConnected(true);
        setConnectionId(data.data._id);
        setShowSuccess(true);
        
        // Mostrar mensaje de éxito y redirigir después de 2 segundos
        setTimeout(() => {
          console.log('Redirigiendo a Messages...');
          setShowSuccess(false);
          navigation.navigate('Messages');
        }, 2000);
        
        Alert.alert(
          '¡Conectado!', 
          'Te has conectado con el profesional exitosamente. Serás redirigido a Messages.',
          [
            {
              text: 'Ir Ahora',
              onPress: () => {
                console.log('Usuario presionó Ir Ahora');
                setShowSuccess(false);
                navigation.navigate('Messages');
              }
            },
            {
              text: 'Esperar',
              style: 'cancel'
            }
          ]
        );
      } else {
        console.log('Error en la respuesta:', data.mensaje);
        Alert.alert('Error', data.mensaje || 'Error al conectar con el profesional');
      }
    } catch (error) {
      console.error('Error al conectar:', error);
      Alert.alert('Error', 'No se pudo conectar con el profesional');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!connectionId) {
      Alert.alert('Error', 'ID de conexión no disponible');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.connections.eliminar(connectionId), {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        setIsConnected(false);
        setConnectionId(null);
        Alert.alert('Éxito', 'Te has desconectado del profesional');
      } else {
        Alert.alert('Error', data.mensaje || 'Error al desconectar del profesional');
      }
    } catch (error) {
      console.error('Error al desconectar:', error);
      Alert.alert('Error', 'No se pudo desconectar del profesional');
    } finally {
      setLoading(false);
    }
  };

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
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userProf}>{profession}</Text>
          {rating && (
            <Text style={styles.ratingText}>⭐ {rating.toFixed(1)}</Text>
          )}
          {experience && (
            <Text style={styles.experienceText}>{experience} años de experiencia</Text>
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.contactButton,
            isConnected ? styles.disconnectButton : styles.connectButton,
            loading && styles.loadingButton,
            showSuccess && styles.successButton
          ]}
          onPress={isConnected ? handleDisconnect : handleConnect}
          disabled={loading}
        >
          <Text style={styles.contactButtonText}>
            {loading ? 'Cargando...' : showSuccess ? '¡Conectado!' : isConnected ? 'Desconectar' : 'Conectar'}
          </Text>
        </TouchableOpacity>
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
  userDetails: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#222',
  },
  userProf: {
    fontSize: 13,
    color: '#444',
  },
  ratingText: {
    fontSize: 13,
    color: '#FFD700',
    marginTop: 2,
  },
  experienceText: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
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
  contactButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginLeft: 'auto',
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  connectButton: {
    backgroundColor: '#4caf50',
  },
  disconnectButton: {
    backgroundColor: '#f44336',
  },
  loadingButton: {
    backgroundColor: '#ccc',
  },
  successButton: {
    backgroundColor: '#4caf50',
    transform: [{ scale: 1.05 }],
  },
});
