import fs from "fs/promises";
import path from "path";
import { PodcastModel } from "../models/podcast-module";

// AInclusão de meta.url para leitura do diretório onde está o arquivo .json por estar rodando pleo Firebase Studio
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryPodcast = async (podcastName?: string): Promise<PodcastModel[]> => {
  const language = "utf-8"
  const rawData = fs.readFile(pathData, language);
  let jsonFile = JSON.parse(await rawData);

  if (podcastName) {
    jsonFile = jsonFile.filter(
      (podcast: PodcastModel) => podcast.podcastName === podcastName
    );
  }
  return jsonFile;
};
