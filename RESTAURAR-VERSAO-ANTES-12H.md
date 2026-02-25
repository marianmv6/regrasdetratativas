# Como retornar à versão em que estávamos trabalhando (antes das 12h)

Essa versão tinha:
- **Pontuações:** lista só com Evento e Status
- **Tratativas:** sem "tipo de acompanhamento" e "modo"
- **Contatos:** com turnos e horários
- **Política de avaliação:** com tipo de acompanhamento, lista de eventos, gatilhos, etc.

O commit **973297e** ("Atualização para produção: regras de tratativa, políticas, eventos, tratativas, alinhamentos") **contém exatamente essa versão** (já conferido no repositório):

- **Pontuações:** tabela só com colunas **Evento** e **Tipo** (sem Pontuação, Nível nem edição por linha).
- **Tratativas:** lista com **Nome, Etapas, Status** (sem "Tipo de acompanhamento" nem "Modo").
- **Contatos:** com **Turnos** e **Horário início/fim** (usa `input type="time"`; se quiser o TimePicker e a validação "os dois horários ou nenhum" que fizemos depois, dá para reaplicar após restaurar).
- **Política de avaliação:** com tipo de acompanhamento, lista de eventos, gatilhos, etc.

---

## Passo a passo (no PowerShell ou CMD)

1. **Feche o Cursor** (ou pelo menos pare o `npm run dev` se estiver rodando).

2. **Abra o PowerShell** (Windows + R, digite `powershell`, Enter).

3. **Vá até a pasta do Projeto 2.** Cole o comando abaixo (e ajuste o caminho se a sua pasta for diferente):
   ```powershell
   cd "C:\Users\user\OneDrive - Creare Sistemas\Área de Trabalho\DHC\modulo-eventos-novo"
   ```

4. **Confira em qual commit você está:**
   ```powershell
   git log --oneline -3
   ```
   Você deve ver algo como:
   - `dcfdeed` Deploy producao...
   - `973297e` Atualização para produção...
   - `fc5305a` Cópia inicial...

5. **Restaurar todos os arquivos para o commit 973297e (versão antes das 12h):**
   ```powershell
   git checkout 973297e -- .
   ```
   Isso **sobrescreve** todos os arquivos do projeto com a versão daquele commit.

6. **Opcional – ver de novo o histórico:**
   ```powershell
   git status
   ```
   Vai mostrar que vários arquivos foram alterados (em relação ao último commit).

7. **Abra de novo o projeto no Cursor** na pasta `modulo-eventos-novo` e rode:
   ```powershell
   npm run dev
   ```
   Confira no navegador se é a versão desejada (pontuações com evento e status, tratativas sem tipo/modo, política com eventos e gatilhos, etc.).

---

## Se depois você quiser voltar para a versão atual (a de agora)

Para desfazer a restauração e voltar ao estado do último commit (`dcfdeed`):

```powershell
cd "C:\Users\user\OneDrive - Creare Sistemas\Área de Trabalho\DHC\modulo-eventos-novo"
git checkout main -- .
```

(Isso descarta as alterações locais e volta para o que está no branch `main`.)

---

## Observação

Depois do `git checkout 973297e -- .`, as alterações **não** estão commitadas: você fica com a “versão antiga” só na sua pasta. Se quiser gravar esse estado em um novo commit (por exemplo, “Voltar à versão antes das 12h”), você pode fazer:

```powershell
git add .
git commit -m "Restaurado estado anterior (versao antes das 12h)"
```

Assim você mantém um ponto de retorno no histórico.
