import { apiClient } from "@/services/axios.config";
import { API_ENDPOINTS } from "@/utils/endpoints";
import {
  Subject,
  PaginatedResponse,
  SubjectFilterParams,
  CreateSubjectRequest,
} from "@/types/subject";

export const subjectService = {
  async getSubjects(params: SubjectFilterParams): Promise<PaginatedResponse<Subject>> {
    const res = await apiClient.get<PaginatedResponse<Subject>>(API_ENDPOINTS.SUBJECT.LIST, { params });
    // apiClient's interceptor directly returns the payload if it detects 'total'
    return res as unknown as PaginatedResponse<Subject>;
  },

  async createSubject(data: CreateSubjectRequest): Promise<Subject> {
    const res = await apiClient.post<Subject>(API_ENDPOINTS.SUBJECT.CREATE, data);
    return res.data as Subject;
  }
};
