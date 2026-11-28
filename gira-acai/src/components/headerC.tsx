import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { TemaPerfil } from '../theme/perfisTheme';

const LOGOS_SVGS = {
  amarelo: require('../../assets/logogiraamareloside.svg'),
  roxo: require('../../assets/logogiraroxoside.svg'),
};

interface HeaderCProps {
  tema: TemaPerfil;
  onPressNotificacoes?: () => void;
}

export function HeaderC({ tema, onPressNotificacoes }: HeaderCProps) {
  return (
    <View style={[styles.container, { backgroundColor: tema.fundoTopo }]}>
      <View style={styles.linhaPrincipal}>
        <Image
          source={LOGOS_SVGS[tema.logoHeader]}
          style={styles.logo}
          contentFit="contain"
        />

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPressNotificacoes}
          accessibilityLabel="Notificações"
          style={[styles.botaoNotificacao, { backgroundColor: tema.corSecundaria }]}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={tema.textoSobreSecundaria}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 50,
    paddingBottom: 18,
  },
  linhaPrincipal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 168,
    height: 46,
  },
  botaoNotificacao: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
});