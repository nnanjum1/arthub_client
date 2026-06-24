export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>

                <p className="text-teal-600 font-medium">
                    Loading...
                </p>
            </div>
        </div>
    );
}