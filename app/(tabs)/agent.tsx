import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Switch, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { KapsoApi, ProviderModel } from '@/services/kapsoApi';
import { KapsoConfig } from '@/constants/KapsoConfig';
import { useColorScheme } from '@/components/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function AgentScreen() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme];
  const [models, setModels] = useState<ProviderModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [selectedModelId, setSelectedModelId] = useState<string>(KapsoConfig.modelId);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await KapsoApi.listProviderModels();
        setModels(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  const handleToggleAgent = async (value: boolean) => {
    setIsActive(value);
    await KapsoApi.updateTrigger(KapsoConfig.triggerId, { active: value });
  };

  const handleSelectModel = (id: string) => {
    setSelectedModelId(id);
    // In a real app, we would update the agent's configuration here
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        <View style={styles.headerContent}>
          <Ionicons name="hardware-chip" size={48} color={colors.tint} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Agente de IA</Text>
            <Text style={[styles.subtitle, { color: colors.icon }]}>Configuración del Bot</Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Activar Agente</Text>
            <Text style={[styles.settingDescription, { color: colors.icon }]}>
              Permite que el bot responda automáticamente.
            </Text>
          </View>
          <Switch
            value={isActive}
            onValueChange={handleToggleAgent}
            trackColor={{ false: colors.border, true: colors.tint + '80' }}
            thumbColor={isActive ? colors.tint : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        <Text style={styles.sectionTitle}>Modelos de IA</Text>
        {models.map(model => (
          <TouchableOpacity
            key={model.id}
            style={[styles.modelRow, { borderBottomColor: colors.border }]}
            onPress={() => handleSelectModel(model.id)}
          >
            <View style={styles.modelInfo}>
              <Text style={styles.modelName}>{model.name}</Text>
              <Text style={[styles.modelProvider, { color: colors.icon }]}>{model.provider}</Text>
            </View>
            <View style={styles.radioContainer}>
              <View style={[styles.radioOuter, { borderColor: selectedModelId === model.id ? colors.tint : colors.icon }]}>
                {selectedModelId === model.id && <View style={[styles.radioInner, { backgroundColor: colors.tint }]} />}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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
  header: {
    padding: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  headerTextContainer: {
    marginLeft: 16,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    marginTop: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 16,
    backgroundColor: 'transparent',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  modelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
  },
  modelInfo: {
    backgroundColor: 'transparent',
  },
  modelName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  modelProvider: {
    fontSize: 14,
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
