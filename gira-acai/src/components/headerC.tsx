import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { TemaPerfil } from '../theme/perfisTheme';

/**
 * ESPAÇO PARA OS LOGOS EM SVG DO APP
 * Ajuste o caminho e o nome dos arquivos conforme estiverem na sua pasta `assets/`.
 */
const LOGOS_SVGS = {
  amarelo: require('../../assets/logogiraamareloside.svg'),
  roxo: require('../../assets/logogiraroxoside.svg'),
};

interface HeaderCProps {
  tema: TemaPerfil;
  onPressDireita: () => void;
  acessibilidadeDireita?: string;
  /** Opcional: exibe um botão esquerdo (ex.: "← Voltar" ou "← Sair") */
  textoEsquerda?: string;
  onPressEsquerda?: () => void;
}

export function HeaderC({
  tema,
  onPressDireita,
  acessibilidadeDireita = 'Notificações',
  textoEsquerda,
  onPressEsquerda,
}: HeaderCProps) {
  return (
    <View style={[styles.container, { backgroundColor: tema.fundoTopo }]}>
      {textoEsquerda && onPressEsquerda && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressEsquerda}
          style={styles.botaoEsquerda}
        >
          <Text style={[styles.textoEsquerda, { color: tema.textoTopo }]}>
            {textoEsquerda}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.linhaPrincipal}>
        {/* LOGO SVG (renderizado com expo-image) */}
        <Image
          source={LOGOS_SVGS[tema.logoHeader]}
          style={styles.logo}
          contentFit="contain"
        />

        {/* BOTÃO DIREITO (SINO VETORIAL) */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPressDireita}
          accessibilityLabel={acessibilidadeDireita}
          style={[styles.botaoDireita, { backgroundColor: tema.corSecundaria }]}
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
    paddingTop: 46,
    paddingBottom: 14,
  },
  botaoEsquerda: {
    paddingHorizontal: 22,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  textoEsquerda: {
    fontSize: 13,
    fontWeight: '700',
  },
  linhaPrincipal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  logo: {
    width: 155,
    height: 44,
  },
  botaoDireita: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});