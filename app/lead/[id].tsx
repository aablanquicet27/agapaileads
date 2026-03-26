import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useLeadStore, PIPELINE_STAGES } from '@/store/leads';
import { Ionicons } from '@expo/vector-icons';

export default function LeadDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lead = useLeadStore((s) => s.leads.find((l) => l.id === id));
  const moveLead = useLeadStore((s) => s.moveLead);

  if (!lead) {
    return (
      <View style={styles.container}>
        <Text>Lead no encontrado</Text>
      </View>
    );
  }

  const currentIndex = PIPELINE_STAGES.findIndex((s) => s.id === lead.stage);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{lead.name}</Text>
        <Text style={styles.value}>${lead.value.toLocaleString()}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={18} color="#666" />
          <Text style={styles.infoText}>{lead.phone}</Text>
        </View>
        {lead.email && (
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={18} color="#666" />
            <Text style={styles.infoText}>{lead.email}</Text>
          </View>
        )}
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={18} color="#666" />
          <Text style={styles.infoText}>{new Date(lead.date).toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Pipeline stages */}
      <Text style={styles.sectionTitle}>Etapa del pipeline</Text>
      <View style={styles.stages}>
        {PIPELINE_STAGES.map((stage, i) => (
          <TouchableOpacity
            key={stage.id}
            style={[
              styles.stageBtn,
              lead.stage === stage.id && { backgroundColor: stage.color },
            ]}
            onPress={() => moveLead(lead.id, stage.id)}
          >
            <Text
              style={[
                styles.stageBtnText,
                lead.stage === stage.id && { color: '#fff' },
              ]}
            >
              {stage.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick actions */}
      <Text style={styles.sectionTitle}>Acciones</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="call" size={22} color="#0077B6" />
          <Text style={styles.actionText}>Llamar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="logo-whatsapp" size={22} color="#25D366" />
          <Text style={styles.actionText}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="mail" size={22} color="#EA4335" />
          <Text style={styles.actionText}>Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#0077B6', padding: 20,
  },
  name: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  value: { fontSize: 18, color: '#B3E0F2', marginTop: 4 },
  info: { backgroundColor: '#fff', padding: 16, marginTop: 1 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  infoText: { fontSize: 15, marginLeft: 10, color: '#333' },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#888', padding: 16, paddingBottom: 8 },
  stages: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12 },
  stageBtn: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#e8e8e8', margin: 4,
  },
  stageBtnText: { fontSize: 13, color: '#333' },
  actionsRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    backgroundColor: '#fff', padding: 16, marginTop: 8,
  },
  actionBtn: { alignItems: 'center' },
  actionText: { fontSize: 12, color: '#333', marginTop: 4 },
});
