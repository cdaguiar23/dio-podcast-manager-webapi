import { repositoryPodcast } from "../repositories/podcasts-repositories"
import { PodcastTranferModel } from "../models/podcast-transfer-model"
import { StatusCode } from "../utils/status-code"


export const serviceListEpisodes = async (): Promise<PodcastTranferModel> => {

    // define o contrato
    let responseFormat: PodcastTranferModel = {
        statusCode: 0,
        body: []
    }

    // busco os dados
    const data = await repositoryPodcast()

    // verifico o tipo de resposta
    responseFormat = {
        statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NOCONTENT,
        body: data,
    }

    return responseFormat     
}