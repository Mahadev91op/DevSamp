export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 z-50 select-none">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}