import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getCryptoRates } from '../services/cryptoService';
import { getCryptoHistory, listenToCryptoHistoryUpdates } from '../services/cryptoHistoryService';
import Footer from '../components/Footer'; // Import du composant Footer

const CryptoGrapheScreen = () => {
  const [cryptos, setCryptos] = useState([]); // Liste des cryptos disponibles
  const [selectedCrypto, setSelectedCrypto] = useState(null); // Crypto sélectionnée
  const [cryptoHistory, setCryptoHistory] = useState([]); // Historique de la crypto sélectionnée
  const [allCryptoHistory, setAllCryptoHistory] = useState([]); // Historique de toutes les cryptos

  // Récupérer la liste des cryptos disponibles
  useEffect(() => {
    const fetchCryptos = async () => {
      const data = await getCryptoRates(); // Appel au service pour récupérer les cryptos
      setCryptos(data); // Mettre à jour l'état avec les cryptos disponibles
    };

    fetchCryptos();
  }, []);

  // Récupérer l'historique de toutes les cryptos
  useEffect(() => {
    const fetchAllCryptoHistory = async () => {
      const allHistory = await Promise.all(cryptos.map(crypto => getCryptoHistory(crypto.id)));
      setAllCryptoHistory(allHistory.flat());
    };

    if (cryptos.length > 0) {
      fetchAllCryptoHistory();
    }
  }, [cryptos]);

  // Fonction pour gérer la sélection d'une crypto
  const handleSelectCrypto = async (crypto) => {
    setSelectedCrypto(crypto); // Mettre à jour la crypto sélectionnée
    setCryptoHistory([]); // Réinitialiser l'historique chaque fois qu'une nouvelle crypto est sélectionnée

    // Récupérer les données historiques initiales
    const historyData = await getCryptoHistory(crypto.id);
    setCryptoHistory(historyData); // Afficher les données historiques initiales

    // Écoute des mises à jour en temps réel
    const unsubscribe = listenToCryptoHistoryUpdates(crypto.id, (updatedHistory) => {
      setCryptoHistory(updatedHistory); // Mettre à jour l'historique en temps réel
    });

    // Retourner une fonction de nettoyage pour arrêter l'écoute en cas de changement de crypto
    return () => unsubscribe();
  };

  // Préparer les données pour le graphique de la crypto sélectionnée
  const chartData = {
    labels: cryptoHistory.slice(-20).map(entry => entry.dateCours.toLocaleTimeString()), // Labels pour l'axe X
    datasets: [
      {
        data: cryptoHistory.slice(-20).map(entry => entry.montant), // Données pour l'axe Y
      },
    ],
  };

  // Préparer les données pour le graphique général
  const generalChartData = {
    labels: allCryptoHistory.slice(-20).map(entry => entry.dateCours.toLocaleTimeString()), // Labels pour l'axe X
    datasets: [
      {
        data: allCryptoHistory.slice(-20).map(entry => entry.montant), // Données pour l'axe Y
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Détails des Cryptos</Text>

      {/* Liste des cryptos disponibles */}
      <ScrollView style={styles.cryptoList}>
        {cryptos.map((crypto) => (
          <TouchableOpacity
            key={crypto.id}
            style={styles.cryptoItem}
            onPress={() => handleSelectCrypto(crypto)} // Sélectionner une crypto
          >
            <Text style={styles.cryptoName}>{crypto.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Graphique général */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsHeader}>Graphique Général</Text>
        {allCryptoHistory.length > 0 ? (
          <LineChart
            data={generalChartData}
            width={Dimensions.get('window').width - 32} // from react-native
            height={220}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : (
          <Text>Aucun historique disponible.</Text>
        )}
      </View>

      {/* Détails de la crypto sélectionnée */}
      <View style={styles.detailsContainer}>
        {selectedCrypto ? (
          <>
            <Text style={styles.detailsHeader}>Détails de {selectedCrypto.name}</Text>
            <Text>ID: {selectedCrypto.id}</Text>
            <Text>Symbol: {selectedCrypto.symbol}</Text>
            <Text>Prix actuel: {selectedCrypto.currentPrice} USD</Text>

            <Text style={styles.historyHeader}>Historique :</Text>
            {cryptoHistory.length > 0 ? (
              <LineChart
                data={chartData}
                width={Dimensions.get('window').width - 32} // from react-native
                height={220}
                yAxisLabel="$"
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            ) : (
              <Text>Aucun historique disponible.</Text>
            )}
          </>
        ) : (
          <Text style={styles.noSelectionText}>Sélectionnez une crypto pour voir les détails.</Text>
        )}
      </View>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f5f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e3a8a',
  },
  cryptoList: {
    maxHeight: 150,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cryptoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cryptoName: {
    fontSize: 16,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1e40af',
  },
  historyHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#1e40af',
  },
  historyList: {
    maxHeight: 200, // Définir une hauteur pour permettre le défilement
  },
  noSelectionText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default CryptoGrapheScreen;