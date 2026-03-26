import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="help-circle" size={80} color="#0077B6" style= alignSelf: 'center', marginBottom: 20  />
      <Text style={styles.title}>¿Necesitas ayuda?</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => Linking.openURL('https://docs.kapso.ai')}
      >
        <Ionicons name="document-text-outline" size={24} color="#0077B6" />
        <Text style={styles.optionText}>Documentación Kapso</Text>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => Linking.openURL('https://agapai.com.co')}
      >
        <Ionicons name="globe-outline" size={24} color="#0077B6" />
        <Text style={styles.optionText}>AGAPAI Website</Text>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Ionicons name="chatbox-ellipses-outline" size={24} color="#0077B6" />
        <Text style={styles.optionText}>Contactar soporte</Text>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  option: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    backgroundColor: '#f9f9f9', borderRadius: 10, marginBottom: 12,
  },
  optionText: { flex: 1, fontSize: 16, marginLeft: 12 },
});
