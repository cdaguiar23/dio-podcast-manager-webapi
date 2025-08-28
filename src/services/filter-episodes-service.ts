import { PodcastTranferModel } from "../models/podcast-transfer-model";
import { repositoryPodcast } from "../repositories/podcasts-repositories";
import { StatusCode } from "../utils/status-code";

export const serviceFilterEpisodes = async (podcastName: string | undefined): Promise<PodcastTranferModel> => {

  // define o contrato
  let responseFormat: PodcastTranferModel = {
    statusCode: 0,
    body: []
  }

  // busco os dados
    const queryString = podcastName?.split("?p=")[1] || ""
    const data = await repositoryPodcast(queryString)
 
    // verifico o tipo de resposta
    responseFormat = {
      statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NOCONTENT,
      body: data,
  }

    return responseFormat
} 



