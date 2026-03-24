import { apiClient } from "@/services/axios.config";
import { CreateLessonSectionRequest } from "@/types/subject";
import { API_ENDPOINTS } from "@/utils/endpoints";

export const lessonSectionService = {
  async createLessonSectionsBatch(data: CreateLessonSectionRequest[]): Promise<any[]> {
    const res = await apiClient.post<any[]>(API_ENDPOINTS.LESSON_SECTION.BATCH_CREATE, data);
    return res.data || [];
  }
};
