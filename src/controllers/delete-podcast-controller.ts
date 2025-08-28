import { IncomingMessage, ServerResponse } from "http";
import { serviceDeletePodcast } from "../services/delete-podcast-service";
import { ContentType } from "../utils/content-type";

const defaultContent = { "Content-Type": ContentType.JSON };

export const deletePodcast = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const podcastId = req.url?.split('/').pop(); // ID do podcast da URL
    
    if (!podcastId) {
      res.writeHead(400, defaultContent);
      res.write(JSON.stringify({ message: "ID do podcast é obrigatório" }));
      res.end();
      return;
    }

    // Chamar o serviço para deletar o podcast
    const result = await serviceDeletePodcast(podcastId);
    
    res.writeHead(result.statusCode, defaultContent);
    res.write(JSON.stringify({ message: result.message }));
    res.end();

  } catch (error) {
    res.writeHead(500, defaultContent);
    res.write(JSON.stringify({ message: "Erro interno do servidor" }));
    res.end();
  }
};
