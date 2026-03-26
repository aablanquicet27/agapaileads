import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLeadStore } from '@/lib/store';

const STAGES = ['Contacto Inicial', 'Calificado', 'Propuesta', 'Negociación', 'Cerrado'];

export default function LeadsScreen() {
  const router = useRouter();
  const leads = useLeadStore((s) => s.leads);

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#8E8E93" />
        <TextInput
          style={styles.searchInput}
          placeholder="Búsqueda y filtro"
          placeholderTextColor="#8E8E93"
        />
      </View>

      {/* Pipeline header */}
      <Text style={styles.stageTitle}>CONTACTO INICIAL</Text>
      <Text style={styles.stageInfo}>{leads.length} leads: $0</Text>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        {STAGES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.progressSegment,
              { backgroundColor: i === 0 ? '#0A84FF' : '#E5E5EA' },
            ]}
          />
        ))}
      </View>

      {/* Leads list or empty state */}
      {leads.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No hay leads aquí todavía</Text>
          <Text style={styles.emptySubtitle}>
            El pipeline te ayuda a gestionar los leads de todas las fuentes en un solo tablero
          </Text>
        </View>
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.leadCard}
              onPress={() => router.push(`/lead/${item.id}`)}
            >
              <Text style={styles.leadName}>{item.name}</Text>
              <Text style={styles.leadPhone}>{item.phone}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Quick actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="person-add-outline" size={24} color="#0A84FF" />
          <Text style={styles.actionText}>Agregar contacto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="cash-outline" size={24} color="#0A84FF" />
          <Text style={styles.actionText}>Agregar lead</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="checkbox-outline" size={24} color="#0A84FF" />
          <Text style={styles.actionText}>Agregar tarea</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5EA',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 36,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },
  stageTitle: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 16 },
  stageInfo: { fontSize: 14, color: '#8E8E93', marginHorizontal: 16, marginTop: 4 },
  progressBar: { flexDirection: 'row', marginHorizontal: 16, marginTop: 12, gap: 2 },
  progressSegment: { flex: 1, height: 4, borderRadius: 2 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  emptyTitle: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  emptySubtitle: { fontSize: 14, color: '#8E8E93', textAlign: 'center', marginTop: 8 },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  actionBtn: { alignItems: 'center', gap: 4 },
  actionText: { fontSize: 11, color: '#8E8E93' },
  leadCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 12,
  },
  leadName: { fontSize: 16, fontWeight: '600' },
  leadPhone: { fontSize: 14, color: '#8E8E93', marginTop: 4 },
});
