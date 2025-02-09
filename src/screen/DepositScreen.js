import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Footer from '../components/Footer';
import { db } from '../config/firebase-config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DepositScreen = () => {
  const [amount, setAmount] = useState('');

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Erreur', 'Le montant doit être supérieur à 0.');
      return;
    }

    try {
      // Récupérer l'utilisateur connecté depuis AsyncStorage
      const authConnected = await AsyncStorage.getItem('auth_connected');
      if (!authConnected) {
        alert('Vous devez être connecté pour effectuer un dépôt.');
        return;
      }

      const user = JSON.parse(authConnected);

      const depositData = {
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
        depot: amount,
        idTransactionFond: Math.floor(Math.random() * 1000000), // Générer un ID de transaction aléatoire
        isSynced: false,
        isvalidate: false,
        lastUpdate: Timestamp.now(),
        refTransaction: null,
        retrait: null,
        utilisateur: {
          iduser: user.idUser,
          isSynced: true,
          lastUpdate: Timestamp.now(),
          mail: user.mail,
          tentative: 0,
          password : user.password,
          validate: true,
        },
      };

      await addDoc(collection(db, 'TransactionFonds'), depositData);
      console.log(`Déposer ${amount} USD`);
      alert('Dépôt effectué avec succès.');
      setAmount('');
    } catch (error) {
      console.error('Erreur lors du dépôt:', error);
      alert('Erreur lors du dépôt. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Déposer des fonds</Text>
      <TextInput
        style={styles.input}
        placeholder="Montant en USD"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Déposer" onPress={handleDeposit} />
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
    paddingBottom: 80, // Ajouter un padding en bas pour laisser de l'espace pour le footer
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

export default DepositScreen;