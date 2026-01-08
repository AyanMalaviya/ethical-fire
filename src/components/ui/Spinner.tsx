export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-amber-400 text-sm sm:text-base">Loading...</p>
      </div>
    </div>
  );
}
