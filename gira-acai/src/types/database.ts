export type TipoUsuario = 'batedor' | 'extrator' | 'agricultor' | 'parceiro';
export type StatusLote = 'disponivel' | 'em_coleta' | 'processado';

export interface Perfil {
  id: string;
  nome: string;
  tipo_usuario: TipoUsuario;
  telefone?: string;
  criado_em: string;
}

export interface LoteBiomassa {
  id: string;
  codigo_lote: string;
  fornecedor_id: string;
  peso_kg: number;
  status: StatusLote;
  parametros_extracao?: {
    temperatura_c?: number;
    tempo_min?: number;
  };
  criado_em: string;
}

export interface Cupom {
  id: string;
  parceiro_id: string;
  titulo: string;
  descricao?: string;
  custo_pontos: number;
  ativo: boolean;
  criado_em: string;
}