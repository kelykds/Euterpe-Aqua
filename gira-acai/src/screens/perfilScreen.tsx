import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Perfil } from '../types/database';
import { TemaPerfil } from '../theme/perfisTheme';

interface PerfilScreenProps {
  perfil: Perfil;
  tema: TemaPerfil;
  onVoltar: () => void;
  onLogout: () => void;
}

export function PerfilScreen({
  perfil,
  tema,
  onVoltar,
  onLogout,
}: PerfilScreenProps) {
  const isParceiro = perfil.tipo_usuario === 'parceiro';

  const itensMenu: {
    id: string;
    titulo: string;
    icone: keyof typeof Ionicons.glyphMap;
  }[] = [
    ...(isParceiro
      ? [
          {
            id: 'relatorio',
            titulo: 'Gerar Relatório',
            icone: 'document-text-outline' as const,
          },
        ]
      : [
          {
            id: 'dados',
            titulo: 'Dados Cadastrais',
            icone: 'pencil-outline' as const,
          },
          {
            id: 'historico',
            titulo: 'Histórico de Atividades',
            icone: 'receipt-outline' as const,
          },
        ]),
    { id: 'sobre', titulo: 'Sobre o Projeto', icone: 'help-circle-outline' },
    { id: 'ajuda', titulo: 'Ajuda e Suporte', icone: 'chatbubbles-outline' },
    { id: 'config', titulo: 'Configurações', icone: 'settings-outline' },
  ];

  // Parceiro usa botões amarelos; os demais usam a cor primária do perfil
  const fundoBotao = isParceiro ? tema.corSecundaria : tema.corPrimaria;
  const corTextoBotao = isParceiro ? tema.textoSobreSecundaria : '#FFFFFF';
  const corIconeBotao = isParceiro
    ? tema.textoSobreSecundaria
    : tema.corSecundaria;

  return (
    <View style={[styles.tela, { backgroundColor: tema.fundoTopo }]}>
      {/* BARRA SUPERIOR DO PERFIL */}
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

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onLogout}
          style={[styles.botaoSino, { backgroundColor: tema.corSecundaria }]}
        >
          <Ionicons
            name="notifications-outline"
            size={20}
            color={tema.textoSobreSecundaria}
          />
        </TouchableOpacity>
      </View>

      {/* CORPO BRANCO CURVO */}
      <View style={styles.corpoBranco}>
        {/* AVATAR SOBREPOSTO NO TOPO */}
        <View
          style={[
            styles.avatarBox,
            {
              backgroundColor: isParceiro ? '#FFFFFF' : tema.corSecundaria,
              borderColor: tema.corPrimaria,
            },
          ]}
        >
          <Ionicons
            name={isParceiro ? 'storefront-outline' : 'person-outline'}
            size={54}
            color={tema.corPrimaria}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollConteudo}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.nomeUsuario, { color: tema.corPrimaria }]}>
            {perfil.nome}
          </Text>

          {/* CARD DE LOCALIZAÇÃO E TAGS */}
          <View
            style={[
              styles.cardInfo,
              {
                backgroundColor: isParceiro ? '#FFFFFF' : tema.corPrimaria,
                borderColor: tema.corPrimaria,
              },
            ]}
          >
            <Text
              style={[
                styles.localizacao,
                { color: isParceiro ? tema.corPrimaria : '#FFFFFF' },
              ]}
            >
              Localização Principal: {perfil.bairro || 'N/A'}
            </Text>

            <View style={styles.tagsRow}>
              <Text
                style={[
                  styles.tagsLabel,
                  { color: isParceiro ? tema.corPrimaria : '#FFFFFF' },
                ]}
              >
                Tags:
              </Text>
              <View
                style={[
                  styles.tagPill,
                  { borderColor: isParceiro ? tema.corPrimaria : '#FFFFFF' },
                ]}
              >
                <Text
                  style={[
                    styles.tagTexto,
                    { color: isParceiro ? tema.corPrimaria : '#FFFFFF' },
                  ]}
                >
                  {tema.rotulo}
                </Text>
              </View>
              <View
                style={[
                  styles.tagPill,
                  { borderColor: isParceiro ? tema.corPrimaria : '#FFFFFF' },
                ]}
              >
                <Text
                  style={[
                    styles.tagTexto,
                    { color: isParceiro ? tema.corPrimaria : '#FFFFFF' },
                  ]}
                >
                  {perfil.tipo_usuario === 'cooperativa' || isParceiro
                    ? 'PJ'
                    : 'PF'}
                </Text>
              </View>
            </View>
          </View>

          {/* LISTA DE OPÇÕES */}
          <View style={styles.listaMenu}>
            {itensMenu.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                style={[styles.itemMenu, { backgroundColor: fundoBotao }]}
              >
                <Text style={[styles.itemMenuTexto, { color: corTextoBotao }]}>
                  {item.titulo}
                </Text>
                <Ionicons name={item.icone} size={20} color={corIconeBotao} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity activeOpacity={0.7} style={styles.termosBtn}>
            <Text style={[styles.termosTexto, { color: tema.corPrimaria }]}>
              Termos e Condições
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onLogout}
            style={[styles.botaoSair, { borderColor: tema.corPrimaria }]}
          >
            <Ionicons
              name="log-out-outline"
              size={18}
              color={tema.corPrimaria}
            />
            <Text style={[styles.textoSair, { color: tema.corPrimaria }]}>
              Sair da conta
            </Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingBottom: 56,
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
  botaoSino: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  corpoBranco: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 22,
    paddingTop: 62,
  },
  avatarBox: {
    position: 'absolute',
    top: -52,
    alignSelf: 'center',
    width: 104,
    height: 104,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  scrollConteudo: {
    paddingBottom: 28,
  },
  nomeUsuario: {
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  cardInfo: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 12,
    marginBottom: 14,
  },
  localizacao: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagsLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  tagPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  tagTexto: {
    fontSize: 11,
    fontWeight: '600',
  },
  listaMenu: {
    gap: 10,
  },
  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  itemMenuTexto: {
    fontSize: 14,
    fontWeight: '700',
  },
  termosBtn: {
    marginTop: 14,
    alignSelf: 'flex-start',
  },
  termosTexto: {
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  botaoSair: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 11,
  },
  textoSair: {
    fontSize: 14,
    fontWeight: '700',
  },
});