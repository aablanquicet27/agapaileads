import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MENU_ITEMS = [
  { icon: 'time-outline' as const, label: 'Establecer disponibilidad' },
  { icon: 'notifications-outline' as const, label: 'Notificaciones' },
  { icon: 'language-outline' as const, label: 'Cambiar idioma', value: 'Spanish' },
  { icon: 'swap-horizontal-outline' as const, label: 'Cambiar de cuenta', value: 'Agapai' },
];

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      {/* Profile */}
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AB</Text>
        </View>
        <Text style={styles.name}>Ablanquicet</Text>
        <Text style={styles.email}>ablanquicet@agapai.com.co</Text>
      </View>

      {/* Preferences */}
      <Text style={styles.sectionTitle}>Preferencias</Text>
      {MENU_ITEMS.map((item, i) => (
        <TouchableOpacity key={i} style={styles.menuItem}>
          <Ionicons name={item.icon} size={22} color="#000" />
          <Text style={styles.menuLabel}>{item.label}</Text>
          {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
          <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
        </TouchableOpacity>
      ))}

      {/* Support */}
      <Text style={styles.sectionTitle}>Soporte</Text>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="document-text-outline" size={22} color="#000" />
        <Text style={styles.menuLabel}>Leer documentación</Text>
        <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  profile: { alignItems: 'center', paddingVertical: 32, backgroundColor: '#FFF' },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#E5E5EA', justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 28, fontWeight: '600', color: '#8E8E93' },
  name: { fontSize: 20, fontWeight: '600', marginTop: 12 },
  email: { fontSize: 14, color: '#8E8E93', marginTop: 4 },
  sectionTitle: { fontSize: 13, color: '#8E8E93', marginTop: 24, marginBottom: 8, marginLeft: 16 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 0.5, borderBottomColor: '#E5E5EA', gap: 12,
  },
  menuLabel: { flex: 1, fontSize: 16 },
  menuValue: { fontSize: 16, color: '#8E8E93' },
});
