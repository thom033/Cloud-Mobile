import Button from '../components/Button';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from 'react-native';
export default function LoginScreen() {
    
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Please Sign In</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        
        <Text style={styles.orText}>Or sign in using one of these options:</Text>
        
        <View style={styles.socialButtonsContainer}>
          <Button
            color={'#4285F4'}
            text="Google"
            logo={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Logo_2013_Google.png/600px-Logo_2013_Google.png' }}
            style={styles.socialButton}
          />
          <Button
            color={'#333'}
            text="GitHub"
            logo={{ uri: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' }}
            style={styles.socialButton}
          />
          <Button
            color={'#3b5998'}
            text="Facebook"
            logo={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' }}
            style={styles.socialButton}
          />
        </View>
        
        <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 5,
      paddingHorizontal: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
    },
    submitButton: {
      width: '100%',
      height: 50,
      backgroundColor: '#4CAF50',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    orText: {
      fontSize: 16,
      color: '#666',
      marginVertical: 10,
    },
    socialButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    socialButton: {
      flex: 1,
      marginHorizontal: 5,
    },
  });
  
