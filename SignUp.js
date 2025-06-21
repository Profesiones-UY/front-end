import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { API_ENDPOINTS } from './config/api';

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [userType, setUserType] = useState('cliente');
  const [profesion, setProfesion] = useState('');
  const [especialidades, setEspecialidades] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [servicios, setServicios] = useState('');
  const [radioCobertura, setRadioCobertura] = useState('');
  const [direccion, setDireccion] = useState('');

  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(password);
  };

  // Función para obtener coordenadas desde una dirección
  async function getCoordinatesFromAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
    }
    // Si no encuentra, devuelve [0,0] o puedes manejar el error
    return [0, 0];
  }

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword || !phone || !direccion) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (userType === 'profesional' && (!profesion || !especialidades || !experiencia || !servicios || !radioCobertura)) {
      setError('Por favor completa todos los campos de profesional.');
      return;
    }
    if (!validateEmail(email)) {
      setError('El correo electrónico no es válido.');
      return;
    }
    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, mayúscula, minúscula, número y algún carácter especial.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (!/^\d{8,15}$/.test(phone)) {
      setError('El teléfono debe tener entre 8 y 15 dígitos.');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      // 1. Obtener coordenadas
      const coordinates = await getCoordinatesFromAddress(direccion);

      // 2. Armar el body con la ubicación
      let endpoint = API_ENDPOINTS.auth.registroCliente;
      let body = {
        nombre: firstName,
        apellido: lastName,
        email,
        password,
        telefono: phone,
        direccion,
        ubicacion: {
          type: 'Point',
          coordinates: coordinates
        }
      };
      if (userType === 'profesional') {
        endpoint = API_ENDPOINTS.auth.registroProfesional;
        body = {
          ...body,
          profesion,
          especialidades: especialidades.split(',').map(e => e.trim()),
          experiencia: Number(experiencia),
          servicios: [{ nombre: servicios }],
          radio_cobertura: Number(radioCobertura)
        };
      }
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensaje || 'Error en el registro');
      }
      setSuccess('¡Cuenta creada con éxito!');
      setTimeout(() => {
        setSuccess('');
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      setError(error.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formBox}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
          <TouchableOpacity onPress={() => setUserType('cliente')} style={{ marginRight: 20 }}>
            <Text style={{ fontWeight: userType === 'cliente' ? 'bold' : 'normal', color: userType === 'cliente' ? '#12a4ff' : '#222' }}>Usuario</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUserType('profesional')}>
            <Text style={{ fontWeight: userType === 'profesional' ? 'bold' : 'normal', color: userType === 'profesional' ? '#12a4ff' : '#222' }}>Profesional</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Ej: Juan"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Ej: Pérez"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Ej: correo@email.com"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Ej: 099123456"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          maxLength={15}
        />
        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={direccion}
          onChangeText={setDireccion}
          placeholder="Ej: Av. Italia 1234, Montevideo"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Mínimo 8 caracteres"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
        <Text style={styles.label}>Confirmar contraseña</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Repite la contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
        {userType === 'profesional' && (
          <>
            <Text style={styles.label}>Profesión</Text>
            <TextInput style={styles.input} value={profesion} onChangeText={setProfesion} placeholder="Ej: Plomero" placeholderTextColor="#aaa" />
            <Text style={styles.label}>Especialidades</Text>
            <TextInput style={styles.input} value={especialidades} onChangeText={setEspecialidades} placeholder="Ej: Gas, Sanitarios" placeholderTextColor="#aaa" />
            <Text style={styles.label}>Años de experiencia</Text>
            <TextInput style={styles.input} value={experiencia} onChangeText={setExperiencia} placeholder="Ej: 5" placeholderTextColor="#aaa" keyboardType="numeric" />
            <Text style={styles.label}>Servicios</Text>
            <TextInput style={styles.input} value={servicios} onChangeText={setServicios} placeholder="Ej: Reparaciones, Instalaciones" placeholderTextColor="#aaa" />
            <Text style={styles.label}>Radio de cobertura (km)</Text>
            <TextInput style={styles.input} value={radioCobertura} onChangeText={setRadioCobertura} placeholder="Ej: 10" placeholderTextColor="#aaa" keyboardType="numeric" />
          </>
        )}
        <View style={{ height: 10 }} />
        {loading && <ActivityIndicator size="large" color="#12a4ff" style={{ marginBottom: 15 }} />}
        {success ? <Text style={{ color: 'green', fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}>{success}</Text> : null}
        {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
        <View style={{ height: 30 }} />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Registrarme</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 30,
  },
  formBox: {
    width: '95%',
    maxWidth: 500,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    padding: 25,
    alignItems: 'stretch',
    elevation: 2,
  },
  backText: {
    fontSize: 18,
    color: '#222',
    marginBottom: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15,
    color: '#222',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 55,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#12a4ff',
    borderRadius: 5,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SignUp;
