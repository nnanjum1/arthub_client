const TableSkeleton = () => {
    return (
        <tbody>
            {[...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse border-b">
                    <td className="py-4">
                        <div className="h-4 bg-slate-200 rounded w-40"></div>
                    </td>

                    <td>
                        <div className="h-4 bg-slate-200 rounded w-24"></div>
                    </td>

                    <td>
                        <div className="h-4 bg-slate-200 rounded w-20"></div>
                    </td>

                    <td>
                        <div className="h-4 bg-slate-200 rounded w-28"></div>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default TableSkeleton;