import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default function Login({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Usuario');

  return (
    <View style={styles.container}>
      {/* Logo Placeholder */}
      <View style={styles.logoContainer}>
        <Image
          source={require('./Imagenes/Logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>PROFESIONES</Text>
      <Text style={styles.title}>UY</Text>
      {/* Selector */}
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={[styles.selectorButton, selectedTab === 'Usuario' && styles.selectorButtonActive]}
          onPress={() => setSelectedTab('Usuario')}
        >
          <Text style={[styles.selectorText, selectedTab === 'Usuario' && styles.selectorTextActive]}>Usuario</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectorButton, selectedTab === 'Profesional' && styles.selectorButtonActive]}
          onPress={() => setSelectedTab('Profesional')}
        >
          <Text style={[styles.selectorText, selectedTab === 'Profesional' && styles.selectorTextActive]}>Profesional</Text>
        </TouchableOpacity>
      </View>
      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
      />
      {/* Botón Ingresar */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.loginButtonText}>Ingresar</Text>
      </TouchableOpacity>
      {/* Links */}
      <View style={styles.linksContainer}>
        <TouchableOpacity>
          <Text style={styles.registerText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
    tintColor: '#2196F3',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#174A6A',
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: -5,
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    marginVertical: 20,
    overflow: 'hidden',
  },
  selectorButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  selectorButtonActive: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  selectorText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '500',
  },
  selectorTextActive: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  loginButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 4,
  },
  registerText: {
    color: '#2196F3',
    fontSize: 15,
  },
  forgotText: {
    color: '#888',
    fontSize: 15,
  },
});
