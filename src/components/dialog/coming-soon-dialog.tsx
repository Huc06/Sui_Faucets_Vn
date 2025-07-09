import { useDialogStore } from "@/store";
import { Button, DialogHeader } from "../ui";

export const ComingSoonDialog = () => {
  const { close } = useDialogStore();

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <DialogHeader title="Sắp ra mắt" onClose={close} className="pb-4" />

      <div className="flex flex-col items-center justify-center flex-1 space-y-6">
        {/* Biểu tượng Sắp ra mắt */}
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Nội dung Sắp ra mắt */}
        <div className="text-center space-y-3">
          <h3 className="text-xl font-semibold text-white">
            Tính năng này sắp ra mắt!
          </h3>
          <p className="text-gray-400 text-sm max-w-md">
            Chúng tôi đang nỗ lực để mang đến cho bạn tính năng mới thú vị này.
            Hãy chờ đợi để cập nhật!
          </p>
        </div>

        {/* Chỉ báo Trạng thái */}
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-foreground/60 border border-white/10">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-orange-400">
            Đang phát triển
          </span>
        </div>

        {/* Nút Đóng */}
        <Button onClick={close} size="large" className="w-full">
          Đã hiểu!
        </Button>
      </div>
    </div>
  );
};
