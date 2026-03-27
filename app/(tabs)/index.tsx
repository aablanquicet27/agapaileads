import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { KapsoApi, Execution } from '@/services/kapsoApi';
import { useColorScheme } from '@/components/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ChatsScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme];
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchExecutions = async () => {
    try {
      const data = await KapsoApi.listExecutions();
      setExecutions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchExecutions();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchExecutions();
  };

  const renderItem = ({ item }: { item: Execution }) => (
    <TouchableOpacity
      style={[styles.chatItem, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}
      onPress={() => router.push(`/chat/${item.id}`)}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle" size={48} color={colors.icon} />
        {item.status === 'active' && <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]} />}
      </View>
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.contact.name || item.contact.phone}</Text>
        <Text style={[styles.chatPreview, { color: colors.icon }]}>ID: {item.id} • {item.status}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.icon} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={executions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.tint} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={{ color: colors.icon }}>No hay chats activos</Text>
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
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatarContainer: {
    marginRight: 16,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0D1117',
  },
  chatDetails: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  chatPreview: {
    fontSize: 14,
  },
});
