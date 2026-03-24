import { apiClient } from "@/services/axios.config";
import { CreateLessonRequest } from "@/types/subject";
import { API_ENDPOINTS } from "@/utils/endpoints";

export const lessonService = {
  async createLessonsBatch(data: CreateLessonRequest[]): Promise<any[]> {
    const res = await apiClient.post<any[]>(API_ENDPOINTS.LESSON.BATCH_CREATE, data);
    return res.data || [];
  }
};
