# AGENTS.md — GiraAçaí

Aplicativo mobile em **React Native**, **Expo** e **TypeScript** integrante do projeto **Euterpe-Aqua**, voltado à economia circular em Parauapebas (PA) conectando produtores de açaí, extração de tanino e agricultores. Priorize padrões mobile-first, performance e compatibilidade cross-platform.

## Arquitetura e Pastas
- **Telas:** `src/screens/` (ex.: `authScreen.tsx`, `loadingScreen.tsx`). O fluxo de navegação/exibição é controlado no `App.tsx` e nas telas, sem uso de Expo Router em `src/app/`.
- **Componentes reutilizáveis:** `src/components/` (ex.: `CustomAlert.tsx`).
- **Tema e tipagens:** `src/theme/colors.ts` e `src/types/database.ts`.
- **Serviços e backend:** `src/services/` integrado ao **Supabase** (autenticação por e-mail/senha com confirmação e tabelas `perfis`, `lotes_biomassa`, `cupons`, `resgates_cupons`).
- **Assets:** `@expo/vector-icons`, `react-native-svg` + `react-native-svg-transformer` configurados no `metro.config.js`, tipagem de módulos em `declarations.d.ts`, e arquivos visuais em `assets/`.

## Identidade Visual e UI
- **Paleta de cores:** roxo profundo (`#3E236E` / `#361D63`), amarelo dourado (`#F6BE1A`), lilás (`#E4B8D8`) e branco (`#FFFFFF`).
- **Modais e alertas:** utilize `CustomAlert` (`src/components/CustomAlert.tsx`) para feedbacks visuais em vez de `Alert.alert` nativo.
- **Idioma:** escreva código, comentários, mensagens ao usuário e documentação em português (PT-BR).

## Comandos Úteis
```bash
npx expo install <package>  # instala dependências em versões compatíveis com o SDK do Expo
npx expo start -c           # inicia o Metro/Expo limpando o cache
npx tsc --noEmit            # verifica tipos TypeScript
npx expo-doctor             # diagnostica problemas de dependências e configuração

Regras e Boas Práticas
Segurança: nunca commite .env, chaves de API ou credenciais do Supabase.

Pastas nativas: não crie nem edite ios/ e android/ manualmente; configure o comportamento nativo pelo app.json e config plugins.

Expo Go vs. Development Build: o Expo Go contém apenas os módulos nativos já incluídos nele; bibliotecas com código nativo novo exigem development build (npx expo run:android / npx expo run:ios ou eas build).

Atualizações de API do Expo: confira a versão do expo no package.json e consulte https://docs.expo.dev/llms.txt ou a documentação versionada antes de assumir APIs que possam ter mudado entre releases.