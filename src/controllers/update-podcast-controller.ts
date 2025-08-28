import { IncomingMessage, ServerResponse } from "http";
import { serviceUpdatePodcast } from "../services/update-podcast-service";
import { ContentType } from "../utils/content-type";

const defaultContent = { "Content-Type": ContentType.JSON };

export const updatePodcast = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    let body = '';
    
    // Coletar dados do corpo da requisição
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const podcastId = req.url?.split('/').pop(); // ID do podcast da URL
        const updateData = JSON.parse(body);
        
        if (!podcastId) {
          res.writeHead(400, defaultContent);
          res.write(JSON.stringify({ message: "ID do podcast é obrigatório" }));
          res.end();
          return;
        }

        // Chamar o serviço para atualizar o podcast
        const result = await serviceUpdatePodcast(podcastId, updateData);
        
        res.writeHead(result.statusCode, defaultContent);
        res.write(JSON.stringify({ message: result.message }));
        res.end();
      } catch (parseError) {
        res.writeHead(400, defaultContent);
        res.write(JSON.stringify({ message: "JSON inválido no corpo da requisição" }));
        res.end();
      }
    });

  } catch (error) {
    res.writeHead(500, defaultContent);
    res.write(JSON.stringify({ message: "Erro interno do servidor" }));
    res.end();
  }
};
