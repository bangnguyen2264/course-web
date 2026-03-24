export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  total: number;
}

export interface Subject {
  id: number;
  name: string;
  description: string;
  position: number;
  price: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface SubjectFilterParams {
  name?: string;
  status?: boolean | string;
  priceFrom?: number;
  priceTo?: number;
  page: number;
  entry: number;
  field?: string;
  sort?: "ASC" | "DESC" | string;
}

export interface CreateSubjectRequest {
  name: string;
  description: string;
  position: number;
  price: number;
  status: boolean;
}

export interface CreateChapterRequest {
  subjectId: number;
  title: string;
  description: string;
  position: number;
}

export interface CreateLessonRequest {
  chapterId: number;
  title: string;
  description: string;
  position: number;
}

export interface CreateLessonSectionRequest {
  lessonId: number;
  dataType: "TEXT" | "VIDEO" | "FILE" | string;
  title: string;
  description: string;
  content: string;
  file?: string;
  position: number;
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export enum SubjectSortField {
  ID = "id",
  NAME = "name",
  PRICE = "price",
  CREATED_AT = "createdAt",
}

export enum SubjectStatus {
  ALL = "",
  ACTIVE = "true",
  INACTIVE = "false",
}

export const SUBJECT_FILTER_OPTIONS = {
  STATUS: [
    { label: "Tất cả", value: SubjectStatus.ALL },
    { label: "Hoạt động", value: SubjectStatus.ACTIVE },
    { label: "Khoá", value: SubjectStatus.INACTIVE },
  ],
  SORT_FIELD: [
    { label: "ID", value: SubjectSortField.ID },
    { label: "Tên môn học", value: SubjectSortField.NAME },
    { label: "Giá", value: SubjectSortField.PRICE },
    { label: "Ngày tạo", value: SubjectSortField.CREATED_AT },
  ],
  SORT_DIRECTION: [
    { label: "Giảm dần", value: SortDirection.DESC },
    { label: "Tăng dần", value: SortDirection.ASC },
  ],
};
