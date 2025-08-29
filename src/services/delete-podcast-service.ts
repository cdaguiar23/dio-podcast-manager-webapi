import { repositoryDeletePodcastByName } from "../repositories/podcasts-repositories";
import { StatusCode } from "../utils/status-code";

export const serviceDeletePodcast = async (podcastName: string): Promise<{ statusCode: number, message: string }> => {
  try {
    if (!podcastName) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        message: "Nome do podcast é obrigatório"
      };
    }

    // Deletar o podcast pelo nome
    const deleted = await repositoryDeletePodcastByName(podcastName);
    
    if (!deleted) {
      return {
        statusCode: StatusCode.NOT_FOUND,
        message: "Podcast não encontrado"
      };
    }

    return {
      statusCode: StatusCode.OK,
      message: "Podcast deletado com sucesso"
    };
  } catch (error) {
    console.error("Erro ao deletar podcast:", error);
    return {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      message: "Erro interno do servidor"
    };
  }
};
