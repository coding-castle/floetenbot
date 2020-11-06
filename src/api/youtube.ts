import axios from "axios"
import ytdlDiscord from "discord-ytdl-core"
import { GOOGLE_TOKEN } from "../config"
import { Item, YoutubeSearchResult } from "../types/youtube"
import { Song } from ".."
import logger from "../utils/logger"

export async function getVideoUrl(query: string): Promise<Item> {
  try {
    const { data } = await axios.get<YoutubeSearchResult>(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURI(query)}&key=${GOOGLE_TOKEN}`,
    )
    if (data.items && data.items.length > 0) {
      const item = data.items[0]
      return item
    }
    throw new Error("No items")
  } catch (error) {
    logger.error(error.message)
    throw new Error(error)
  }
}

export async function getVideoInfo(url: string): Promise<Song> {
  try {
    const data = await ytdlDiscord.getInfo(url)
    if (!data) {
      throw new Error("No item")
    }
    const song: Song = {
      url: data.videoDetails.video_url,
      title: data.videoDetails.title,
    }
    return song
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}
