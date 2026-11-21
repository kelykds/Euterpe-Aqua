import { supabase } from '../lib/supabase';
import { Perfil, TipoUsuario } from '../types/database';

// CADASTRO
export async function cadastrarUsuario(dados: {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  tipo_usuario: TipoUsuario;
}) {
  const telefoneLimpo = dados.telefone.replace(/\D/g, '');

  const { data, error } = await supabase.auth.signUp({
    email: dados.email.trim().toLowerCase(),
    password: dados.senha,
    options: {
      data: {
        nome: dados.nome.trim(),
        telefone: telefoneLimpo,
        tipo_usuario: dados.tipo_usuario,
      },
    },
  });

  if (error) throw error;
  return data;
}

// LOGIN
export async function entrarComEmail(email: string, senha: string): Promise<Perfil> {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password: senha,
  });

  if (authError) throw authError;

  const { data: perfil, error: perfilError } = await supabase
    .from('perfis')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  if (perfilError) throw perfilError;
  return perfil as Perfil;
}

// RECUPERAR SENHA
export async function recuperarSenha(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase()
  );
  if (error) throw error;
}

// ATUAL
export async function obterPerfilLogado(): Promise<Perfil | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;

  const { data, error } = await supabase
    .from('perfis')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error) return null;
  return data as Perfil;
}

// LOGOUT
export async function sairDaConta() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}