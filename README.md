# Jady Torres · Pele de Porcelana

Site institucional da Jady Torres, especialista em manchas de pele e criadora do Método Pele de Porcelana®.

Site estático (HTML, CSS e JavaScript). Não há etapa de build nem dependências para instalar: GSAP 3.13, ScrollTrigger e Lenis já estão em `vendor/`.

## Publicar no Render

**Opção 1: Blueprint (automático)**

1. No Render, clique em **New → Blueprint**.
2. Conecte este repositório. O Render lê o `render.yaml` e cria o site sozinho.

**Opção 2: Static Site (manual)**

1. No Render, clique em **New → Static Site** e conecte este repositório.
2. Preencha:
   - **Build Command:** deixe em branco
   - **Publish Directory:** `.`
3. Clique em **Create Static Site**.

A cada `git push` na branch `main`, o Render publica a nova versão.

## Estrutura

```
index.html              página única do site
css/style.css           estilos
js/main.js              animações, menu, procedimentos, antes e depois
js/porcelain-gl.js      fundo animado da seção Pele de Porcelana (WebGL)
vendor/                 GSAP, ScrollTrigger e Lenis
assets/img/             retratos, estúdio e procedimentos
assets/resultados/      antes e depois (antes-N.webp + depois-N.webp)
render.yaml             configuração do Render
```

## Como trocar ou adicionar conteúdo

| O quê | Onde |
|---|---|
| Retratos do início | `assets/img/jady-retrato-1*` e `jady-retrato-2*`. Há versões de 480, 720, 960, 1200 px e a original (1500 px); o navegador baixa só o tamanho certo para a tela. |
| Fotos do estúdio | `assets/img/estudio-*.webp`, referenciadas em `index.html` |
| Procedimentos | constante `PROCS` em `js/main.js` (nome, descrição, imagem) |
| Foto de um procedimento | coloque a imagem em `assets/img/` e preencha o campo `img` do procedimento em `js/main.js` |
| Antes e depois | `assets/resultados/antes-N.webp` + `depois-N.webp`, e ajuste `BA_COUNT` em `js/main.js` |
| WhatsApp | procure `wa.me/message/WZYAGXBBEI6EK1` em `index.html` e `js/main.js` |

Procedimentos ainda sem foto: Pele de Porcelana Íntimo, Koreana Glow, Limpeza de Pele Profunda Skin Glow, Remoção de Sinal, Micropigmentação de Sobrancelhas, Color Brown e Brown Up.

## Observações

- As fotos de antes e depois têm os olhos desfocados. Mantenha a autorização por escrito das pacientes.
- O site respeita a preferência de movimento reduzido do sistema e funciona sem WebGL.
- Para testar localmente: `python3 -m http.server` na pasta do projeto e abra `http://localhost:8000`.
