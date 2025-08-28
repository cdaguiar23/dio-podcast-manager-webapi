import { repositoryDeletePodcast } from "../repositories/podcasts-repositories";
import { StatusCode } from "../utils/status-code";

export const serviceDeletePodcast = async (podcastId: string): Promise<{ statusCode: number, message: string }> => {
  try {
    if (!podcastId) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        message: "ID do podcast é obrigatório"
      };
    }

    // Deletar o podcast
    const deleted = await repositoryDeletePodcast(podcastId);
    
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
