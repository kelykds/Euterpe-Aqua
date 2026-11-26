import { supabase } from '../lib/supabase';
import { LoteBiomassa } from '../types/database';

export async function listarLotesDoBatedor(fornecedorId: string): Promise<LoteBiomassa[]> {
  const { data, error } = await supabase
    .from('lotes_biomassa')
    .select('*')
    .eq('fornecedor_id', fornecedorId)
    .order('criado_em', { ascending: false });

  if (error) throw error;
  return (data ?? []) as LoteBiomassa[];
}

export async function criarLoteBiomassa(dados: {
  codigo_lote: string;
  fornecedor_id: string;
  peso_kg: number;
}): Promise<LoteBiomassa> {
  const { data, error } = await supabase
    .from('lotes_biomassa')
    .insert({
      codigo_lote: dados.codigo_lote,
      fornecedor_id: dados.fornecedor_id,
      peso_kg: dados.peso_kg,
      status: 'disponivel',
    })
    .select()
    .single();

  if (error) throw error;
  return data as LoteBiomassa;
}