import { IncomingMessage, ServerResponse } from "http";
import { serviceDeletePodcast } from "../services/delete-podcast-service";
import { ContentType } from "../utils/content-type";

const defaultContent = { "Content-Type": ContentType.JSON };

export const deletePodcast = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    // Extrair o nome do podcast da URL (último segmento do caminho)
    const urlParts = req.url?.split('/');
    const podcastName = urlParts?.pop(); // Nome do podcast da URL
    
    // Decodificar o nome do podcast (para lidar com espaços e caracteres especiais)
    const decodedPodcastName = podcastName ? decodeURIComponent(podcastName) : '';
    
    if (!decodedPodcastName) {
      res.writeHead(400, defaultContent);
      res.write(JSON.stringify({ message: "Nome do podcast é obrigatório" }));
      res.end();
      return;
    }

    // Chamar o serviço para deletar o podcast pelo nome
    const result = await serviceDeletePodcast(decodedPodcastName);
    
    res.writeHead(result.statusCode, defaultContent);
    res.write(JSON.stringify({ message: result.message }));
    res.end();

  } catch (error) {
    res.writeHead(500, defaultContent);
    res.write(JSON.stringify({ message: "Erro interno do servidor" }));
    res.end();
  }
};
