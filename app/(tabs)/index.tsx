import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useLeadStore, Lead, PIPELINE_STAGES } from '@/store/leads';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

function LeadCard({ lead }: { lead: Lead }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/lead/${lead.id}`)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardName}>{lead.name}</Text>
        <Text style={styles.cardValue}>${lead.value.toLocaleString()}</Text>
      </View>
      <Text style={styles.cardPhone}>{lead.phone}</Text>
      {lead.email && <Text style={styles.cardEmail}>{lead.email}</Text>}
    </TouchableOpacity>
  );
}

export default function LeadsScreen() {
  const { leads, currentStage, setCurrentStage } = useLeadStore();
  const stageLeads = leads.filter((l) => l.stage === currentStage);
  const stageInfo = PIPELINE_STAGES.find((s) => s.id === currentStage);

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Búsqueda y filtro"
          placeholderTextColor="#888"
        />
      </View>

      {/* Stage selector */}
      <FlatList
        horizontal
        data={PIPELINE_STAGES}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.stageList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.stageTab,
              currentStage === item.id && { borderBottomColor: item.color, borderBottomWidth: 3 },
            ]}
            onPress={() => setCurrentStage(item.id)}
          >
            <Text
              style={[
                styles.stageTabText,
                currentStage === item.id && { color: item.color, fontWeight: 'bold' },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Stage header */}
      <View style={[styles.stageHeader, { borderTopColor: stageInfo?.color || '#0077B6' }]}>
        <Text style={styles.stageTitle}>{stageInfo?.label.toUpperCase()}</Text>
        <Text style={styles.stageCount}>
          {stageLeads.length} leads: ${stageLeads.reduce((sum, l) => sum + l.value, 0).toLocaleString()}
        </Text>
      </View>

      {/* Lead cards */}
      {stageLeads.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No hay leads aquí todavía</Text>
          <Text style={styles.emptySubtitle}>
            El pipeline te ayuda a gestionar los leads de todas las fuentes en un solo tablero
          </Text>
        </View>
      ) : (
        <FlatList
          data={stageLeads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LeadCard lead={item} />}
          contentContainerStyle={styles.cardList}
        />
      )}

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="person-add-outline" size={24} color="#0077B6" />
          <Text style={styles.actionText}>Agregar contacto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="cash-outline" size={24} color="#0077B6" />
          <Text style={styles.actionText}>Agregar lead</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="checkbox-outline" size={24} color="#0077B6" />
          <Text style={styles.actionText}>Agregar tarea</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },
  stageList: { maxHeight: 44, paddingHorizontal: 8 },
  stageTab: { paddingHorizontal: 16, paddingVertical: 10 },
  stageTabText: { fontSize: 13, color: '#888' },
  stageHeader: {
    borderTopWidth: 3,
    backgroundColor: '#e8e8e8',
    padding: 12,
  },
  stageTitle: { fontSize: 18, fontWeight: 'bold' },
  stageCount: { fontSize: 13, color: '#666', marginTop: 2 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  emptySubtitle: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 8 },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 4,
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#0077B6',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  cardName: { fontSize: 15, fontWeight: '600' },
  cardValue: { fontSize: 14, fontWeight: 'bold', color: '#0077B6' },
  cardPhone: { fontSize: 13, color: '#666', marginTop: 4 },
  cardEmail: { fontSize: 12, color: '#888' },
  cardList: { paddingBottom: 80 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionBtn: { alignItems: 'center' },
  actionText: { fontSize: 11, color: '#333', marginTop: 4 },
});
