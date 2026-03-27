import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useLocalSearchParams, Stack } from 'expo-router';
import { KapsoApi, ExecutionEvent } from '@/services/kapsoApi';
import { useColorScheme } from '@/components/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme];
  const [events, setEvents] = useState<ExecutionEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const history = await KapsoApi.listExecutionEvents(id);
        setEvents(history);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchChat();
    }
  }, [id]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const newMsg: ExecutionEvent = {
      id: Math.random().toString(),
      type: 'message',
      content: message,
      timestamp: new Date().toISOString(),
      sender: 'agent',
    };
    setEvents([...events, newMsg]);
    setMessage('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }: { item: ExecutionEvent }) => {
    const isAgent = item.sender === 'agent';
    const isSystem = item.sender === 'system';

    if (isSystem) {
      return (
        <View style={styles.systemMessageContainer}>
          <Text style={[styles.systemMessage, { color: colors.icon }]}>{item.content}</Text>
        </View>
      );
    }

    return (
      <View style={[styles.messageRow, isAgent ? styles.messageRight : styles.messageLeft]}>
        <View style={[styles.messageBubble, {
          backgroundColor: isAgent ? colors.tint : colors.cardBackground,
          borderBottomRightRadius: isAgent ? 0 : 16,
          borderBottomLeftRadius: !isAgent ? 0 : 16,
        }]}>
          <Text style={[styles.messageText, { color: isAgent ? '#fff' : colors.text }]}>{item.content}</Text>
          <Text style={[styles.timestamp, { color: isAgent ? 'rgba(255,255,255,0.7)' : colors.icon }]}>
            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Stack.Screen options={{ title: `Chat ${id}`, headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.text }} />
      <FlatList
        ref={flatListRef}
        data={events}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />
      <View style={[styles.inputContainer, { borderTopColor: colors.border, backgroundColor: colors.background }]}>
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.cardBackground }]}
          placeholder="Escribe un mensaje..."
          placeholderTextColor={colors.icon}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.tint }]} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: 'transparent',
  },
  systemMessage: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  messageLeft: {
    justifyContent: 'flex-start',
  },
  messageRight: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
