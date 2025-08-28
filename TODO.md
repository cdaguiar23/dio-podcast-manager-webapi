# TODO - Implementação de Criação de Podcasts

## ✅ Etapas Concluídas:
- [x] Criar serviço de criação de podcasts (create-podcast-service.ts)
- [x] Adicionar função de escrita no repositório (podcasts-repositories.ts)
- [x] Criar controller para criação de podcasts (create-podcast-controller.ts)
- [x] Adicionar nova rota CREATE (routes.ts)
- [x] Atualizar app.ts para incluir rota POST

## 🔄 Próximos Passos:
- [ ] Testar a funcionalidade com Postman
- [ ] Verificar se o arquivo podcasts.json é atualizado corretamente
- [ ] Testar validações de dados

## 📋 Como Testar com Postman:

1. **Iniciar o servidor:**
   ```bash
   npm run dev
   ```

2. **Configurar requisição POST no Postman:**
   - URL: `http://localhost:3000/api/podcasts/create`
   - Method: POST
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "podcastName": "nome-do-podcast",
     "episode": "Nome do Episódio",
     "videoId": "abc123",
     "categories": ["categoria1", "categoria2"]
   }
   ```

3. **Respostas esperadas:**
   - Sucesso (201): `{"message": "Podcast criado com sucesso"}`
   - Erro de validação (400): `{"message": "Campos obrigatórios: podcastName, episode e videoId"}`
   - Erro interno (500): `{"message": "Erro interno do servidor"}`
