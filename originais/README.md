# Originais

Arquivos em resolução alta, guardados fora de `public/` — o Astro não os copia
para o build, então não pesam no site.

## colagens/

As 8 fotomontagens dos cartões, em PNG 1536×1024 sem perda.
No site elas entram como JPEG 600px (`public/img/esp/`), que é o suficiente
para o tamanho em que aparecem.

Use estes arquivos para imprimir, postar no Instagram ou regerar as versões
do site em outro tamanho. Para reotimizar:

```bash
sips -Z 600 -s format jpeg -s formatOptions 60 originais/colagens/ansiedade.png \
  --out public/img/esp/ansiedade.jpg
```

Geradas com gpt-image-2 (OpenAI via OpenRouter) em julho de 2026.
