import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Footer from '../components/Footer';
import { db, auth } from '../config/firebase-config'; // Assurez-vous que auth est importé correctement
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const DepositScreen = () => {
  const [amount, setAmount] = useState('');

  const handleDeposit = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('Vous devez être connecté pour effectuer un dépôt.');
        return;
      }

      const depositData = {
        adminValidation: false,
        dateTransaction: Timestamp.now(),
        chronology: {
          calendarType: 'iso8601',
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
          iduser: user.uid,
          isSynced: true,
          lastUpdate: Timestamp.now(),
          mail: user.email,
          password: user.password, // Assurez-vous de ne pas stocker de mot de passe en clair
          tentative: 0,
          validate: true,
        },
      };

      await addDoc(collection(db, 'TransactionFond'), depositData);
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