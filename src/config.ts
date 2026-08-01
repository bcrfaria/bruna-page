// Tudo que muda com o tempo mora aqui. Editar só este arquivo.
export const site = {
  nome: 'Bruna Faria',
  crp: 'CRP 08/34202',
  titulo: 'Bruna Faria | Psicóloga | Terapia online',
  // Frase da bio do Instagram dela.
  tagline: 'Se entender e se aceitar é revolucionário.',
  descricao:
    'Psicóloga (CRP 08/34202) com atendimento clínico online para adultos no Brasil e no exterior. Psicoterapia em Terapia Cognitivo-Comportamental, com escuta acolhedora e espaço afirmativo para pessoas LGBTQIA+, gordas e neurodivergentes.',
  foto: '/img/bruna-colagem.webp',

  // Endereço público atual. Ao apontar o domínio próprio, trocar aqui e também
  // o `site`/`base` no astro.config.mjs.
  url: 'https://julia-script.github.io/bruna-page',

  // Só o usuário do Cal.com + o slug do evento. Ex.: 'brunapsic/sessao'
  // Deixe null enquanto a conta não existir: o site mostra o botão de WhatsApp no lugar.
  calLink: null as string | null,

  whatsapp: '5541995156609', // só números, com DDI e DDD
  instagram: 'brunapsic',
  email: null as string | null,
  doctoralia: 'https://www.doctoralia.com.br/bruna-faria-2/psicologo/curitiba',
};

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  'Olá, Bruna! Vim pelo seu site e gostaria de saber mais sobre as sessões.',
)}`;

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
  { titulo: 'Especialização em Terapia Cognitivo Comportamental', instituicao: 'PUCRS' },
  { titulo: 'Pós-graduação em Transtornos Alimentares e Comportamento Alimentar em Saúde LGBTQIA+', instituicao: '' },
  { titulo: 'Pós-graduanda em Neuropsicologia', instituicao: 'Em andamento' },
];

export const faq = [
  {
    p: 'Como funciona a terapia online?',
    r: 'As sessões acontecem por videochamada, em uma plataforma combinada previamente. Você precisa de internet estável e de um lugar reservado onde possa falar com privacidade. O atendimento psicológico online é regulamentado pelo Conselho Federal de Psicologia.',
  },
  {
    p: 'Quanto tempo dura cada sessão e com que frequência?',
    r: 'Cada sessão dura cerca de 50 minutos. A frequência mais comum é semanal, principalmente no início, mas isso é combinado entre nós de acordo com o seu momento e os seus objetivos.',
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
    p: 'O que conversamos fica em sigilo?',
    r: 'Sim. O sigilo profissional é um compromisso ético fundamental. Existem situações excepcionais previstas pelas normas profissionais, especialmente quando há risco à vida; esses limites são explicados com clareza no início do acompanhamento.',
  },
  {
    p: 'Como funciona a primeira sessão?',
    r: 'A primeira conversa serve para nos conhecermos: você conta o que te trouxe até aqui, eu explico como trabalho e tiramos as dúvidas sobre valores, frequência e combinados. Não é preciso chegar com tudo organizado na cabeça: a gente começa de onde der.',
  },
];
