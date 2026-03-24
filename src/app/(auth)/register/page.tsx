import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="relative overflow-hidden rounded-3xl bg-[#EEF4FF] min-h-[calc(100vh-7rem)] border border-white/70 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-sky-200/60 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-cyan-200/45 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.17)_1px,transparent_0)] [background-size:22px_22px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 px-4 py-6 md:px-8 md:py-10 lg:grid-cols-12">
        <section className="hidden lg:flex lg:col-span-5 flex-col justify-center pr-6">
          <p className="inline-flex w-fit rounded-full border border-blue-200 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
            EduPlatform
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900">
            Nang cap trai nghiem hoc tap
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Tao tai khoan chi trong vai buoc de bat dau lo trinh hoc ca nhan hoa.
          </p>
        </section>

        <div className="lg:col-span-7 lg:justify-self-end w-full max-w-3xl">
          <div className="rounded-3xl bg-white shadow-[0_20px_50px_rgba(30,64,175,0.13)] border border-white/90 p-5 md:p-6">
            <div className="text-center mb-5">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent tracking-tighter">
                  EduPlatform
                </span>
              </Link>
              <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 tracking-tight">Đăng Ký Tài Khoản</h1>
            </div>

            <RegisterForm />

            <p className="text-center mt-5 text-[11px] text-gray-500 leading-relaxed font-medium">
              Đã có tài khoản?{" "}
              <Link href="/login" className="text-blue-600 font-bold hover:underline">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
