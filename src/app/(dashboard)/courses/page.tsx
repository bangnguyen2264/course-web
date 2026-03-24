"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@/components/widgets/Card";
import { Select } from "@/components/widgets/Select";
import { Button } from "@/components/widgets/Button";
import { Modal } from "@/components/widgets/Modal";
import { DynamicForm, FormField } from "@/components/form/DynamicForm";
import { SearchInput } from "@/components/widgets/SearchInput";
import { NumberInput } from "@/components/widgets/NumberInput";
import { subjectService } from "@/services/subjectService";
import { chapterService } from "@/services/chapterService";
import { lessonService } from "@/services/lessonService";
import { lessonSectionService } from "@/services/lessonSectionService";
import {
  Subject,
  SubjectFilterParams,
  SUBJECT_FILTER_OPTIONS,
  SubjectStatus,
  SubjectSortField,
  SortDirection,
} from "@/types/subject";

export default function SubjectManagementPage() {
  const [data, setData] = useState<Subject[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filters State
  const [filters, setFilters] = useState<SubjectFilterParams>({
    name: "",
    status: SubjectStatus.ALL,
    priceFrom: undefined,
    priceTo: undefined,
    page: 0,
    entry: 10,
    field: SubjectSortField.ID,
    sort: SortDirection.DESC,
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: "",
    description: "",
    price: 0,
    status: true,
    autoGenerateHierarchy: false,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await subjectService.getSubjects(filters);
      setData(res.data || []);
      setTotal(res.total || 0);
    } catch (err) {
      console.error("Failed to fetch subjects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial mock or real fetch. Uncomment loadData() when api is ready.
    // For now, let's use the provided JSON as fallback if API fails or just rely on API.
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page, filters.entry, filters.sort]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, page: 0 })); // Reset page
    loadData();
  };

  const handleReset = () => {
    setFilters({
      name: "",
      status: SubjectStatus.ALL,
      priceFrom: undefined,
      priceTo: undefined,
      page: 0,
      entry: 10,
      field: SubjectSortField.ID,
      sort: SortDirection.DESC,
    });
    // Triggers effect to load data
  };

  const formatPrice = (price: number) => {
    if (price === 0 || price === 0.0) return <span className="text-emerald-600 font-bold p-1 bg-emerald-50 rounded">Free</span>;
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
  };

  const formFields: FormField[] = [
    {
      name: "name",
      label: "Tên môn học *",
      type: "text",
      placeholder: "VD: Nhập môn ReactJS",
      colSpan: 2,
    },
    {
      name: "price",
      label: "Giá (VNĐ)",
      type: "number",
      placeholder: "0",
      colSpan: 2,
    },
    {
      name: "description",
      label: "Mô tả",
      type: "textarea",
      placeholder: "Tóm tắt về môn học...",
      colSpan: 2,
      rows: 3,
    },
    {
      name: "status",
      label: "Khởi chạy ngay (Active)",
      type: "checkbox",
      colSpan: 2,
    },
  ];

  const handleFormChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomFormChange = (name: string, value: any) => {
    setNewSubject((prev) => ({ ...prev, [name]: value }));
  };

  // Hierarchy Creation Logic
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.name.trim()) return;

    try {
      setIsCreating(true);
      // 1. Create Subject - Default position to 1
      const createdSubject = await subjectService.createSubject({
        name: newSubject.name,
        description: newSubject.description,
        price: Number(newSubject.price),
        status: newSubject.status,
        position: 1, // Defaulting position to 1 per requirement
      });

      if (newSubject.autoGenerateHierarchy && createdSubject?.id) {
        // 2. Create Chapter
        const chapters = await chapterService.createChaptersBatch([
          { subjectId: createdSubject.id, title: "Chương 1", description: "Mô tả chương 1", position: 1 },
        ]);
        const chapterId = chapters[0]?.id;

        if (chapterId) {
          // 3. Create Lesson
          const lessons = await lessonService.createLessonsBatch([
            { chapterId, title: "Bài 1", description: "Mô tả bài 1", position: 1 },
          ]);
          const lessonId = lessons[0]?.id;

          if (lessonId) {
            // 4. Create Section
            await lessonSectionService.createLessonSectionsBatch([
              {
                lessonId,
                dataType: "TEXT",
                title: "Nội dung 1",
                description: "Nội dung bài học",
                content: "<p>Nội dung chi tiết...</p>",
                position: 1,
              },
            ]);
          }
        }
      }

      setIsModalOpen(false);
      loadData(); // Reload table
      setNewSubject({ name: "", description: "", price: 0, status: true, autoGenerateHierarchy: false });
    } catch (err) {
      console.error("Error creating subject hierarchy", err);
      // Provide user feedback here (toast, etc)
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Danh sách Môn học</h1>
          <p className="text-gray-500 mt-1">Quản lý môn học, chương, và nội dung đào tạo</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <span>➕</span> Tạo môn học mới
        </Button>
      </div>

      {/* Filter Bar matching Swagger UI */}
      <Card className="shadow-sm border border-gray-100">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
          <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
            <span>🔍</span> Bộ lọc tìm kiếm
          </h2>
        </CardHeader>
        <CardBody className="pt-6">
          <div className="mb-6 pb-6 border-b border-gray-100 flex gap-4 items-center">
             <SearchInput
               name="name"
               value={filters.name}
               onChange={handleFilterChange}
               placeholder="Nhập tên môn học..."
             />
             
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-2">
            <Select
              label="Trạng thái"
              name="status"
              value={filters.status?.toString() || SubjectStatus.ALL}
              onChange={handleFilterChange}
              options={SUBJECT_FILTER_OPTIONS.STATUS}
            />

            <NumberInput
              label="Giá từ"
              labelClassName="text-gray-600"
              name="priceFrom"
              value={filters.priceFrom || ""}
              onChange={handleFilterChange}
              placeholder="0"
            />

            <NumberInput
              label="Đến giá"
              labelClassName="text-gray-600"
              name="priceTo"
              value={filters.priceTo || ""}
              onChange={handleFilterChange}
              placeholder="1000000"
            />

            <Select
              label="Sắp xếp theo"
              name="field"
              value={filters.field || SubjectSortField.ID}
              onChange={handleFilterChange}
              options={SUBJECT_FILTER_OPTIONS.SORT_FIELD}
            />

            <Select
              label="Thứ tự"
              name="sort"
              value={filters.sort || SortDirection.DESC}
              onChange={handleFilterChange}
              options={SUBJECT_FILTER_OPTIONS.SORT_DIRECTION}
            />
          </div>
          
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
            <Button onClick={handleSearch} isLoading={loading} className="px-6 h-12 rounded-xl border border-transparent shadow-sm">
                Tìm kiếm
             </Button>
            <Button variant="secondary" type="button" onClick={handleReset} className="text-gray-600 border border-gray-300 hover:bg-gray-50">
              Hủy lọc
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Excel-like Data Table */}
      <Card className="shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase font-semibold text-[11px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 border-r border-gray-200 w-16 text-center">ID</th>
                <th className="px-4 py-3 border-r border-gray-200">Tên môn học</th>
                <th className="px-4 py-3 border-r border-gray-200 w-64">Mô tả</th>
                <th className="px-4 py-3 border-r border-gray-200 w-24 text-center">Vị trí</th>
                <th className="px-4 py-3 border-r border-gray-200 text-right w-32">Giá</th>
                <th className="px-4 py-3 border-r border-gray-200 text-center w-32">Trạng thái</th>
                <th className="px-4 py-3 border-r border-gray-200 w-36">Ngày tạo</th>
                <th className="px-4 py-3 text-center w-32">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                    <div className="flex justify-center flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang tải dữ liệu...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                    <span className="text-4xl block mb-2">📭</span>
                    Không tìm thấy dữ liệu môn học phù hợp
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="px-4 py-2 border-r border-gray-200 text-center text-gray-500">{item.id}</td>
                    <td className="px-4 py-2 border-r border-gray-200 font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </td>
                    <td className="px-4 py-2 border-r border-gray-200 text-gray-500 truncate max-w-[200px]" title={item.description}>
                      {item.description || "-"}
                    </td>
                    <td className="px-4 py-2 border-r border-gray-200 text-center text-gray-500">{item.position}</td>
                    <td className="px-4 py-2 border-r border-gray-200 text-right font-medium">
                      {formatPrice(item.price)}
                    </td>
                    <td className="px-4 py-2 border-r border-gray-200 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wide ${item.status ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {item.status ? "Hoạt động" : "Đã khóa"}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-r border-gray-200 text-gray-500 text-xs">
                      {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors" title="Sửa">✏️</button>
                      <button className="text-red-600 hover:text-red-800 p-1 bg-red-50 rounded hover:bg-red-100 transition-colors" title="Xóa">🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="bg-gray-50 border-t border-gray-200 p-3 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-3">
            <div className="flex items-center gap-4">
              <span>Hiển thị trang {filters.page} | Tổng số: <span className="font-bold text-gray-900">{total}</span></span>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Số dòng hiển thị:</span>
                <select
                  name="entry"
                  value={filters.entry}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => setFilters(p => ({ ...p, page: Math.max(0, p.page - 1) }))}
                disabled={filters.page === 0}
                className="px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white font-medium transition-colors"
              >Trước</button>
              <button
                onClick={() => setFilters(p => ({ ...p, page: p.page + 1 }))}
                disabled={data.length < filters.entry}
                className="px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white font-medium transition-colors"
              >Sau</button>
            </div>
          </div>
        </div>
      </Card>

      {/* Creation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => !isCreating && setIsModalOpen(false)}
        title="✨ Tạo Môn học Mới"
      >
        <DynamicForm
          fields={formFields}
          formData={newSubject}
          formErrors={{}}
          onChange={handleFormChange}
          onCustomChange={handleCustomFormChange}
          onSubmit={handleCreate}
          submitText="Hoàn tất tạo"
          isLoading={isCreating}
          extraActions={
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl mt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newSubject.autoGenerateHierarchy}
                  onChange={(e) => setNewSubject(p => ({ ...p, autoGenerateHierarchy: e.target.checked }))}
                  className="w-4 h-4 mt-1 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <div>
                  <span className="block text-sm font-semibold text-indigo-900">Tự động khởi tạo phân cấp (Hierarchy)</span>
                  <span className="block text-xs text-indigo-600 mt-1">Sẽ tự động gọi chuỗi API để tạo sẵn: 1 Chương, 1 Bài học, 1 Nội dung. Giúp bạn tiết kiệm thời gian thiết lập ban đầu.</span>
                </div>
              </label>
            </div>
          }
        />
      </Modal>
    </div>
  );
}
