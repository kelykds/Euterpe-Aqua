import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthScreen } from './src/screens/authScreen';
import { obterPerfilLogado, sairDaConta } from './src/services/authServices';
import { Perfil } from './src/types/database';
import { LoadingScreen } from './src/screens/loadingScreen';

export default function App() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [verificandoSessao, setVerificandoSessao] = useState(true);

  useEffect(() => {
    obterPerfilLogado()
      .then((dados) => setPerfil(dados))
      .finally(() => setVerificandoSessao(false));
  }, []);

  async function handleLogout() {
    await sairDaConta();
    setPerfil(null);
  }

  if (verificandoSessao) {
    return <LoadingScreen />;
  }

  if (!perfil) {
    return <AuthScreen onLoginSucesso={(p) => setPerfil(p)} />;
  }

  return (
    <View style={styles.centro}>
      <Text style={styles.boasVindas}>Olá, {perfil.nome}!</Text>
      <Text style={styles.info}>Perfil: {perfil.tipo_usuario.toUpperCase()}</Text>
      <Text style={styles.info}>Telefone: {perfil.telefone}</Text>
      <Text style={styles.pontos}>Pontos Gira: {perfil.pontos_gira}</Text>

      <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
        <Text style={styles.botaoSairTexto}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    backgroundColor: '#F2BB13',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  boasVindas: { fontSize: 26, fontWeight: 'bold', color: '#FACC15', marginBottom: 12 },
  info: { fontSize: 16, color: '#E9D5FF', marginBottom: 6 },
  pontos: { fontSize: 18, fontWeight: 'bold', color: '#4ADE80', marginTop: 10, marginBottom: 28 },
  botaoSair: {
    borderWidth: 1,
    borderColor: '#FACC15',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  botaoSairTexto: { color: '#FACC15', fontWeight: '600' },
});