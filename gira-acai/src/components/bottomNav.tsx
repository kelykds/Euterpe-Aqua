import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TemaPerfil } from '../theme/perfisTheme';

export type AbaAtiva = 'perfil' | 'inicio' | 'loja';

interface BottomNavProps {
  abaAtiva: AbaAtiva;
  onMudarAba: (aba: AbaAtiva) => void;
  tema: TemaPerfil;
}

export function BottomNav({ abaAtiva, onMudarAba, tema }: BottomNavProps) {
  const abas: { id: AbaAtiva; label: string; simbolo: string }[] = [
    { id: 'perfil', label: 'Perfil', simbolo: '👤' },
    { id: 'inicio', label: 'Início', simbolo: '⌂' },
    { id: 'loja', label: tema.abaDireita, simbolo: '🏪' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <View style={styles.row}>
        {abas.map((aba) => {
          const ativa = abaAtiva === aba.id;
          return (
            <TouchableOpacity
              key={aba.id}
              activeOpacity={0.85}
              onPress={() => onMudarAba(aba.id)}
              style={[
                styles.botao,
                {
                  backgroundColor: ativa ? tema.corSecundaria : '#FFFFFF',
                  borderColor: tema.corSecundaria,
                },
              ]}
            >
              <Text
                style={[
                  styles.icone,
                  { color: ativa ? tema.textoSobreSecundaria : tema.corPrimaria },
                ]}
              >
                {aba.simbolo}
              </Text>
              <Text
                style={[
                  styles.label,
                  { color: ativa ? tema.textoSobreSecundaria : tema.corPrimaria },
                ]}
              >
                {aba.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Faixa inferior com a cor do tema, igual ao protótipo */}
      <View style={[styles.faixaBase, { backgroundColor: tema.fundoTopo }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  botao: {
    width: 78,
    height: 64,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icone: {
    fontSize: 20,
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
  faixaBase: {
    height: 14,
    width: '100%',
  },
});