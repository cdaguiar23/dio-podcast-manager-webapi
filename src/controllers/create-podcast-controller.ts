import { IncomingMessage, ServerResponse } from "http";
import { serviceCreatePodcast } from "../services/create-podcast-service";
import { ContentType } from "../utils/content-type";

const defaultContent = { "Content-Type": ContentType.JSON };

export const createPodcast = async (
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
        const podcastData = JSON.parse(body);
        
        // Chamar o serviço para criar o podcast
        const result = await serviceCreatePodcast(podcastData);
        
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
