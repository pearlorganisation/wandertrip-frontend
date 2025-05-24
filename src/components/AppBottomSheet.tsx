
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReactNode, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AppBottomSheetProps {
  trigger: ReactNode;
  title?: string;
  children: ReactNode;
  scrollable?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AppBottomSheet = ({
  trigger,
  title,
  children,
  scrollable = true,
  isOpen: controlledOpen,
  onOpenChange: controlledOnOpenChange
}: AppBottomSheetProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Determine if we're controlled or uncontrolled
  const isControlled = controlledOpen !== undefined && controlledOnOpenChange !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? controlledOnOpenChange : setUncontrolledOpen;
  
  if (!isMobile) {
    return (
      <div className="bg-background/80 backdrop-blur-xl border border-border/20 rounded-xl p-4 shadow-md">
        {title && <h3 className="text-lg font-medium mb-3">{title}</h3>}
        {children}
      </div>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent 
        side="bottom" 
        className={`rounded-t-2xl px-4 pb-8 pt-4 shadow-2xl bg-background/95 backdrop-blur-xl border-t border-border/20 ${scrollable ? "max-h-[90vh] overflow-y-auto" : ""}`}
      >
        <div className="flex justify-center mb-2">
          <motion.div 
            className="h-1.5 w-16 bg-muted/80 rounded-full" 
            initial={{ width: "30%" }}
            animate={{ width: "25%" }}
            transition={{ duration: 0.2, repeat: 1, repeatType: "reverse" }}
          />
        </div>
        
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              {title && (
                <motion.h3 
                  className="text-lg font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {title}
                </motion.h3>
              )}
              <motion.button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 w-8 h-8 flex items-center justify-center bg-muted/30 text-muted-foreground hover:bg-muted/40 active:bg-muted/80"
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <X size={18} />
              </motion.button>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="hardware-accelerated"
            >
              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
};
