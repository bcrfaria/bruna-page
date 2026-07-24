// Tudo que muda com o tempo mora aqui. Editar só este arquivo.
export const site = {
  nome: 'Bruna Faria',
  crp: 'CRP 08/34202',
  titulo: 'Bruna Faria | Psicóloga | Terapia online',
  // Frase da bio do Instagram dela.
  tagline: 'Se entender e se aceitar é revolucionário.',
  descricao:
    'Psicóloga (CRP 08/34202) com atendimento online em Terapia Cognitivo Comportamental para adultos no Brasil e no exterior. Espaço afirmativo para pessoas LGBTQIA+ e neurodivergentes.',
  foto: '/img/bruna.jpg',

  // Endereço público atual. Ao apontar o domínio próprio, trocar aqui e também
  // o `site`/`base` no astro.config.mjs.
  url: 'https://julia-script.github.io/bruna-page',

  // Só o usuário do Cal.com + o slug do evento. Ex.: 'brunapsic/sessao'
  // Deixe null enquanto a conta não existir: o site mostra o botão de WhatsApp no lugar.
  calLink: null as string | null,

  whatsapp: '5541999999999', // só números, com DDI e DDD
  instagram: 'brunapsic',
  email: null as string | null,
  doctoralia: 'https://www.doctoralia.com.br/bruna-faria/psicologo/curitiba',
};

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  'Olá, Bruna! Vim pelo seu site e gostaria de saber mais sobre as sessões.',
)}`;

// `esp` é o objeto em colagem de papel que ilustra cada tema.
export const queixas = [
  { titulo: 'Ansiedade', esp: 'pedra', texto: 'Preocupação que não desliga, crises, tensão no corpo e a sensação de estar sempre em alerta.' },
  { titulo: 'Depressão', esp: 'lua', texto: 'Desânimo que se arrasta, perda de sentido, cansaço e dificuldade de fazer o que antes era simples.' },
  { titulo: 'Regulação emocional', esp: 'barco', texto: 'Emoções intensas ou difíceis de nomear, e a impressão de reagir mais do que você gostaria.' },
  { titulo: 'Autocrítica e autovalidação', esp: 'envelope', texto: 'Aquela voz interna que diz "isso não é pra você" ou "foi sorte", e a sensação de precisar provar o próprio valor o tempo todo.' },
  { titulo: 'Comida e corpo', esp: 'frutas', texto: 'Compulsão, restrição, culpa e o peso da cultura da dieta. Um espaço livre de gordofobia, onde comer não é sobre disciplina.' },
  { titulo: 'Relacionamentos', esp: 'xicaras', texto: 'Conflitos que se repetem, dificuldade de pôr limites e padrões que atravessam vários vínculos.' },
  { titulo: 'Vivência LGBTQIA+', esp: 'flor', texto: 'Espaço afirmativo para identidade, orientação, família e as datas que costumam pesar mais.' },
  { titulo: 'Neurodivergências', esp: 'pena', texto: 'TDAH e autismo, inclusive como isso afeta a alimentação e a rotina. Não é frescura nem falta de esforço.' },
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
    r: 'As sessões acontecem por videochamada, no Google Meet ou no WhatsApp, como você preferir. Você só precisa de internet estável e de um lugar reservado onde possa falar à vontade. A eficácia é equivalente à do atendimento presencial, segundo pesquisas da área, e é regulamentada pelo Conselho Federal de Psicologia.',
  },
  {
    p: 'Quanto tempo dura cada sessão e com que frequência?',
    r: 'Cada sessão dura cerca de 50 minutos. A frequência mais comum é semanal, principalmente no início, mas isso é combinado entre nós de acordo com o seu momento e os seus objetivos.',
  },
  {
    p: 'Atende quem mora fora do Brasil?',
    r: 'Sim. Boa parte dos meus pacientes mora no exterior. Ajustamos o horário ao seu fuso, e o agendamento converte os horários automaticamente para o seu relógio.',
  },
  {
    p: 'O que é Terapia Cognitivo Comportamental?',
    r: 'A TCC é uma abordagem com forte respaldo científico que trabalha a relação entre pensamentos, emoções e comportamentos. Na prática, é uma terapia ativa e colaborativa: além de entender o que acontece com você, construímos juntos estratégias aplicáveis no dia a dia.',
  },
  {
    p: 'O que conversamos fica em sigilo?',
    r: 'Sim. O sigilo é garantido pelo Código de Ética Profissional do Psicólogo, com pouquíssimas exceções previstas em lei, como situações de risco à vida. Tudo isso é explicado com clareza na primeira sessão.',
  },
  {
    p: 'Como funciona a primeira sessão?',
    r: 'A primeira conversa serve para nos conhecermos: você conta o que te trouxe até aqui, eu explico como trabalho e tiramos as dúvidas sobre valores, frequência e combinados. Não é preciso chegar com tudo organizado na cabeça: a gente começa de onde der.',
  },
];
