"use client";

const DeleteModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Artwork",
    message = "Are you sure you want to delete this artwork? This action cannot be undone.",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

                <h2 className="text-2xl font-bold text-slate-800">
                    {title}
                </h2>

                <p className="text-slate-600 mt-3">
                    {message}
                </p>

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-lg hover:bg-slate-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
};

export default DeleteModal;