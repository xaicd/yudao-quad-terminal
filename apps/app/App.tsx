import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [status, setStatus] = useState<string>('正常');
  const [count, setCount] = useState<number>(0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 顶部标题栏 */}
        <View style={styles.header}>
          <Text style={styles.title}>商业交付终端</Text>
          <Text style={styles.subtitle}>Yudao Quad-Terminal 原生移动中枢</Text>
        </View>

        {/* 核心状态卡片 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>服务态势</Text>
          <View style={styles.row}>
            <Text style={styles.label}>网关状态:</Text>
            <Text style={styles.badge}>{status}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>已核销任务:</Text>
            <Text style={styles.value}>{count} 件</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>视口宽度:</Text>
            <Text style={styles.value}>{Math.round(width)} dp (防撑爆)</Text>
          </View>
        </View>

        {/* 两字操作区 (单手可达，防遮挡) */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => setCount((prev) => prev + 1)}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>核销</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setStatus((prev) => (prev === '正常' ? '巡检' : '正常'))}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>刷新</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 底部黄金 5 槽位绝对对称底栏 (极简两字 UI) */}
      <View style={styles.bottomNav}>
        {['首页', '待办', '工坊', '运营', '我的'].map((tab, idx) => (
          <TouchableOpacity key={tab} style={styles.navItem} activeOpacity={0.7}>
            <Text style={[styles.navText, idx === 0 && styles.navTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    marginTop: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F1F5F9',
  },
  label: {
    fontSize: 14,
    color: '#64748B',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  badge: {
    fontSize: 12,
    color: '#059669',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#E2E8F0',
  },
  secondaryButtonText: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  navText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  navTextActive: {
    color: '#2563EB',
    fontWeight: '600',
  },
});
