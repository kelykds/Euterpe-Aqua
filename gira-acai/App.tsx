import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from './src/lib/supabase';

export default function App() {
  const [statusConexao, setStatusConexao] = useState('Testando conexão com Supabase...');

  useEffect(() => {
    async function verificarBanco() {
      const { error } = await supabase.from('lotes_biomassa').select('id').limit(1);

      if (error) {
        setStatusConexao(`Erro na conexão: ${error.message}`);
      } else {
        setStatusConexao('Conectado ao Supabase com sucesso!');
      }
    }

    verificarBanco();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>GiraAçaí - Euterpe-Aqua</Text>
      <Text style={styles.status}>{statusConexao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A154B',
    marginBottom: 12,
  },
  status: {
    fontSize: 16,
    color: '#00A896',
    textAlign: 'center',
  },
});