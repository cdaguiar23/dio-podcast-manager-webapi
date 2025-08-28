import { IncomingMessage, ServerResponse } from "http";
import { serviceListEpisodes } from "../services/list-episodes-service";
import { serviceFilterEpisodes } from "../services/filter-episodes-service";
import { serviceGetPodcastDetails } from "../services/get-podcast-service";
import { ContentType } from "../utils/content-type";
import { PodcastTranferModel } from "../models/podcast-transfer-model";

const defaultContent = { "Content-Type": ContentType.JSON };

export const getPodcastDetails = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const podcastId = req.url?.split('/').pop(); // Assuming the ID is the last part of the URL
  const content: PodcastTranferModel = await serviceGetPodcastDetails(podcastId);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));
  res.end();
};

export const getListEpisodes = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const content: PodcastTranferModel = await serviceListEpisodes();

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();
};

export const getFilterEpisodes = async (
  req: IncomingMessage,
  res: ServerResponse
) => {

  const content: PodcastTranferModel = await serviceFilterEpisodes(req.url);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();
};
