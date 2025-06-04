import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    // Validación básica
    if (!firstName || !lastName || !email || !password || !rePassword) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (password !== rePassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    // Aquí podrías agregar más validaciones (email válido, etc)
    setError('');
    // Simula registro exitoso y vuelve a Login
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formBox}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder=""
        />
        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder=""
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder=""
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder=""
          secureTextEntry
        />
        <Text style={styles.label}>Re enter password</Text>
        <TextInput
          style={styles.input}
          value={rePassword}
          onChangeText={setRePassword}
          placeholder=""
          secureTextEntry
        />
        <View style={{ height: 10 }} />
        {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
        <View style={{ height: 30 }} />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
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
