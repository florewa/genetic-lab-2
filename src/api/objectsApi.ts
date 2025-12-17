import { axiosInstance } from "@/utils/axiosInstance/axiosInstance.ts";

export interface ObjectParagraph {
  id: number;
  title: string;
  description: string;
}

export interface ObjectImages {
  id: number;
  image: string;
}

export interface TempleObject {
  id: number;
  images: ObjectImages[];
  paragraphs: ObjectParagraph[];
  sequence: number;
  shortDescription: string;
  title: string;
}

export async function fetchObjects(): Promise<TempleObject[]> {
  try {
    const response = await axiosInstance.get<TempleObject[]>("/objects");
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке объектов:", error);
    return [];
  }
}
