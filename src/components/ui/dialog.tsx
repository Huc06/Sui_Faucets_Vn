import { useDialogStore } from "@/store";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { IconButton } from "./button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const Dialog = () => {
  const { isOpen, component, close } = useDialogStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex md:items-center md:justify-center items-end justify-center z-[51]"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={cn(
              "bg-[#030f1c] border border-white/10 px-[30px] pt-6 md:pb-6 flex flex-col rounded-t-[40px] md:rounded-[40px] max-h-[80vh] w-full md:max-w-md overflow-y-auto"
            )}
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              ...(isMobile
                ? {
                    y: "100%",
                    scale: 1,
                  }
                : {
                    scale: 0.8,
                    y: 20,
                  }),
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              ...(isMobile
                ? {
                    y: "100%",
                    scale: 1,
                  }
                : {
                    scale: 0.8,
                    y: 20,
                  }),
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {component}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DialogHeader = ({
  title,
  onClose,
  className,
}: {
  title: string;
  onClose: () => void;
  className?: string;
}) => {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <p className="text-lg">{title}</p>
      <IconButton onClick={onClose} className="size-8">
        <X className="size-6" />
      </IconButton>
    </div>
  );
};
