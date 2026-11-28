import React, { useEffect, useState } from 'react';
import { AuthScreen } from './src/screens/authScreen';
import { HomeScreen } from './src/screens/homeScreen';
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

  return <HomeScreen perfil={perfil} onLogout={handleLogout} />;
}