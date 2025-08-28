import { PodcastModel } from "./podcast-module";

export interface PodcastTranferModel {
    statusCode: number,
    body: PodcastModel[],
}