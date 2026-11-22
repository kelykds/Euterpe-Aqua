import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

interface CustomAlertProps {
  visivel: boolean;
  titulo: string;
  mensagem: string;
  tipo?: 'sucesso' | 'erro' | 'info';
  textoBotao?: string;
  onFechar: () => void;
}

export function CustomAlert({
  visivel,
  titulo,
  mensagem,
  tipo = 'info',
  textoBotao = 'Entendi',
  onFechar,
}: CustomAlertProps) {
  const config = {
    sucesso: {
      cor: colors.sucesso,
      icone: 'checkmark-circle' as const,
    },
    erro: {
      cor: colors.erro,
      icone: 'alert-circle' as const,
    },
    info: {
      cor: colors.amareloFundo,
      icone: 'information-circle' as const,
    },
  }[tipo];

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={onFechar}
    >
      <View style={styles.fundoEscuro}>
        <View style={[styles.card, { borderColor: config.cor }]}>
          <View style={styles.cabecalho}>
            <Ionicons name={config.icone} size={26} color={config.cor} />
            <Text style={[styles.titulo, { color: config.cor }]}>{titulo}</Text>
          </View>

          <Text style={styles.mensagem}>{mensagem}</Text>

          <TouchableOpacity
            style={[styles.botao, { backgroundColor: config.cor }]}
            onPress={onFechar}
            activeOpacity={0.85}
          >
            <Text style={styles.textoBotao}>{textoBotao}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundoEscuro: {
    flex: 1,
    backgroundColor: 'rgba(20, 9, 41, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  card: {
    width: '100%',
    backgroundColor: colors.roxoPrincipal,
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 19,
    fontWeight: 'bold',
    flex: 1,
  },
  mensagem: {
    fontSize: 14,
    color: colors.branco,
    lineHeight: 21,
    marginBottom: 22,
  },
  botao: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: colors.roxoEscuroTexto,
    fontWeight: 'bold',
    fontSize: 15,
  },
});