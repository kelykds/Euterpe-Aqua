import { TipoUsuario } from '../types/database';

export interface TemaPerfil {
  rotulo: string;
  abaDireita: string;
  fundoTopo: string;
  textoTopo: string;
  corPrimaria: string;
  corSecundaria: string;
  textoSobrePrimaria: string;
  textoSobreSecundaria: string;
  bordaSuave: string;
  logoHeader: 'amarelo' | 'roxo';
}

export const TEMAS_PERFIL: Record<TipoUsuario, TemaPerfil> = {
  batedor: {
    rotulo: 'Batedor(a) de Açaí',
    abaDireita: 'Loja',
    fundoTopo: '#442F73', 
    textoTopo: '#FFFFFF',
    corPrimaria: '#442F73',
    corSecundaria: '#F2BB13', 
    textoSobrePrimaria: '#FFFFFF',
    textoSobreSecundaria: '#3B1C5A',
    bordaSuave: '#E9D5FF',
    logoHeader: 'amarelo',
  },
  agricultor: {
    rotulo: 'Agricultor',
    abaDireita: 'Loja',
    fundoTopo: '#6B3E26',
    textoTopo: '#FFFFFF',
    corPrimaria: '#4A2C2A',
    corSecundaria: '#F2BB13',
    textoSobrePrimaria: '#F2BB13',
    textoSobreSecundaria: '#4A2C2A',
    bordaSuave: '#D6CCC2',
    logoHeader: 'amarelo',
  },
  cooperativa: {
    rotulo: 'Extrator(a)',
    abaDireita: 'Loja',
    fundoTopo: '#F2BB13', 
    textoTopo: '#3B1C5A',
    corPrimaria: '#3B1C5A',
    corSecundaria: '#F2BB13',
    textoSobrePrimaria: '#F2BB13',
    textoSobreSecundaria: '#3B1C5A',
    bordaSuave: '#E9D5FF',
    logoHeader: 'roxo',
  },
  parceiro: {
    rotulo: 'Loja Parceira Oficial',
    abaDireita: 'Cupons',
    fundoTopo: '#18181B', 
    textoTopo: '#FFFFFF',
    corPrimaria: '#18181B',
    corSecundaria: '#F2BB13',
    textoSobrePrimaria: '#F2BB13',
    textoSobreSecundaria: '#18181B',
    bordaSuave: '#E4E4E7',
    logoHeader: 'amarelo',
  },
};