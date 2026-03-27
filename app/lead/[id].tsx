import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function LeadDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme];

  // Mock lead details
  const lead = {
    id: id,
    name: 'Laura Martínez',
    phone: '+34600998877',
    email: 'laura@example.com',
    status: 'Nuevo',
    source: 'WhatsApp',
    notes: 'Interesada en los servicios premium. Llamar mañana.',
    createdAt: new Date().toLocaleDateString(),
  };

  const handleCall = () => {
    Linking.openURL(`tel:${lead.phone}`);
  };

  const handleWhatsApp = () => {
    Linking.openURL(`https://wa.me/${lead.phone.replace('+', '')}`);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: 'Detalles del Lead', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.text }} />
      
      <View style={[styles.header, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        <Ionicons name="person-circle" size={80} color={colors.icon} style={styles.avatar} />
        <Text style={styles.name}>{lead.name}</Text>
        <Text style={[styles.phone, { color: colors.icon }]}>{lead.phone}</Text>
        
        <View style={[styles.statusBadge, { backgroundColor: colors.tint + '20' }]}>
          <Text style={[styles.statusText, { color: colors.tint }]}>{lead.status}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.tint }]} onPress={handleCall}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.actionText}>Llamar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#25D366' }]} onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        <Text style={styles.sectionTitle}>Información</Text>
        
        <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.infoLabel, { color: colors.icon }]}>Email</Text>
          <Text style={styles.infoValue}>{lead.email}</Text>
        </View>
        <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.infoLabel, { color: colors.icon }]}>Origen</Text>
          <Text style={styles.infoValue}>{lead.source}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.icon }]}>Fecha de creación</Text>
          <Text style={styles.infoValue}>{lead.createdAt}</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        <Text style={styles.sectionTitle}>Notas</Text>
        <Text style={[styles.notes, { color: colors.text }]}>{lead.notes}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 24,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: 'transparent',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  section: {
    marginTop: 16,
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  notes: {
    fontSize: 14,
    lineHeight: 20,
  },
});
