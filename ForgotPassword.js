import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  const handleReset = () => {
    if (!email) {
      setError('Por favor ingresa tu correo electrónico.');
      return;
    }
    if (!validateEmail(email)) {
      setError('El correo electrónico no es válido.');
      return;
    }
    setError('');
    // Aquí iría la lógica para enviar el email de recuperación
    alert('Si el correo es válido, recibirás instrucciones para restablecer tu contraseña.');
  };

  return (
    <View style={styles.container}>
      {/* Botón Back */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      {/* Instrucción */}
      <Text style={styles.instruction}>
        Por favor, ingresa el correo electrónico que usaste para registrarte en tu cuenta.
      </Text>
      {/* Campo de email */}
      <Text style={styles.label}>Correo electrónico*</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      {/* Botón para resetear contraseña */}
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Restablecer contraseña</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    padding: 24,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  backText: {
    fontSize: 16,
    color: '#222',
  },
  instruction: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 32,
    color: '#222',
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    color: '#222',
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 24,
    color: '#333',
  },
  resetButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
