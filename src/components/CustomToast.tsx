import { toast } from "react-hot-toast";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info" | "warning";

interface CustomToastProps {
  message: string;
  type: ToastType;
  duration?: number;
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-white" />,
  error: <XCircle className="w-5 h-5 text-white" />,
  info: <Info className="w-5 h-5 text-white" />,
  warning: <AlertTriangle className="w-5 h-5 text-black" />,
};

const bgColor = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
  warning: "bg-yellow-400 text-black",
};

export function showCustomToast({ message, type, duration = 5000 }: CustomToastProps) {
  toast.custom(
    (t) => (
      <AnimatePresence>
        {t.visible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={clsx(
              "max-w-sm w-full rounded-lg shadow-md p-4 flex items-start space-x-3 border",
              bgColor[type]
            )}
          >
            <div className="mt-1">{icons[type]}</div>
            <div className="flex-1 text-sm font-medium">{message}</div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="ml-2 text-white/70 hover:text-white"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    ),
    { duration }
  );
}