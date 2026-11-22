export type TipoUsuario = 'batedor' | 'cooperativa' |'agricultor' | 'parceiro';
export type StatusLote = 'disponivel' | 'em_coleta' | 'processado';
export type TipoDesconto = 'porcentagem' | 'valor_fixo';

export interface Perfil {
  id: string;
  nome: string;
  telefone: string;
  tipo_usuario: TipoUsuario;
  bairro?: string | null;
  pontos_gira: number;
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
  } | null;
  criado_em: string;
}

export interface Cupom {
  id: string;
  parceiro_id: string;
  titulo: string;
  tipo_desconto: TipoDesconto;
  valor_desconto: number;
  custo_pontos_gira: number;
  condicoes?: string | null;
  validade: string;
  ativo: boolean;
  criado_em: string;
}

export interface ResgateCupom {
  id: string;
  cupom_id: string;
  batedor_id: string;
  pontos_gastos: number;
  utilizado: boolean;
  resgatado_em: string;
}