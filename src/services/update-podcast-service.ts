import { PodcastModel } from "../models/podcast-module";
import { repositoryUpdatePodcast, repositoryGetPodcastByName } from "../repositories/podcasts-repositories";
import { StatusCode } from "../utils/status-code";

export const serviceUpdatePodcast = async (podcastName: string, podcastData: Partial<PodcastModel>): Promise<{ statusCode: number, message: string }> => {
  try {
    // Validar se pelo menos um campo foi fornecido para atualização
    if (Object.keys(podcastData).length === 0) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        message: "Pelo menos um campo deve ser fornecido para atualização"
      };
    }

    // Validar categories se for fornecido
    if (podcastData.categories && !Array.isArray(podcastData.categories)) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        message: "Categories deve ser um array"
      };
    }

    // Buscar o podcast pelo nome para obter o ID
    const podcast = await repositoryGetPodcastByName(podcastName);
    
    if (!podcast) {
      return {
        statusCode: StatusCode.NOT_FOUND,
        message: "Podcast não encontrado"
      };
    }

    // Atualizar o podcast usando o ID
    const updated = await repositoryUpdatePodcast(podcast.videoId, podcastData);
    
    if (!updated) {
      return {
        statusCode: StatusCode.NOT_FOUND,
        message: "Erro ao atualizar o podcast"
      };
    }

    return {
      statusCode: StatusCode.OK,
      message: "Podcast atualizado com sucesso"
    };
  } catch (error) {
    console.error("Erro ao atualizar podcast:", error);
    return {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      message: "Erro interno do servidor"
    };
  }
};
