import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

// Mock leads data since Kapso might not have a direct 'leads' list separate from executions
const mockLeads = [
  { id: 'l_1', name: 'Laura Martínez', phone: '+34600998877', status: 'Nuevo', source: 'WhatsApp' },
  { id: 'l_2', name: 'Pedro Sánchez', phone: '+34600554433', status: 'Contactado', source: 'Instagram' },
];

export default function LeadsScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme];

  const renderItem = ({ item }: { item: typeof mockLeads[0] }) => (
    <TouchableOpacity
      style={[styles.leadItem, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}
      onPress={() => router.push(`/lead/${item.id}`)}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle" size={48} color={colors.icon} />
      </View>
      <View style={styles.leadDetails}>
        <Text style={styles.leadName}>{item.name}</Text>
        <Text style={[styles.leadPhone, { color: colors.icon }]}>{item.phone}</Text>
        <View style={styles.tagsContainer}>
          <View style={[styles.tag, { backgroundColor: colors.tint + '20' }]}>
            <Text style={[styles.tagText, { color: colors.tint }]}>{item.status}</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: colors.border }]}>
            <Text style={[styles.tagText, { color: colors.icon }]}>{item.source}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.icon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockLeads}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={{ color: colors.icon }}>No hay leads registrados</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  leadItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatarContainer: {
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  leadDetails: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  leadName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  leadPhone: {
    fontSize: 14,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: 'transparent',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
