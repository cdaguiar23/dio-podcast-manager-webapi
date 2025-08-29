import { getFilterEpisodes, getListEpisodes, getPodcastDetails } from "./controllers/podcasts-controller";
import { createPodcast } from "./controllers/create-podcast-controller";
import { updatePodcast } from "./controllers/update-podcast-controller";
import { deletePodcast } from "./controllers/delete-podcast-controller";
import { Routes } from './routes/routes';
import { HttpMethod } from './utils/http-methods';
import * as http from 'http'

export const app = async (request: http.IncomingMessage, response: http.ServerResponse) => {

    // queryString
    const baseUrl = request.url?.split("?")[0]
    
    // listas podcasts
    if (request.method === HttpMethod.GET && baseUrl === Routes.LIST) {
        await getListEpisodes(request, response)
    } else if (request.method === HttpMethod.GET && baseUrl === Routes.EPISODE) { 
        await getFilterEpisodes(request, response) 
    } else if (request.method === HttpMethod.POST && baseUrl === Routes.CREATE) {
        await createPodcast(request, response)
    } else if (request.method === HttpMethod.PUT && baseUrl?.startsWith(Routes.PODCAST_UPDATE)) {
        await updatePodcast(request, response)
    } else if (request.method === HttpMethod.DELETE && baseUrl?.startsWith(Routes.PODCAST_DELETE)) {
        await deletePodcast(request, response)
    }
}
