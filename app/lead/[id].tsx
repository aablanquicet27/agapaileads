import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useLeadStore } from '@/lib/store';

export default function LeadDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lead = useLeadStore((s) => s.leads.find((l) => l.id === id));

  if (!lead) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lead no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lead.name}</Text>
      <Text style={styles.field}>📱 {lead.phone}</Text>
      {lead.email && <Text style={styles.field}>📧 {lead.email}</Text>}
      <Text style={styles.field}>📊 Etapa: {lead.stage}</Text>
      <Text style={styles.field}>💰 Valor: ${lead.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  field: { fontSize: 16, marginBottom: 12, color: '#3C3C43' },
});
