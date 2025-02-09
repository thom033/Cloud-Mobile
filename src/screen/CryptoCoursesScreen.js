import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Footer from '../components/Footer';
import { useTheme } from '../../contexts/ThemeContext'; // Import du contexte de thème
import { getCryptoRates, listenToCryptoRates } from '../services/cryptoService'; // Import des fonctions de service
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Import de l'icône FontAwesome

const CryptoCoursesScreen = () => {
  const navigation = useNavigation();
  const { darkMode } = useTheme(); // Accède au mode sombre ou clair
  const [cryptos, setCryptos] = useState([]); // État pour stocker les données des cryptos
  const [favorites, setFavorites] = useState([]); // État pour stocker les cryptos favoris
  const [showFavorites, setShowFavorites] = useState(false); // État pour gérer l'affichage des cryptos favoris

  // Récupère les données au montage du composant
  useEffect(() => {
    const fetchCryptoRates = async () => {
      const data = await getCryptoRates();
      setCryptos(data); // Mettre à jour les cryptos récupérées
    };

    fetchCryptoRates();

    // Écoute en temps réel
    listenToCryptoRates(setCryptos);
  }, []);

  const toggleFavorite = (crypto) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(crypto.name)) {
        return prevFavorites.filter((fav) => fav !== crypto.name);
      } else {
        return [...prevFavorites, crypto.name];
      }
    });
  };

  const themeStyles = darkMode ? styles.darkTheme : styles.lightTheme; // Applique les styles du mode sombre ou clair

  const displayedCryptos = showFavorites
    ? cryptos.filter((crypto) => favorites.includes(crypto.name))
    : cryptos;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <Text style={[styles.header, themeStyles.header]}>Crypto Courses</Text>

      <TouchableOpacity
        style={[styles.button, themeStyles.button]}
        onPress={() => navigation.navigate('CryptoGraphe')} // Redirige vers CryptoGrapheScreen
      >
        <Text style={[styles.buttonText, themeStyles.buttonText]}>Voir la courbe</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, themeStyles.button]}
        onPress={() => setShowFavorites(!showFavorites)} // Bascule l'affichage des favoris
      >
        <Text style={[styles.buttonText, themeStyles.buttonText]}>
          {showFavorites ? 'Afficher toutes les cryptos' : 'Afficher les favoris'}
        </Text>
      </TouchableOpacity>

      {/* Affichage des cryptos */}
      <ScrollView style={[styles.cryptoList, themeStyles.cryptoList]}>
        {displayedCryptos.map((crypto, index) => (
          <View key={`${crypto.name}-${index}`} style={styles.cryptoItem}>
            <Text style={[styles.cryptoName, themeStyles.cryptoName]}>
              {crypto.name}
            </Text>
            <Text style={[styles.cryptoDetails, themeStyles.cryptoDetails]}>
              Valeur: {crypto.val}
            </Text>
            <Text style={[styles.cryptoDetails, themeStyles.cryptoDetails]}>
              Montant: {crypto.montant}
            </Text>
            <Text style={[styles.cryptoDetails, themeStyles.cryptoDetails]}>
              Dernière mise à jour: {crypto.dateCours}
            </Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(crypto)}
            >
              <FontAwesome
                name={favorites.includes(crypto.name) ? 'star' : 'star-o'}
                size={24}
                color={favorites.includes(crypto.name) ? '#FFD700' : '#000'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 80, // Ajouter un padding en bas pour laisser de l'espace pour le footer
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  cryptoList: {
    marginTop: 16,
    padding: 8,
  },
  cryptoItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cryptoName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cryptoDetails: {
    fontSize: 16,
    marginTop: 4,
  },
  favoriteButton: {
    marginTop: 8,
    padding: 8,
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: '#000',
    textAlign: 'center',
  },
  button: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  // Dark Theme Styles
  darkTheme: {
    container: {
      backgroundColor: '#121212',
    },
    header: {
      color: '#fff',
    },
    picker: {
      backgroundColor: '#333',
      color: '#fff',
    },
    cryptoList: {
      backgroundColor: '#333',
    },
    cryptoName: {
      color: '#fff',
    },
    cryptoDetails: {
      color: '#fff',
    },
  },

  // Light Theme Styles
  lightTheme: {
    container: {
      backgroundColor: '#f1f5f9',
    },
    header: {
      color: '#1F2937',
    },
    picker: {
      backgroundColor: '#ffffff',
      color: '#1F2937',
    },
    cryptoList: {
      backgroundColor: '#ffffff',
    },
    cryptoName: {
      color: '#1F2937',
    },
    cryptoDetails: {
      color: '#1F2937',
    },
  },
});

export default CryptoCoursesScreen;
