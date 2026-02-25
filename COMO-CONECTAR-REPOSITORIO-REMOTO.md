# Conectar este repositório a um novo repositório remoto (GitHub/GitLab)

Este projeto é uma cópia do Módulo de Eventos, com um novo repositório Git local já inicializado e um commit inicial.

## Próximos passos

### 1. Criar um repositório vazio no GitHub (ou GitLab)

- Acesse [github.com/new](https://github.com/new) (ou o equivalente no GitLab).
- Crie um repositório **vazio** (sem README, sem .gitignore).
- Anote a URL do repositório (ex.: `https://github.com/seu-usuario/modulo-eventos-novo.git`).

### 2. Conectar e enviar o código

No terminal, dentro da pasta **modulo-eventos-novo**:

```bash
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
git branch -M main
git push -u origin main
```

Substitua `SEU-USUARIO` e `NOME-DO-REPO` pela sua URL.

### 3. Trabalhar a partir daqui

A partir de agora você pode fazer as novas alterações neste repositório (`modulo-eventos-novo`) e o projeto original (`Modulo de eventos`) permanece separado.
