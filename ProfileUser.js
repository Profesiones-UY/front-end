import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, Dimensions, Linking } from 'react-native';

export default function ProfileUser({ route, navigation }) {
  const user = route?.params?.user || {};
  const [avatar, setAvatar] = useState(user.avatar || 'https://img.icons8.com/ios-filled/200/cccccc/user-male-circle.png');
  const [isPrivate, setIsPrivate] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [receiveMessages, setReceiveMessages] = useState(false);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No hay datos de usuario</Text>
      </View>
    );
  }

  // Vista para profesional
  if (user.tipo === 'profesional') {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.editPhotoButton} onPress={() => {}}>
            <Text style={styles.editPhotoText}>Editar foto</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{user.nombre} {user.apellido}</Text>
        <Text style={styles.profession}>{user.profesion || 'Profesional'}</Text>
        {user.especialidades && (
          <Text style={styles.specialties}>Especialidades: {Array.isArray(user.especialidades) ? user.especialidades.join(', ') : user.especialidades}</Text>
        )}
        {user.experiencia && (
          <Text style={styles.experience}>Experiencia: {user.experiencia} años</Text>
        )}
        <Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
        <View style={styles.optionsBox}>
          <Text style={styles.optionsTitle}>Opciones de tu perfil profesional:</Text>
          <Text style={styles.optionItem}>- Gestionar servicios</Text>
          <Text style={styles.optionItem}>- Ver citas recibidas</Text>
          <Text style={styles.optionItem}>- Editar disponibilidad</Text>
          <Text style={styles.optionItem}>- Editar información personal</Text>
          <Text style={styles.optionItem}>- Cambiar contraseña</Text>
        </View>
        {/* Botones de contacto */}
        <View style={styles.contactButtonsRow}>
          {/* WhatsApp */}
          <TouchableOpacity
            style={styles.contactButtonWhatsapp}
            onPress={() => {
              if (!user.telefono) return;
              const phone = user.telefono.replace(/[^0-9]/g, '');
              const mensaje = encodeURIComponent('Hola, te contacto desde ProfesionalesUY');
              const url = `https://wa.me/598${phone.startsWith('9') ? phone : '9' + phone}?text=${mensaje}`;
              Linking.openURL(url);
            }}
          >
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' }} style={styles.contactIcon} />
          </TouchableOpacity>
          {/* Llamada */}
          <TouchableOpacity
            style={styles.contactButtonCall}
            onPress={() => {
              if (!user.telefono) return;
              const phone = user.telefono.replace(/[^0-9]/g, '');
              Linking.openURL(`tel:+598${phone.startsWith('9') ? phone : '9' + phone}`);
            }}
          >
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/25d366/phone.png' }} style={styles.contactIcon} />
          </TouchableOpacity>
          {/* Web */}
          {user.web && (
            <TouchableOpacity
              style={styles.contactButtonWeb}
              onPress={() => Linking.openURL(user.web)}
            >
              <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/2196f3/domain.png' }} style={styles.contactIcon} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Vista para cliente
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.editPhotoButton} onPress={() => {}}>
          <Text style={styles.editPhotoText}>Editar foto</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{user.nombre} {user.apellido}</Text>
      <Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
      <View style={styles.optionsBox}>
        <Text style={styles.optionsTitle}>Opciones de tu perfil:</Text>
        <Text style={styles.optionItem}>- Ver citas agendadas</Text>
        <Text style={styles.optionItem}>- Calificar profesionales</Text>
        <Text style={styles.optionItem}>- Editar información personal</Text>
        <Text style={styles.optionItem}>- Cambiar contraseña</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    padding: 24,
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#2196F3',
    backgroundColor: '#e0e0e0',
  },
  editPhotoButton: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  editPhotoText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#174A6A',
    marginBottom: 8,
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    color: '#2196F3',
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  specialties: {
    fontSize: 15,
    color: '#555',
    marginBottom: 2,
    textAlign: 'center',
  },
  experience: {
    fontSize: 15,
    color: '#888',
    marginBottom: 2,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  value: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  optionsBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 18,
    marginBottom: 18,
    elevation: 2,
  },
  optionsTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#174A6A',
    marginBottom: 8,
  },
  optionItem: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2196F3',
    marginBottom: 10,
  },
  backButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginTop: 18,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactButtonWhatsapp: {
    backgroundColor: '#25D366',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 8,
  },
  contactButtonCall: {
    backgroundColor: '#e0f7e9',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 8,
  },
  contactButtonWeb: {
    backgroundColor: '#e3f2fd',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 8,
  },
  contactIcon: {
    width: 28,
    height: 28,
  },
});
