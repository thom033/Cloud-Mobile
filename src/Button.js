import React, { useEffect } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import app from './firebase-config';


export default function Button({ color, text, logo }) {
    const styles = buttonStyle(color);
    const auth = getAuth(app);

    useEffect(() => {
        // Initialiser Google Sign-In
        GoogleSignin.configure({
            webClientId: '534031217579-o4th91d6r24a0nttsf8i99ha8da3bg3d.apps.googleusercontent.com',
        });
    }, []);

    const handleGoogleSignIn = async () => {
        try {
          // Vérifier les services Google Play
          await GoogleSignin.hasPlayServices();
    
          // Connexion via Google Sign-In
          const userInfo = await GoogleSignin.signIn();
    
          // Récupérer le token d'identification Google
          const { idToken } = await GoogleSignin.getTokens();
          const credential = GoogleAuthProvider.credential(idToken);
    
          // Authentification avec Firebase
          const auth = getAuth();
          await signInWithCredential(auth, credential);
    
          console.log('Utilisateur connecté avec Google et Firebase', userInfo);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('Connexion annulée');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Connexion en cours');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Services Google Play non disponibles');
          } else {
            console.error('Erreur lors de la connexion', error);
          }
        }
      };
    

    return (
        <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

// Style dynamique basé sur la couleur
const buttonStyle = (color) => StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color || '#007BFF',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 10,
    },
    logo: {
        width: 24,
        height: 24,
    },
});
