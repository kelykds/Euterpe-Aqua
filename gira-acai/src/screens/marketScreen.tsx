import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Perfil } from '../types/database';
import { TemaPerfil } from '../theme/perfisTheme';

interface MarketScreenProps {
  perfil: Perfil;
  tema: TemaPerfil;
  onVoltar: () => void;
}

export function MarketScreen({ perfil, tema, onVoltar }: MarketScreenProps) {
  const [busca, setBusca] = useState('');

  return (
    <View style={[styles.tela, { backgroundColor: tema.fundoTopo }]}>
      <View style={styles.topo}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onVoltar}
          style={styles.botaoVoltar}
        >
          <Ionicons name="arrow-back" size={18} color={tema.corSecundaria} />
          <Text style={[styles.textoVoltar, { color: tema.corSecundaria }]}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>

      {/* CARD DE SALDO */}
      <View style={[styles.cardSaldo, { backgroundColor: tema.corSecundaria }]}>
        <Text style={[styles.labelSaldo, { color: tema.textoSobreSecundaria }]}>
          Saldo:
        </Text>
        <Text style={[styles.valorSaldo, { color: tema.textoSobreSecundaria }]}>
          {(perfil.pontos_gira ?? 0).toLocaleString('pt-BR')} pts
        </Text>
      </View>

      {/* CORPO */}
      <View style={styles.corpoBranco}>
        <ScrollView
          contentContainerStyle={styles.scrollConteudo}
          showsVerticalScrollIndicator={false}
        >
          {/* BARRA DE PESQUISA */}
          <View
            style={[styles.barraBusca, { backgroundColor: tema.corPrimaria }]}
          >
            <Ionicons
              name="search-outline"
              size={18}
              color={tema.corSecundaria}
            />
            <TextInput
              value={busca}
              onChangeText={setBusca}
              placeholder="Pesquisar"
              placeholderTextColor="#E5E7EB"
              style={styles.inputBusca}
            />
          </View>

          <Text style={[styles.tituloSecao, { color: tema.corPrimaria }]}>
            {perfil.tipo_usuario === 'parceiro'
              ? 'Gerenciar Cupons'
              : perfil.tipo_usuario === 'agricultor'
                ? 'Resíduos disponíveis'
                : perfil.tipo_usuario === 'cooperativa'
                  ? 'Ofertas de Caroço'
                  : 'Descontos Disponíveis'}
          </Text>

          <View style={[styles.boxVazio, { borderColor: tema.corPrimaria }]}>
            <Text style={styles.textoVazio}>
              Nenhum item disponível no momento.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    paddingTop: 46,
  },
  topo: {
    paddingHorizontal: 22,
    paddingBottom: 10,
  },
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textoVoltar: {
    fontSize: 15,
    fontWeight: '700',
  },
  cardSaldo: {
    alignSelf: 'center',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginBottom: 14,
  },
  labelSaldo: {
    fontSize: 12,
    fontWeight: '700',
  },
  valorSaldo: {
    fontSize: 22,
    fontWeight: '900',
  },
  corpoBranco: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 22,
    paddingTop: 20,
  },
  scrollConteudo: {
    paddingBottom: 24,
  },
  barraBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  inputBusca: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  tituloSecao: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  boxVazio: {
    borderWidth: 1.5,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
  },
  textoVazio: {
    fontSize: 13,
    color: '#6B7280',
  },
});