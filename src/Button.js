import { TouchableOpacity, Image } from 'react-native';
import { Text, StyleSheet } from 'react-native';


export default function Button({color, text, logo}) {
    const styles = buttonStyle(color);
    return (
        <TouchableOpacity style={styles.button}>
        <Image
        source={logo}
        style={styles.logo}
        />
        <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const buttonStyle = (color) => StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        backgroundColor: color,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    logo: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});