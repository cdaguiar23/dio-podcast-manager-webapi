import fs from "fs/promises";
import path from "path";
import { PodcastModel } from "../models/podcast-module";

const __dirname = path.resolve();
const pathData = path.join(__dirname, "src/repositories/podcasts.json");

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

export const repositoryCreatePodcast = async (podcastData: PodcastModel): Promise<void> => {
  const language = "utf-8";
  
  // Ler os podcasts existentes
  const rawData = await fs.readFile(pathData, language);
  const podcasts: PodcastModel[] = JSON.parse(rawData);
  
  // Adicionar o novo podcast
  podcasts.push(podcastData);
  
  // Salvar de volta no arquivo
  await fs.writeFile(pathData, JSON.stringify(podcasts, null, 2), language);
};

export const repositoryUpdatePodcast = async (podcastId: string, updateData: Partial<PodcastModel>): Promise<boolean> => {
  const language = "utf-8";
  
  // Ler os podcasts existentes
  const rawData = await fs.readFile(pathData, language);
  const podcasts: PodcastModel[] = JSON.parse(rawData);
  
  // Encontrar o índice do podcast a ser atualizado
  const podcastIndex = podcasts.findIndex((p: PodcastModel) => p.videoId === podcastId);
  
  if (podcastIndex === -1) {
    return false; // Podcast não encontrado
  }
  
  // Atualizar apenas os campos fornecidos
  podcasts[podcastIndex] = {
    ...podcasts[podcastIndex],
    ...updateData
  };
  
  // Salvar de volta no arquivo
  await fs.writeFile(pathData, JSON.stringify(podcasts, null, 2), language);
  
  return true; // Atualização bem-sucedida
};

export const repositoryGetPodcastByName = async (podcastName: string): Promise<PodcastModel | null> => {
  const language = "utf-8";
  const rawData = await fs.readFile(pathData, language);
  const podcasts: PodcastModel[] = JSON.parse(rawData);
  
  // Encontrar o podcast pelo nome
  const podcast = podcasts.find((p: PodcastModel) => p.podcastName === podcastName);
  
  return podcast || null;
};

export const repositoryDeletePodcast = async (podcastId: string): Promise<boolean> => {
  const language = "utf-8";
  
  // Ler os podcasts existentes
  const rawData = await fs.readFile(pathData, language);
  let podcasts: PodcastModel[] = JSON.parse(rawData);
  
  // Encontrar o índice do podcast a ser deletado
  const podcastIndex = podcasts.findIndex((p: PodcastModel) => p.videoId === podcastId);
  
  if (podcastIndex === -1) {
    return false; // Podcast não encontrado
  }
  
  // Remover o podcast do array
  podcasts.splice(podcastIndex, 1);
  
  // Salvar de volta no arquivo
  await fs.writeFile(pathData, JSON.stringify(podcasts, null, 2), language);
  
  return true; // Deleção bem-sucedida
};

export const repositoryDeletePodcastByName = async (podcastName: string): Promise<boolean> => {
  const language = "utf-8";
  
  // Ler os podcasts existentes
  const rawData = await fs.readFile(pathData, language);
  let podcasts: PodcastModel[] = JSON.parse(rawData);
  
  // Encontrar o índice do podcast a ser deletado pelo nome
  const podcastIndex = podcasts.findIndex((p: PodcastModel) => p.podcastName === podcastName);
  
  if (podcastIndex === -1) {
    return false; // Podcast não encontrado
  }
  
  // Remover o podcast do array
  podcasts.splice(podcastIndex, 1);
  
  // Salvar de volta no arquivo
  await fs.writeFile(pathData, JSON.stringify(podcasts, null, 2), language);
  
  return true; // Deleção bem-sucedida
};
