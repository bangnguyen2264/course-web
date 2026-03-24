import { apiClient } from "@/services/axios.config";
import { CreateChapterRequest } from "@/types/subject";
import { API_ENDPOINTS } from "@/utils/endpoints";

export const chapterService = {
  async createChaptersBatch(data: CreateChapterRequest[]): Promise<any[]> {
    const res = await apiClient.post<any[]>(API_ENDPOINTS.CHAPTER.BATCH_CREATE, data);
    return res.data || [];
  }
};
