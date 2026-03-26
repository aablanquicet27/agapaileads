import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AB</Text>
        </View>
        <Text style={styles.name}>Ablanquicet</Text>
        <Text style={styles.email}>ablanquicet@agapai.com.co</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias</Text>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="notifications-outline" size={22} color="#333" />
          <Text style={styles.optionText}>Notificaciones</Text>
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="language-outline" size={22} color="#333" />
          <Text style={styles.optionText}>Idioma</Text>
          <Text style={styles.optionValue}>Spanish</Text>
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="swap-horizontal-outline" size={22} color="#333" />
          <Text style={styles.optionText}>Cambiar de cuenta</Text>
          <Text style={styles.optionValue}>Agapai</Text>
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soporte</Text>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="book-outline" size={22} color="#333" />
          <Text style={styles.optionText}>Leer documentación</Text>
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  profile: { alignItems: 'center', paddingVertical: 30, backgroundColor: '#fff' },
  avatar: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: '#e0e0e0',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 28, fontWeight: 'bold', color: '#666' },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 12 },
  email: { fontSize: 14, color: '#888', marginTop: 4 },
  section: { marginTop: 20, backgroundColor: '#fff', paddingVertical: 8 },
  sectionTitle: { fontSize: 13, color: '#888', paddingHorizontal: 16, paddingVertical: 8 },
  option: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14,
  },
  optionText: { flex: 1, fontSize: 16, marginLeft: 12 },
  optionValue: { fontSize: 14, color: '#888', marginRight: 8 },
});
