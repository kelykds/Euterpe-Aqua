import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { LoteBiomassa, Perfil } from '../types/database';
import { TEMAS_PERFIL } from '../theme/perfisTheme';
import { listarLotesDoBatedor } from '../services/lotesServices';
import { AbaAtiva, BottomNav } from '../components/bottomNav';
import { HeaderC } from '../components/headerC';

interface HomeScreenProps {
  perfil: Perfil;
  onLogout: () => void;
}

export function HomeScreen({ perfil, onLogout }: HomeScreenProps) {
  const tema = TEMAS_PERFIL[perfil.tipo_usuario];
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('inicio');
  const [lotes, setLotes] = useState<LoteBiomassa[]>([]);
  const [carregandoLotes, setCarregandoLotes] = useState(true);

  const primeiroNome = perfil.nome.split(' ')[0];

  useEffect(() => {
    if (perfil.tipo_usuario === 'batedor') {
      listarLotesDoBatedor(perfil.id)
        .then(setLotes)
        .catch((err) => console.error('Erro ao carregar lotes:', err))
        .finally(() => setCarregandoLotes(false));
    } else {
      setCarregandoLotes(false);
    }
  }, [perfil.id, perfil.tipo_usuario]);

  const entregasPendentes = lotes.filter((l) => l.status !== 'processado');
  const entregasRealizadas = lotes.filter((l) => l.status === 'processado');

  function formatarDataCurta(iso: string) {
    const d = new Date(iso);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}`;
  }

  return (
    <View style={[styles.tela, { backgroundColor: tema.fundoTopo }]}>
      {/* TOPO COM LOGO E SINO */}
      <View style={styles.header}>
        <HeaderC
        tema={tema}
        onPressDireita={onLogout}
        acessibilidadeDireita="Notificações e sair"
        />

        <TouchableOpacity
          style={[styles.botaoSino, { backgroundColor: tema.corSecundaria }]}
          onPress={onLogout} // Temporário ######
        >
          <Text style={[styles.sinoTexto, { color: tema.textoSobreSecundaria }]}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* CARD DE PONTOS (BATEDOR / EXTRATOR) */}
      <View style={[styles.cardPontos, { backgroundColor: tema.corSecundaria }]}>
        <View style={styles.colunaPontos}>
          <Text style={[styles.saudacaoCard, { color: tema.textoSobreSecundaria }]}>
            Olá, {primeiroNome}!
          </Text>
          <Text style={[styles.subtituloCard, { color: tema.textoSobreSecundaria }]}>
            Seus pontos
          </Text>
          <Text style={[styles.valorPontos, { color: tema.textoSobreSecundaria }]}>
            {perfil.pontos_gira.toLocaleString('pt-BR')} pts
          </Text>
        </View>

        <View style={[styles.divisorVertical, { backgroundColor: tema.textoSobreSecundaria }]} />

        <View style={styles.colunaBeneficios}>
          <Text style={[styles.subtituloCard, { color: tema.textoSobreSecundaria }]}>
            Benefícios ativos
          </Text>
          <Text style={[styles.valorBeneficios, { color: tema.textoSobreSecundaria }]}>
            0 Cupons
          </Text>
        </View>
      </View>

      {/* CORPO BRANCO ARREDONDADO */}
      <View style={styles.corpoBranco}>
        <ScrollView contentContainerStyle={styles.scrollConteudo} showsVerticalScrollIndicator={false}>
          {abaAtiva === 'inicio' && (
            <>
              {/* CARTEIRA DIGITAL */}
              <TouchableOpacity
                style={[styles.cardCarteira, { borderColor: tema.corPrimaria }]}
                activeOpacity={0.8}
              >
                <Text style={styles.iconeCarteira}>💳</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.tituloCarteira, { color: tema.corPrimaria }]}>
                    Carteira Digital
                  </Text>
                  <Text style={styles.descCarteira}>
                    Veja suas transações e histórico recente
                  </Text>
                </View>
              </TouchableOpacity>

              {/* AÇÕES PRINCIPAIS DO BATEDOR */}
              <View style={styles.gridAcoes}>
                <TouchableOpacity
                  style={[styles.cardAcao, { backgroundColor: tema.corPrimaria }]}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.tituloAcao, { color: '#FFFFFF' }]}>
                    Disponibilizar{'\n'}Caroço
                  </Text>
                  <Text style={[styles.iconeAcao, { color: tema.corSecundaria }]}>🛒</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.cardAcao, { backgroundColor: tema.corPrimaria }]}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.tituloAcao, { color: '#FFFFFF' }]}>
                    Localizar{'\n'}ecopontos
                  </Text>
                  <Text style={[styles.iconeAcao, { color: tema.corSecundaria }]}>♻️</Text>
                </TouchableOpacity>
              </View>

              {/* MURAL DE ATIVIDADES */}
              <Text style={[styles.tituloSecao, { color: tema.corPrimaria }]}>
                Mural de Atividades
              </Text>

              <View style={[styles.boxMural, { borderColor: tema.bordaSuave }]}>
                {carregandoLotes ? (
                  <ActivityIndicator color={tema.corPrimaria} />
                ) : (
                  <>
                    {/* ENTREGAS PENDENTES */}
                    <View style={[styles.linhaMural, { borderColor: tema.corPrimaria }]}>
                      <View style={styles.textoLinhaMural}>
                        <Text style={[styles.tituloLinhaMural, { color: tema.corPrimaria }]}>
                          Entregas{'\n'}pendentes
                        </Text>
                        <Text style={styles.saibaMais}>Saiba mais</Text>
                      </View>

                      <View style={styles.badgesRow}>
                        {entregasPendentes.length === 0 ? (
                          <Text style={styles.vazioTexto}>Nenhuma pendente</Text>
                        ) : (
                          entregasPendentes.slice(0, 2).map((lote) => (
                            <View
                              key={lote.id}
                              style={[styles.badgeLote, { backgroundColor: tema.corSecundaria }]}
                            >
                              <Text style={[styles.badgePeso, { color: tema.textoSobreSecundaria }]}>
                                {lote.peso_kg}kg
                              </Text>
                              <Text style={[styles.badgeSub, { color: tema.textoSobreSecundaria }]}>
                                {lote.status === 'disponivel' ? 'Disp.' : 'Coleta'}
                              </Text>
                            </View>
                          ))
                        )}
                      </View>
                    </View>

                    {/* ENTREGAS REALIZADAS */}
                    <View style={[styles.linhaMural, { borderColor: tema.corPrimaria, marginTop: 10 }]}>
                      <View style={styles.textoLinhaMural}>
                        <Text style={[styles.tituloLinhaMural, { color: tema.corPrimaria }]}>
                          Entregas{'\n'}realizadas
                        </Text>
                        <Text style={styles.saibaMais}>Saiba mais</Text>
                      </View>

                      <View style={styles.badgesRow}>
                        {entregasRealizadas.length === 0 ? (
                          <Text style={styles.vazioTexto}>Nenhuma concluída</Text>
                        ) : (
                          entregasRealizadas.slice(0, 2).map((lote) => (
                            <View
                              key={lote.id}
                              style={[styles.badgeLote, { backgroundColor: tema.corSecundaria }]}
                            >
                              <Text style={[styles.badgePeso, { color: tema.textoSobreSecundaria }]}>
                                {lote.peso_kg}kg
                              </Text>
                              <Text style={[styles.badgeSub, { color: tema.textoSobreSecundaria }]}>
                                {formatarDataCurta(lote.criado_em)}
                              </Text>
                            </View>
                          ))
                        )}
                      </View>
                    </View>
                  </>
                )}
              </View>
            </>
          )}

          {abaAtiva === 'perfil' && (
            <View style={{ alignItems: 'center', paddingTop: 20 }}>
              <Text style={[styles.tituloSecao, { color: tema.corPrimaria }]}>
                {perfil.nome}
              </Text>
              <Text style={styles.descCarteira}>{tema.rotulo}</Text>
              <TouchableOpacity
                style={[styles.cardAcao, { backgroundColor: tema.corPrimaria, marginTop: 24, width: '100%' }]}
                onPress={onLogout}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Sair da conta</Text>
              </TouchableOpacity>
            </View>
          )}

          {abaAtiva === 'loja' && (
            <View style={{ alignItems: 'center', paddingTop: 20 }}>
              <Text style={[styles.tituloSecao, { color: tema.corPrimaria }]}>
                {tema.abaDireita} — Em breve
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* BARRA INFERIOR */}
      <BottomNav abaAtiva={abaAtiva} onMudarAba={setAbaAtiva} tema={tema} />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    paddingTop: 44,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginBottom: 14,
  },
  botaoSino: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sinoTexto: {
    fontSize: 18,
  },
  cardPontos: {
    marginHorizontal: 22,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  colunaPontos: {
    flex: 1.3,
  },
  colunaBeneficios: {
    flex: 1,
    paddingLeft: 12,
  },
  divisorVertical: {
    width: 1.5,
    height: '80%',
    opacity: 0.4,
  },
  saudacaoCard: {
    fontSize: 15,
    fontWeight: '800',
  },
  subtituloCard: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  valorPontos: {
    fontSize: 20,
    fontWeight: '900',
  },
  valorBeneficios: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },
  corpoBranco: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  scrollConteudo: {
    paddingBottom: 24,
  },
  cardCarteira: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  iconeCarteira: {
    fontSize: 28,
    marginRight: 12,
  },
  tituloCarteira: {
    fontSize: 16,
    fontWeight: '800',
  },
  descCarteira: {
    fontSize: 12,
    color: '#6B7280',
  },
  gridAcoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 18,
  },
  cardAcao: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    minHeight: 112,
    justifyContent: 'space-between',
  },
  tituloAcao: {
    fontSize: 15,
    fontWeight: '700',
  },
  iconeAcao: {
    fontSize: 26,
    alignSelf: 'flex-end',
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  boxMural: {
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 12,
  },
  linhaMural: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 10,
  },
  textoLinhaMural: {
    flex: 1,
  },
  tituloLinhaMural: {
    fontSize: 13,
    fontWeight: '800',
  },
  saibaMais: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badgeLote: {
    width: 62,
    height: 62,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  badgePeso: {
    fontSize: 13,
    fontWeight: '800',
  },
  badgeSub: {
    fontSize: 10,
    fontWeight: '600',
  },
  vazioTexto: {
    fontSize: 11,
    color: '#9CA3AF',
  },
});