import React, { useEffect } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import app from '../firebase-config';


export default function Button({ color, text, logo }) {
    const styles = buttonStyle(color);
    const auth = getAuth(app);

    return (
        <TouchableOpacity style={styles.button} >
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
