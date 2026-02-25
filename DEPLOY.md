# Deploy em produção (Git + Vercel)

## 1. Subir o código no Git (GitHub)

### Se ainda não tiver repositório no GitHub
1. Acesse [github.com/new](https://github.com/new).
2. Ou use o repositório já criado: **marianmv6/regrasdetratativas**.
3. **Não** marque "Add a README" se for enviar este projeto.

### No seu computador (pasta do projeto)

Abra o terminal **na pasta `modulo-eventos-novo`** e rode:

```bash
# Inicializar Git (se ainda não tiver)
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "Deploy: Módulo de Eventos - Regras de Tratativa"

# Repositório: marianmv6/regrasdetratativas
git remote add origin https://github.com/marianmv6/regrasdetratativas.git

# Enviar para o GitHub (branch main)
git branch -M main
git push -u origin main
```

Se o repositório já existir e você só quiser atualizar:

```bash
git add .
git commit -m "Atualização para produção"
git push origin main
```

---

## 2. Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login (pode usar conta GitHub).
2. Clique em **"Add New..."** → **"Project"**.
3. **Import** o repositório do GitHub que você usou acima.
4. A Vercel já deve detectar:
   - **Framework:** Vite  
   - **Build Command:** `npm run build`  
   - **Output Directory:** `dist`  
   (está tudo em `vercel.json` no projeto)
5. Clique em **Deploy**.
6. Quando terminar, você recebe uma URL tipo:  
   `https://modulo-eventos-xxx.vercel.app`

---

## Resumo

| Etapa              | Onde              | Ação |
|--------------------|-------------------|------|
| Código no Git      | GitHub            | Criar repositório e dar `git push` da pasta `modulo-eventos-novo` |
| Deploy em produção | Vercel            | Importar o repositório e fazer o deploy (um clique) |

O arquivo **vercel.json** já está configurado com build (`npm run build`), pasta de saída (`dist`) e regras para SPA (todas as rotas caem em `index.html`).
