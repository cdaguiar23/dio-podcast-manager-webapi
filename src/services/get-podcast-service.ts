import { PodcastTranferModel } from "../models/podcast-transfer-model";
import { repositoryGetPodcastDetails } from "../repositories/podcasts-repositories";
import { StatusCode } from "../utils/status-code";

export const serviceGetPodcastDetails = async (podcastId?: string): Promise<PodcastTranferModel> => {
  try {
    if (!podcastId) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        body: []
      };
    }

    const podcast = await repositoryGetPodcastDetails(podcastId);
    
    if (!podcast) {
      return {
        statusCode: StatusCode.NOT_FOUND,
        body: []
      };
    }

    return {
      statusCode: StatusCode.OK,
      body: [podcast]
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes do podcast:", error);
    return {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      body: []
    };
  }
};
