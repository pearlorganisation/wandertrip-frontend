
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ChevronLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface MobileAppHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  actions?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }[];
  className?: string;
  bgColor?: string;
  textColor?: string;
}

export const MobileAppHeader = ({
  title,
  subtitle,
  showBackButton = true,
  actions = [],
  className,
  bgColor = "bg-background/80",
  textColor = "text-foreground"
}: MobileAppHeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;
  
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        `sticky top-0 z-40 px-4 py-3 ${bgColor} backdrop-blur-xl shadow-sm border-b border-border/10`,
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <motion.button 
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-background/50 border border-border/20 shadow-sm active:bg-background/80"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
          )}
          <div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`text-lg font-medium leading-tight ${textColor}`}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-muted-foreground"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
        
        {actions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-background/50 border border-border/20 shadow-sm active:bg-background/80"
                whileTap={{ scale: 0.9 }}
              >
                <MoreVertical className="h-5 w-5" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-in slide-in-from-top-2 duration-200 rounded-xl shadow-lg border-border/20">
              {actions.map((action, index) => (
                <DropdownMenuItem 
                  key={index} 
                  onClick={action.onClick}
                  className="hover:bg-muted/50 focus:bg-muted/50 rounded-lg my-1 cursor-pointer"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </motion.header>
  );
};
