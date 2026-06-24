const ArtworkSkeleton = () => {
    return (
        <div className="animate-pulse bg-white border rounded-xl overflow-hidden">
            <div className="h-56 bg-slate-200"></div>

            <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-200 rounded"></div>

                <div className="h-4 bg-slate-200 rounded w-2/3"></div>

                <div className="h-5 bg-slate-200 rounded w-1/3"></div>
            </div>
        </div>
    );
};

export default ArtworkSkeleton;