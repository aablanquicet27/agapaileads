import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Chat = {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
};

// Placeholder data
const CHATS: Chat[] = [];

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      {CHATS.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="chatbubbles-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>Sin conversaciones</Text>
          <Text style={styles.emptySubtitle}>
            Las conversaciones de WhatsApp aparecerán aquí cuando conectes Kapso
          </Text>
        </View>
      ) : (
        <FlatList
          data={CHATS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.chatRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
              </View>
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
              </View>
              <View style={styles.chatMeta}>
                <Text style={styles.chatTime}>{item.time}</Text>
                {item.unread > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 8 },
  chatRow: { flexDirection: 'row', padding: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  avatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#0077B6',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  chatInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  chatName: { fontSize: 16, fontWeight: '600' },
  chatMessage: { fontSize: 14, color: '#888', marginTop: 2 },
  chatMeta: { alignItems: 'flex-end', justifyContent: 'center' },
  chatTime: { fontSize: 12, color: '#888' },
  badge: {
    backgroundColor: '#0077B6', borderRadius: 10, paddingHorizontal: 6,
    paddingVertical: 2, marginTop: 4,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
});
