import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme];

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar', style: 'destructive', onPress: () => console.log('Cerrar sesión') },
    ]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        <Ionicons name="person-circle" size={80} color={colors.icon} style={styles.avatar} />
        <Text style={styles.name}>Juan Pérez</Text>
        <Text style={[styles.role, { color: colors.icon }]}>Administrador - AGAPAI</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.icon }]}>Cuenta</Text>
        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
          <Ionicons name="settings-outline" size={24} color={colors.text} style={styles.menuIcon} />
          <Text style={styles.menuText}>Configuración</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} style={styles.menuIcon} />
          <Text style={styles.menuText}>Notificaciones</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.icon }]}>Acerca de</Text>
        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
          <Ionicons name="information-circle-outline" size={24} color={colors.text} style={styles.menuIcon} />
          <Text style={styles.menuText}>Ayuda y Soporte</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={colors.tint} style={styles.menuIcon} />
          <Text style={[styles.menuText, { color: colors.tint }]}>Cerrar Sesión</Text>
        </TouchableOpacity>
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
    padding: 32,
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
  role: {
    fontSize: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
});
