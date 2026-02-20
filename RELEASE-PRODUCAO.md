# Release para produção

**Data:** 19/02/2026  
**Versão:** 1.0.0

## Backup

Foi criada uma cópia do projeto antes da atualização em produção:

- **Pasta de backup:** `Modulo de eventos_backup_20260219_1150` (na mesma pasta do DHC, ao lado de `Modulo de eventos`)

## Build de produção

O build já foi gerado. A saída fica na pasta **`dist/`**:

- `dist/index.html`
- `dist/assets/index-*.css`
- `dist/assets/index-*.js`

## Atualizar em produção

1. **Fazer backup no servidor** (se aplicável): guarde a versão atual antes de substituir.

2. **Enviar o conteúdo da pasta `dist/`** para o ambiente de produção:
   - Suba todos os arquivos de `dist/` para o diretório web configurado no servidor (raiz do site, subpasta do módulo de eventos, etc., conforme sua hospedagem).

3. **Testar em produção:** abra a URL do módulo e confira:
   - Tela inicial em **Pontuações**
   - Modal **Editar todos** (colunas, alturas e distâncias)
   - Modais de tela cheia (Nova tratativa, Editar todos) sem cobrir menu/cabeçalho e com espaçamento dos botões correto

4. **Limpar cache** do navegador ou CDN/proxy, se houver, para garantir que os novos arquivos sejam carregados.

## Gerar o build de novo (se precisar)

Na pasta do projeto (`Modulo de eventos`):

```bash
npm run build
```

A pasta `dist/` será recriada com os arquivos atualizados.
