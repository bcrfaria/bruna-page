// Tudo que muda com o tempo mora aqui. Editar só este arquivo.
export const site = {
  nome: 'Bruna Faria',
  crp: 'CRP 08/34202',
  titulo: 'Bruna Faria | Psicóloga online afirmativa',
  tagline: 'Um espaço para se compreender e construir uma vida que faça sentido para você.',
  apoio:
    'Uma psicoterapia afirmativa, com menos cobrança para se encaixar e mais espaço para viver com autenticidade.',
  descricao:
    'Psicoterapia online para adultos, especialmente pessoas neurodivergentes e LGBTQIA+. Um espaço afirmativo para se compreender e construir uma vida que faça sentido para você.',
  foto: '/img/bruna-colagem.webp',

  // Endereço público atual.
  url: 'https://brunafaria.com.br',

  // Só o usuário do Cal.com + o slug do evento. Ex.: 'brunapsic/sessao'
  // Deixe null enquanto a conta não existir: o site mostra o botão de WhatsApp no lugar.
  calLink: null as string | null,

  whatsapp: '5541995156609', // só números, com DDI e DDD
  telefoneFormatado: '+55 (41) 99515-6609',
  instagram: 'brunapsic',
  email: 'psibrunafaria@gmail.com',
  doctoralia: 'https://www.doctoralia.com.br/bruna-faria-2/psicologo/curitiba',
  agendamento: `https://wa.me/5541995156609?text=${encodeURIComponent(
    'Olá, Bruna! Vim pelo seu site e gostaria de agendar uma conversa.',
  )}`,
};

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  'Olá, Bruna! Vim pelo seu site e gostaria de saber mais sobre as sessões.',
)}`;

export function whatsappComOrigem(origem: string, objetivo = 'saber mais sobre as sessões') {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Olá, Bruna! Vim ${origem} e gostaria de ${objetivo}.`,
  )}`;
}

// `esp` é a colagem que ilustra cada tema (fotomontagem surrealista).
export const queixas = [
  { titulo: 'Ansiedade', esp: 'ansiedade', texto: 'Quando a preocupação não desliga, o corpo vive em tensão e descansar parece mais difícil do que deveria.' },
  { titulo: 'Depressão', esp: 'depressao', texto: 'Quando o desânimo se prolonga, falta sentido e até aquilo que antes era simples passa a exigir muito.' },
  { titulo: 'Regulação emocional', esp: 'regulacao', texto: 'Emoções intensas ou difíceis de nomear, e a impressão de reagir mais do que você gostaria.' },
  { titulo: 'Autocrítica e autovalidação', esp: 'autocritica', texto: 'Aquela voz interna que diz "isso não é pra você" ou "foi sorte", e a sensação de precisar provar o próprio valor o tempo todo.' },
  { titulo: 'Comida e corpo', esp: 'comida', texto: 'Compulsão, restrição, culpa e os efeitos da cultura da dieta. Um cuidado sem gordofobia e sem reduzir a alimentação à “força de vontade”.' },
  { titulo: 'Relacionamentos', esp: 'relacionamentos', texto: 'Conflitos que se repetem, dificuldade de pôr limites e padrões que atravessam vários vínculos.' },
  { titulo: 'Vivência LGBTQIA+', esp: 'lgbtqia', texto: 'Espaço afirmativo para identidade, orientação, família e as datas que costumam pesar mais.' },
  { titulo: 'Neurodivergências', esp: 'neuro', texto: 'TDAH e autismo na vida adulta, inclusive seus efeitos na rotina, na alimentação e na forma de se relacionar com o mundo.' },
];

export const formacao = [
  { titulo: 'Graduação em Psicologia', instituicao: 'Universidade Federal do Paraná (UFPR)' },
  { titulo: 'Especialização em Terapia Cognitivo-Comportamental', instituicao: 'PUCRS' },
  { titulo: 'Pós-graduação em Transtornos Alimentares', instituicao: 'Ambulim — HCFMUSP' },
  { titulo: 'Pós-graduação em Comportamento Alimentar', instituicao: 'IPGS' },
  { titulo: 'Pós-graduação em Saúde LGBTQIA+', instituicao: 'Saudiversidade' },
  { titulo: 'Pós-graduanda em Neuropsicologia', instituicao: 'Incantato' },
];

export const faq = [
  {
    p: 'Como funciona a terapia online?',
    r: 'As sessões acontecem por videochamada, em uma plataforma combinada previamente. Você precisa de internet estável, fones de ouvido e de um lugar reservado onde possa falar com privacidade. Os fones ajudam a preservar o sigilo e fazem a sessão funcionar melhor. O atendimento psicológico online é regulamentado pelo Conselho Federal de Psicologia.',
  },
  {
    p: 'Quanto tempo dura cada sessão e com que frequência?',
    r: 'Cada sessão dura em torno de 1 hora. A frequência pode ser semanal ou quinzenal e é combinada entre nós de acordo com o seu momento e os seus objetivos.',
  },
  {
    p: 'Atende quem mora fora do Brasil?',
    r: 'Sim. Atendo brasileiros que vivem no exterior e combinamos os horários considerando o seu fuso. Se você estiver fora do Brasil, também verificamos juntos os critérios aplicáveis ao atendimento no país em que vive.',
  },
  {
    p: 'O que é Terapia Cognitivo Comportamental?',
    r: 'A TCC é uma abordagem com forte respaldo científico que trabalha a relação entre pensamentos, emoções e comportamentos. Na prática, é uma terapia ativa e colaborativa: além de entender o que acontece com você, construímos juntos estratégias aplicáveis no dia a dia.',
  },
  {
    p: 'Qual é o valor da sessão?',
    r: 'O valor é informado com clareza no nosso primeiro contato, junto com disponibilidade, frequência e demais combinados do atendimento.',
  },
  {
    p: 'Você atende por plano de saúde?',
    r: 'Meu atendimento é exclusivamente particular. Emito nota fiscal para que você possa solicitar reembolso ao seu plano de saúde, conforme as condições previstas no seu contrato. A confirmação do valor reembolsado deve ser feita diretamente com a operadora.',
  },
  {
    p: 'O que conversamos fica em sigilo?',
    r: 'Sim. O sigilo profissional é um compromisso ético fundamental. Existem situações excepcionais previstas pelas normas profissionais, especialmente quando há risco à vida; esses limites são explicados com clareza no início do acompanhamento.',
  },
  {
    p: 'Como funciona a primeira sessão?',
    r: 'A primeira conversa serve para nos conhecermos: você conta o que te trouxe até aqui, eu explico como trabalho e tiramos as dúvidas sobre valores, frequência e combinados. Não é preciso chegar com tudo organizado na cabeça: a gente começa de onde der.',
  },
];
