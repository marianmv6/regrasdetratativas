/**
 * Constantes para templates de e-mail automático.
 * Variáveis disponíveis para composição do e-mail (flags on/off).
 */

export const TERMO_DE_CIENCIA_TEXT =
  'Caro condutor, este comunicado tem como objetivo informar sobre a identificação de um evento registrado pelos sistemas de monitoramento da operação.\n\n' +
  'A ocorrência indica um comportamento ou condição que pode representar risco à segurança das pessoas, dos veículos ou das operações.\n\n' +
  'Ao receber esta comunicação, espera-se que sejam avaliadas as circunstâncias relacionadas ao evento e adotadas, quando aplicável, medidas preventivas ou corretivas necessárias, com o objetivo de evitar recorrências e preservar a segurança durante a condução.\n\n' +
  'Em caso de dúvidas ou necessidade de esclarecimentos, procure seu gestor imediato.';

export interface EmailVariableItem {
  key: string;
  label: string;
}

/** Cabeçalho do e-mail */
export const EMAIL_VARS_CABECALHO: EmailVariableItem[] = [
  { key: 'tipo_evento', label: 'Tipo de evento' },
  { key: 'data_hora_evento', label: 'Data/hora do evento' },
  { key: 'data_hora_disponibilizado', label: 'Data/hora do evento disponibilizado' },
  { key: 'nome_motorista', label: 'Nome do motorista' },
  { key: 'motorista_sem_cinto', label: 'Motorista sem cinto' },
  { key: 'matricula', label: 'Matrícula' },
  { key: 'identificacao_veiculo', label: 'Identificação do veículo' },
  { key: 'velocidade_veiculo', label: 'Velocidade do veículo' },
  { key: 'autor_tratativa', label: 'Autor da tratativa' },
  { key: 'tratado_por', label: 'Tratado por' },
  { key: 'data_tratativa', label: 'Data da tratativa' },
  { key: 'id_auditoria', label: 'ID da auditoria' },
];

/** Corpo do e-mail */
export const EMAIL_VARS_CORPO: EmailVariableItem[] = [
  { key: 'lista_eventos', label: 'Lista de eventos' },
  { key: 'local_ocorrencia_mapa', label: 'Local da ocorrência no mapa' },
  { key: 'grafico_ultimos_eventos', label: 'Gráfico dos últimos eventos' },
  { key: 'observacoes_tratativa', label: 'Observações da tratativa' },
];

/** Rodapé do e-mail */
export const EMAIL_VARS_RODAPE: EmailVariableItem[] = [
  { key: 'termo_ciencia', label: 'Termo de ciência' },
  { key: 'local_assinatura_condutor', label: 'Local para assinatura do condutor' },
  { key: 'assinatura_digital_condutor', label: 'Assinatura digital do condutor' },
  { key: 'local_assinatura_gestor', label: 'Local para assinatura do gestor' },
  { key: 'aviso_legal', label: 'Aviso legal' },
];

/** Rótulos no e-mail = nome da variável (conforme solicitado) */
export const EMAIL_LAYOUT_HEADER_LABELS: Record<string, string> = {
  tipo_evento: 'Tipo do evento',
  data_hora_evento: 'Data/hora do evento',
  data_hora_disponibilizado: 'Data/hora do evento disponibilizado',
  nome_motorista: 'Nome do motorista',
  motorista_sem_cinto: 'Motorista sem cinto',
  matricula: 'Matrícula',
  identificacao_veiculo: 'Identificação do veículo',
  velocidade_veiculo: 'Velocidade registrada',
  autor_tratativa: 'Autor da tratativa',
  tratado_por: 'Tratado por',
  data_tratativa: 'Data da tratativa',
  id_auditoria: 'ID da auditoria',
};

/** Ícone para cada campo do cabeçalho (chave = key da variável) */
export const EMAIL_LAYOUT_HEADER_ICON: Record<string, 'clock' | 'alert' | 'person' | 'seatbelt' | 'speed' | 'calendar' | 'car' | 'hash'> = {
  tipo_evento: 'alert',
  data_hora_evento: 'clock',
  data_hora_disponibilizado: 'calendar',
  nome_motorista: 'person',
  motorista_sem_cinto: 'seatbelt',
  matricula: 'hash',
  identificacao_veiculo: 'car',
  velocidade_veiculo: 'speed',
  autor_tratativa: 'person',
  tratado_por: 'person',
  data_tratativa: 'calendar',
  id_auditoria: 'hash',
};

/** Ordem e coluna do bloco superior: esquerda | direita */
export const EMAIL_LAYOUT_HEADER_ORDER: { key: string; col: 'left' | 'right' }[] = [
  { key: 'data_hora_evento', col: 'left' },
  { key: 'tipo_evento', col: 'left' },
  { key: 'nome_motorista', col: 'left' },
  { key: 'velocidade_veiculo', col: 'left' },
  { key: 'tratado_por', col: 'left' },
  { key: 'data_tratativa', col: 'left' },
  { key: 'data_hora_disponibilizado', col: 'right' },
  { key: 'identificacao_veiculo', col: 'right' },
  { key: 'matricula', col: 'right' },
  { key: 'motorista_sem_cinto', col: 'right' },
  { key: 'autor_tratativa', col: 'right' },
  { key: 'id_auditoria', col: 'right' },
];

/** Seções do corpo do e-mail: título, descrição e ícone */
export const EMAIL_LAYOUT_BODY_SECTIONS: Record<string, { title: string; description: string; icon: 'list' | 'map' | 'chart' | 'doc' }> = {
  lista_eventos: {
    title: 'REGISTROS IDENTIFICADOS',
    description: 'Lista de eventos ou registros relacionados à ocorrência.',
    icon: 'list',
  },
  local_ocorrencia_mapa: {
    title: 'LOCAL DA OCORRÊNCIA',
    description: 'Mapa ou referência de localização da ocorrência.',
    icon: 'map',
  },
  grafico_ultimos_eventos: {
    title: 'MOVIMENTO E ALERTAS DAS ÚLTIMAS 12 HORAS',
    description: 'Gráfico ou registro resumido de movimentação e alertas.',
    icon: 'chart',
  },
  observacoes_tratativa: {
    title: 'OBSERVAÇÕES',
    description: 'Campo destinado a observações adicionais sobre o evento.',
    icon: 'doc',
  },
};

export const AVISO_LEGAL_TEXT =
  'AVISO LEGAL: Esta mensagem e seus anexos são destinados, exclusivamente às pessoas ou áreas responsáveis pelo acompanhamento deste comunicado e podem conter informações confidenciais. Caso tenha recebido esta comunicação por engano, adiante-se que desconsidere seu conteúdo e informe o remetente.';

/** Variáveis ativas por padrão ao criar um novo template de e-mail */
export const DEFAULT_EMAIL_VARIABLE_KEYS: string[] = [
  'data_hora_evento',
  'data_hora_disponibilizado',
  'tipo_evento',
  'identificacao_veiculo',
  'nome_motorista',
  'lista_eventos',
  'local_ocorrencia_mapa',
  'observacoes_tratativa',
  'aviso_legal',
];

export const MAX_EMAIL_TEMPLATES_PER_COMPANY = 10;

/** ID do template padrão do sistema (não pode ser inativado nem excluído) */
export const DEFAULT_TEMPLATE_ID = 'tpl-default-creare';
