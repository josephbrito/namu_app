https://github.com/user-attachments/assets/909202aa-8a57-4f49-ae86-e302beb11baa

## Namu Habits

API em **NestJS** + app **React Native**, com backend e banco rodando via Docker.

**[⬇️ Baixar APK](https://drive.google.com/file/d/1XhMTG2z5U9kvIAsrIFiUogs0fhOFBzjf/view?usp=sharing)**

---

## Funcionalidades

**Backend**
- CRUD de hábitos (`title`, `description`, `frequency`, `category`, `created_at`)
- Check-in diário por hábito
- Dashboard com total de hábitos, streak atual de cada hábito

**Mobile**
- Lista de hábitos com indicação de cumprido hoje
- Cadastro e edição com validação (título e categoria obrigatórios)
- Detalhe do hábito com calendário de check-ins do mês, botão de check-in e streak atual

---

## Stack

| Camada | Tecnologia | Por quê |
| --- | --- | --- |
| API | NestJS + TypeScript | Estrutura modular, injeção de dependência e validação nativa |
| ORM | TypeORM | Integração direta com o NestJS |
| Banco | MySQL 8 | Requisito do teste, relacional e adequado ao modelo |
| Mobile | React Native (bare) + React Navigation | Requisito do teste, controle total do projeto nativo |
| Infra | Docker Compose | Sobe API e banco com um comando |

---

## Como rodar

### Pré-requisitos

- [Docker] Docker Compose
- Node.js 20+

### 1. Backend + banco

```bash
git clone https://github.com/josephbrito/namu_app.git
docker compose up --build
```

| Serviço | URL |
| --- | --- |
| API | http://localhost:3000/habits |
| MySQL | localhost:3306 |

### 2. App mobile

```bash
cd mobile
npm install
npx react-native start
npx react-native run-android
```

**URL da API no app**

| Ambiente | URL |
| --- | --- |
| Emulador Android | `10.0.2.2` |
| Dispositivo físico | `IP_DA_SUA_MAQUINA` (mesma rede Wi-Fi IPV4) |

Ajuste em `mobile/src/CAMINHO_DO_ARQUIVO_DE_CONFIG`.

---

## API

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/habits` | Lista hábitos |
| `GET` | `/habits/:id` | Detalha um hábito |
| `POST` | `/habits` | Cria hábito |
| `PUT` | `/habits/:id` | Atualiza hábito |
| `DELETE` | `/habits/:id` | Remove hábito |
| `POST` | `/habits/:habitId/checkins` |

---

## Estrutura

```
.
├── backend/              # API NestJS
├── mobile/               # App React Native
├── docker-compose.yml
├── seed.sql
```

---

## Decisões técnicas

- **Docker só para API e banco.** Emulador Android não roda de forma prática em container, então o app mobile é executado localmente.
- **Variáveis de ambiente na conexão com o banco**, com fallback para `localhost`, permitindo rodar dentro e fora do Docker.
- **Unicidade de check-in garantida no banco** (índice único em `habit_id` + `date`), além da validação na camada de serviço.
- **Separação em controllers, models e módulos** para manter responsabilidades isoladas, sem over-engineering para o escopo.

---
