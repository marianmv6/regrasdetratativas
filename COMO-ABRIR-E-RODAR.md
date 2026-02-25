# Como ver o Projeto 2 (Módulo de Eventos – Regras de Risco)

O workspace DHC contém **vários projetos**. Para ver e rodar o **Projeto 2** (este), você precisa abrir **só esta pasta** e rodar o servidor aqui.

## Passos

1. **No Cursor:** Arquivo → Abrir pasta (Open Folder).
2. **Selecione a pasta:** `modulo-eventos-novo` (e não a pasta DHC nem "Modulo de eventos").
   - Caminho completo (ajuste se precisar):  
     `...\DHC\modulo-eventos-novo`
3. **No terminal (dentro de modulo-eventos-novo):**
   ```powershell
   npm run dev
   ```
4. Abra no navegador o endereço que o Vite mostrar (em geral `http://localhost:5173`).

## O que este projeto tem

- **Pontuações:** tabela com colunas Evento, Tipo, Pontuação, Nível + botão Editar; filtro por tipo; botões "Editar todos" e "Retomar padrão".
- **Tratativas:** tabela com Nome, **Tipo**, **Modo**, Etapas, Status + Editar/Excluir; Nova tratativa; Gerenciar contatos e mensagens de voz.
- **Contatos:** Turnos (Manhã, Tarde, etc.), Horário início e Horário fim (TimePicker), validação e toast de erro.
- **Política de avaliação** e **Histórico**.

Se você abrir a pasta **DHC** (pai) e rodar `npm run dev` na raiz, verá outro app (Motoristas Não Reconhecidos), não este.
