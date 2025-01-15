import { StatusBar } from 'expo-status-bar';
import Button from './src/Button';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        color={'#4285F4'}
        text="Sign in with Google"
        logo={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Logo_2013_Google.png/600px-Logo_2013_Google.png' }}
        style={styles.button}
      />
      <Button
        color={'#333'}
        text="Sign in with GitHub"
        logo={{ uri: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' }}
        style={styles.button}
      />
      <Button
        color={'#3b5998'}
        text="Sign in with Facebook"
        logo={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' }}
        style={styles.button}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    marginVertical: 10,
  }
});
