import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationProps {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  description?: string;
  onClose: (id: string) => void;
}

export default function Notification({
  id,
  type,
  title,
  description,
  onClose,
}: NotificationProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  const Icon = icons[type];

  return (
    <motion.div
      className={`${colors[type]} text-white p-4 rounded-lg shadow-lg max-w-sm`}
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold">{title}</h4>
          {description && <p className="text-sm opacity-90">{description}</p>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onClose(id)}
          className="text-white hover:bg-white/20 p-1 h-auto"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

interface NotificationContainerProps {
  notifications: Array<{
    id: string;
    type: "success" | "error" | "info";
    title: string;
    description?: string;
  }>;
  onClose: (id: string) => void;
}

export function NotificationContainer({
  notifications,
  onClose,
}: NotificationContainerProps) {
  return (
    <div className="fixed top-20 right-6 z-50 space-y-4">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
