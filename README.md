# Site da Bruna

Site estático de página única, feito em [Astro](https://astro.build). Sem backend.

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # gera dist/
```

## O que editar

Quase tudo o que muda com o tempo está em **`src/config.ts`**: nome, CRP, WhatsApp,
Instagram, textos dos cards, formação e FAQ. Não é preciso mexer no HTML para
atualizar conteúdo.

Textos longos (hero, "Como eu trabalho") ficam em `src/pages/index.astro`.
A foto está em `public/img/bruna.jpg`. Para trocar, basta substituir o arquivo.

## Ativar o agendamento (Cal.com)

O agendamento está **desligado** por enquanto. Enquanto `calLink` for `null`,
a seção "Agendar" mostra os botões de WhatsApp e Instagram no lugar do calendário.

Para ligar:

1. Criar conta grátis em [cal.com](https://cal.com) com o usuário `brunapsic` (ou outro).
2. Conectar o Google Agenda em **Apps → Google Calendar**. Isso faz duas coisas:
   bloqueia horários já ocupados na agenda dela e cria o evento automaticamente.
3. Em **Apps → Google Meet**, ativar para gerar o link da videochamada sozinho.
4. Criar um tipo de evento (ex.: "Sessão", 50 min) e anotar o slug da URL.
5. Em `src/config.ts`, trocar:

   ```ts
   calLink: 'brunapsic/sessao',
   ```

Em **Availability** ela define os dias e horários que aceita atender, e o próprio
Cal.com converte os horários para o fuso de quem está agendando, útil para os
pacientes no exterior.

## Publicar

No ar em **https://julia-script.github.io/bruna-page**.

O deploy é automático: `.github/workflows/deploy.yml` roda a cada push na `main`.

### Ao migrar para domínio próprio

Hoje o site vive num subdiretório (`/bruna-page`), então o `base` é obrigatório.
Com domínio próprio ele deixa de ser, e precisa sair, senão os caminhos quebram:

1. Em `astro.config.mjs`: apagar a linha `base` e trocar `site` pelo domínio.
2. Em `src/config.ts`: atualizar `url` para o mesmo domínio.
3. No GitHub: **Settings → Pages → Custom domain**, e apontar o DNS.

Os caminhos de imagem usam `import.meta.env.BASE_URL`, então se ajustam sozinhos
nos dois cenários.

### Pendente antes de divulgar

- `whatsapp` em `src/config.ts` ainda é um número fictício (`5541999999999`)
- `doctoralia`: conferir se o link do perfil está certo
