import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Footer from '../components/Footer';
import { db } from '../config/firebase-config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WithdrawScreen = () => {
  const [amount, setAmount] = useState('');

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Erreur', 'Le montant doit être supérieur à 0.');
      return;
    }

    try {
      // Récupérer l'utilisateur connecté depuis AsyncStorage
      const authConnected = await AsyncStorage.getItem('auth_connected');
      if (!authConnected) {
        alert('Vous devez être connecté pour effectuer un retrait.');
        return;
      }

      const user = JSON.parse(authConnected);

      const withdrawData = {
        adminValidation: false,
        dateTransaction: Timestamp.now(),
        chronology: {
          calendarType: 'iso8601',
          id: 'ISO',
          dayOfMonth: new Date().getDate(),
          dayOfWeek: new Date().toLocaleString('en-US', { weekday: 'long' }).toUpperCase(),
          dayOfYear: Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24),
          hour: new Date().getHours(),
          minute: new Date().getMinutes(),
          month: new Date().toLocaleString('en-US', { month: 'long' }).toUpperCase(),
          monthValue: new Date().getMonth() + 1,
          nano: new Date().getMilliseconds() * 1000000,
          second: new Date().getSeconds(),
          year: new Date().getFullYear(),
        },
        depot: null,
        idTransactionFond: Math.floor(Math.random() * 1000000), // Générer un ID de transaction aléatoire
        isSynced: false,
        isvalidate: false,
        lastUpdate: Timestamp.now(),
        refTransaction: null,
        retrait: amount,
        utilisateur: {
          iduser: user.idUser,
          isSynced: true,
          lastUpdate: Timestamp.now(),
          mail: user.mail,
          password: user.password, // Utiliser une valeur par défaut si undefined
          tentative: 0,
          validate: true,
        },
      };

      await addDoc(collection(db, 'TransactionFonds'), withdrawData);
      console.log(`Retirer ${amount} USD`);
      alert('Retrait effectué avec succès.');
      setAmount('');
    } catch (error) {
      console.error('Erreur lors du retrait:', error);
      alert('Erreur lors du retrait. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Retirer des fonds</Text>
      <TextInput
        style={styles.input}
        placeholder="Montant en USD"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Retirer" onPress={handleWithdraw} />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default WithdrawScreen;