import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomAlert } from '../components/CustomAlert';
import {
  cadastrarUsuario,
  entrarComEmail,
  recuperarSenha,
} from '../services/authServices';
import { colors } from '../theme/colors';
import { Perfil, TipoUsuario } from '../types/database';
import LogoGira from '../assets/logogiraroxo.svg';
import Euterpe from '../assets/logoeuterperoxo.svg';

interface AuthScreenProps {
  onLoginSucesso: (perfil: Perfil) => void;
}

type TelaAtual = 'inicio' | 'login' | 'cadastro';

const OPCOES_PERFIL: { valor: TipoUsuario; label: string }[] = [
  { valor: 'batedor', label: 'Produtor de Açaí' },
  { valor: 'cooperativa', label: 'Extrator de Tanino' },
  { valor: 'parceiro', label: 'Agricultor' },
];

export function AuthScreen({ onLoginSucesso }: AuthScreenProps) {
  const [tela, setTela] = useState<TelaAtual>('inicio');
  const [etapaCadastro, setEtapaCadastro] = useState<1 | 2>(1);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // Campos do formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario | null>(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estado do Aviso Customizado
  const [aviso, setAviso] = useState<{
    visivel: boolean;
    titulo: string;
    mensagem: string;
    tipo: 'sucesso' | 'erro' | 'info';
  }>({ visivel: false, titulo: '', mensagem: '', tipo: 'info' });

  function mostrarAviso(titulo: string, mensagem: string, tipo: 'sucesso' | 'erro' | 'info' = 'info') {
    setAviso({ visivel: true, titulo, mensagem, tipo });
  }

  function voltarParaInicio() {
    setTela('inicio');
    setEtapaCadastro(1);
    setDropdownAberto(false);
  }

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      mostrarAviso('Campos obrigatórios', 'Preencha seu e-mail e senha para entrar.', 'erro');
      return;
    }

    setCarregando(true);
    try {
      const perfil = await entrarComEmail(email, senha);
      onLoginSucesso(perfil);
    } catch (erro: any) {
      const msg = erro?.message?.includes('Invalid login')
        ? 'E-mail ou senha incorretos.'
        : erro?.message || 'Erro ao fazer login.';
      mostrarAviso('Falha no login', msg, 'erro');
    } finally {
      setCarregando(false);
    }
  }

  async function handleProsseguirCadastro() {
    if (etapaCadastro === 1) {
      if (!nome.trim() || !telefone.trim() || !tipoUsuario) {
        mostrarAviso(
          'Falta pouco!',
          'Preencha seu nome completo, telefone e selecione seu tipo de usuário.',
          'info'
        );
        return;
      }
      setDropdownAberto(false);
      setEtapaCadastro(2);
      return;
    }

    if (!email.trim() || senha.length < 6) {
      mostrarAviso(
        'Acesso da conta',
        'Informe um e-mail válido e uma senha com pelo menos 6 caracteres.',
        'erro'
      );
      return;
    }

    setCarregando(true);
    try {
      await cadastrarUsuario({
        nome,
        telefone,
        email,
        senha,
        tipo_usuario: tipoUsuario!,
      });
      mostrarAviso(
        'Cadastro realizado!',
        'Enviamos um link de confirmação para o seu e-mail. Confirme por lá e depois faça login.',
        'sucesso'
      );
      setTela('login');
      setEtapaCadastro(1);
      setSenha('');
    } catch (erro: any) {
      mostrarAviso('Erro no cadastro', erro?.message || 'Não foi possível criar a conta.', 'erro');
    } finally {
      setCarregando(false);
    }
  }

  async function handleEsqueciSenha() {
    if (!email.trim()) {
      mostrarAviso('Recuperar senha', 'Digite seu e-mail no campo acima primeiro.', 'info');
      return;
    }
    try {
      await recuperarSenha(email);
      mostrarAviso('E-mail enviado', 'Verifique sua caixa de entrada para redefinir a senha.', 'sucesso');
    } catch (erro: any) {
      mostrarAviso('Erro', erro?.message || 'Erro ao enviar recuperação.', 'erro');
    }
  }

  const labelPerfilSelecionado = OPCOES_PERFIL.find((o) => o.valor === tipoUsuario)?.label;

  
  // INÍCIO
  
  if (tela === 'inicio') {
    return (
      <View style={styles.inicioContainer}>
        <Image source={require('../../assets/acaiamarelopattern.png')}/>
        <Text style={styles.sejaBemVindo}>Seja bem-vindo(a)!</Text>

        <LogoGira width={180} height={150} />
        

        <View style={styles.inicioBotoes}>
          <TouchableOpacity style={styles.botaoRoxo} onPress={() => setTela('login')}>
            <Text style={styles.botaoRoxoTexto}>Fazer Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoRoxo} onPress={() => setTela('cadastro')}>
            <Text style={styles.botaoRoxoTexto}>Cadastrar-se</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoContorno}
            onPress={() =>
              mostrarAviso(
                'Sobre o GiraAçaí',
                'Plataforma de economia circular que conecta produtores de açaí, extração de tanino e agricultores em Parauapebas.',
                'info'
              )
            }
          >
            <Text style={styles.botaoContornoTexto}>Mais sobre</Text>
          </TouchableOpacity>
        </View>

        <Euterpe width={180} height={150} />

        <CustomAlert
          visivel={aviso.visivel}
          titulo={aviso.titulo}
          mensagem={aviso.mensagem}
          tipo={aviso.tipo}
          onFechar={() => setAviso({ ...aviso, visivel: false })}
        />
      </View>
    );
  }


  // LOGIN E CADASTRO
  
  return (
    <KeyboardAvoidingView
      style={styles.authContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.authScroll} keyboardShouldPersistTaps="handled">
        {/* Topo Branco */}
        <View style={styles.topoBranco}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => {
              if (tela === 'cadastro' && etapaCadastro === 2) {
                setEtapaCadastro(1);
              } else {
                voltarParaInicio();
              }
            }}
          >
            <Ionicons name="arrow-back" size={20} color={colors.roxoEscuroTexto} />
            <Text style={styles.textoVoltar}>Voltar</Text>
          </TouchableOpacity>

          <View style={styles.cabecalhoTexto}>
            <Text style={styles.tituloTela}>
              {tela === 'login' ? 'Login' : 'Cadastre-se'}
            </Text>
            {tela === 'cadastro' && (
              <Text style={styles.subtituloTela}>
                {etapaCadastro === 1
                  ? 'Falta pouco para você fazer parte'
                  : 'Agora defina seu e-mail e senha de acesso'}
              </Text>
            )}
          </View>
        </View>

        {/* Card Roxo Inferior */}
        <View style={styles.cardRoxo}>
          {tela === 'login' ? (
            <>
              <View style={styles.inputBox}>
                <Ionicons name="mail-outline" size={20} color={colors.roxoPrincipal} />
                <TextInput
                  style={styles.inputField}
                  placeholder="seuemail@exemplo.com"
                  placeholderTextColor={colors.lilasTextoPlaceholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputBox}>
                <Ionicons name="key-outline" size={20} color={colors.roxoPrincipal} />
                <TextInput
                  style={styles.inputField}
                  placeholder="**************"
                  placeholderTextColor={colors.lilasTextoPlaceholder}
                  secureTextEntry
                  value={senha}
                  onChangeText={setSenha}
                />
              </View>

              <TouchableOpacity onPress={handleEsqueciSenha} style={styles.esqueciBtn}>
                <Text style={styles.esqueciTexto}>Esqueci a senha</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoLilas}
                onPress={handleLogin}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator color={colors.roxoPrincipal} />
                ) : (
                  <Text style={styles.botaoLilasTexto}>Prosseguir</Text>
                )}
              </TouchableOpacity>
            </>
          ) : etapaCadastro === 1 ? (
            <>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.inputField}
                  placeholder="Nome Completo"
                  placeholderTextColor={colors.lilasTextoPlaceholder}
                  value={nome}
                  onChangeText={setNome}
                />
                <Ionicons name="person-outline" size={20} color={colors.roxoPrincipal} />
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  style={styles.inputField}
                  placeholder="Telefone"
                  placeholderTextColor={colors.lilasTextoPlaceholder}
                  keyboardType="phone-pad"
                  value={telefone}
                  onChangeText={setTelefone}
                />
                <Ionicons name="call-outline" size={20} color={colors.roxoPrincipal} />
              </View>

              {/* Seletor Usuário*/}
              <TouchableOpacity
                style={styles.inputBox}
                onPress={() => setDropdownAberto(!dropdownAberto)}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.inputField,
                    !labelPerfilSelecionado && { color: colors.lilasTextoPlaceholder },
                  ]}
                >
                  {labelPerfilSelecionado || 'Usuário'}
                </Text>
                <Ionicons
                  name={dropdownAberto ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.roxoPrincipal}
                />
              </TouchableOpacity>

              {dropdownAberto && (
                <View style={styles.dropdownLista}>
                  {OPCOES_PERFIL.map((opcao) => {
                    const ativo = tipoUsuario === opcao.valor;
                    return (
                      <TouchableOpacity
                        key={opcao.valor}
                        style={[styles.dropdownItem, ativo && styles.dropdownItemAtivo]}
                        onPress={() => {
                          setTipoUsuario(opcao.valor);
                          setDropdownAberto(false);
                        }}
                      >
                        <Text style={styles.dropdownItemTexto}>{opcao.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              {!dropdownAberto && (
                <TouchableOpacity
                  style={styles.jaPossuiBtn}
                  onPress={() => setTela('login')}
                >
                  <Text style={styles.jaPossuiTexto}>
                    Já possui conta? <Text style={styles.jaPossuiLink}>Faça login!</Text>
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.botaoLilas, { marginTop: 18 }]}
                onPress={handleProsseguirCadastro}
              >
                <Text style={styles.botaoLilasTexto}>Prosseguir</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.inputField}
                  placeholder="E-mail para confirmação"
                  placeholderTextColor={colors.lilasTextoPlaceholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
                <Ionicons name="mail-outline" size={20} color={colors.roxoPrincipal} />
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  style={styles.inputField}
                  placeholder="Crie uma senha (mín. 6 dígitos)"
                  placeholderTextColor={colors.lilasTextoPlaceholder}
                  secureTextEntry
                  value={senha}
                  onChangeText={setSenha}
                />
                <Ionicons name="key-outline" size={20} color={colors.roxoPrincipal} />
              </View>

              <TouchableOpacity
                style={[styles.botaoLilas, { marginTop: 24 }]}
                onPress={handleProsseguirCadastro}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator color={colors.roxoPrincipal} />
                ) : (
                  <Text style={styles.botaoLilasTexto}>Concluir Cadastro</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <CustomAlert
        visivel={aviso.visivel}
        titulo={aviso.titulo}
        mensagem={aviso.mensagem}
        tipo={aviso.tipo}
        onFechar={() => setAviso({ ...aviso, visivel: false })}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // TELA INÍCIO
  inicioContainer: {
    flex: 1,
    backgroundColor: colors.amareloFundo,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  sejaBemVindo: {
    fontSize: 13,
    color: colors.roxoEscuroTexto,
    marginTop: 20,
  },
  logoPlaceholder: {
    alignItems: 'center',
  },
  logoTextoGrande: {
    fontSize: 44,
    fontWeight: '900',
    color: colors.roxoPrincipal,
    lineHeight: 46,
  },
  inicioBotoes: {
    width: '100%',
    gap: 12,
  },
  botaoRoxo: {
    backgroundColor: colors.roxoPrincipal,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoRoxoTexto: {
    color: colors.amareloFundo,
    fontSize: 15,
    fontWeight: '600',
  },
  botaoContorno: {
    borderWidth: 1.5,
    borderColor: colors.roxoPrincipal,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoContornoTexto: {
    color: colors.roxoEscuroTexto,
    fontSize: 15,
    fontWeight: '600',
  },
  rodapeEuterpe: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.roxoPrincipal,
  },

  // LOGIN / CADASTRO 
  authContainer: {
    flex: 1,
    backgroundColor: colors.branco,
  },
  authScroll: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  topoBranco: {
    paddingTop: 52,
    paddingHorizontal: 24,
    paddingBottom: 24,
    minHeight: 250,
    justifyContent: 'space-between',
  },
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textoVoltar: {
    color: colors.roxoEscuroTexto,
    fontSize: 15,
    fontWeight: '600',
  },
  cabecalhoTexto: {
    marginTop: 40,
  },
  tituloTela: {
    fontSize: 34,
    color: colors.roxoEscuroTexto,
    fontWeight: '500',
  },
  subtituloTela: {
    fontSize: 13,
    color: colors.lilasTextoPlaceholder,
    marginTop: 4,
  },
  cardRoxo: {
    flex: 1,
    backgroundColor: colors.roxoPrincipal,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 40,
  },
  inputBox: {
    backgroundColor: colors.lilasInput,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  inputField: {
    flex: 1,
    color: colors.roxoEscuroTexto,
    fontSize: 14,
  },
  esqueciBtn: {
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  esqueciTexto: {
    color: colors.lilasInput,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  botaoLilas: {
    backgroundColor: colors.lilasInput,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoLilasTexto: {
    color: colors.lilasTextoPlaceholder,
    fontSize: 15,
    fontWeight: '600',
  },
  dropdownLista: {
    borderWidth: 1,
    borderColor: colors.lilasInput,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: -6,
    marginBottom: 10,
  },
  dropdownItem: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 184, 216, 0.35)',
  },
  dropdownItemAtivo: {
    backgroundColor: 'rgba(228, 184, 216, 0.2)',
  },
  dropdownItemTexto: {
    color: colors.lilasInput,
    fontSize: 14,
  },
  jaPossuiBtn: {
    alignSelf: 'center',
    marginTop: 8,
  },
  jaPossuiTexto: {
    color: colors.branco,
    fontSize: 13,
  },
  jaPossuiLink: {
    color: colors.lilasInput,
    textDecorationLine: 'underline',
  },
});