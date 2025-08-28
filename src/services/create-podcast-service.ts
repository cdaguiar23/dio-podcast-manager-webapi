import { PodcastModel } from "../models/podcast-module";
import { repositoryCreatePodcast } from "../repositories/podcasts-repositories";
import { StatusCode } from "../utils/status-code";

export const serviceCreatePodcast = async (podcastData: PodcastModel): Promise<{ statusCode: number, message: string }> => {
  try {
    // Validar dados obrigatórios
    if (!podcastData.podcastName || !podcastData.episode || !podcastData.videoId) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        message: "Campos obrigatórios: podcastName, episode e videoId"
      };
    }

    // Validar se categories é um array
    if (!Array.isArray(podcastData.categories)) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        message: "Categories deve ser um array"
      };
    }

    // Criar o podcast
    await repositoryCreatePodcast(podcastData);
    
    return {
      statusCode: StatusCode.CREATED,
      message: "Podcast criado com sucesso"
    };
  } catch (error) {
    console.error("Erro ao criar podcast:", error);
    return {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      message: "Erro interno do servidor"
    };
  }
};
