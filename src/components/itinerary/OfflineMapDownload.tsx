
import { useEffect, useState } from 'react';
import { Map, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface OfflineMapDownloadProps {
  location: string;
  size?: string;
}

export const OfflineMapDownload = ({ 
  location, 
  size = '25MB' 
}: OfflineMapDownloadProps) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (downloadState === 'downloading') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setDownloadState('completed');
            toast.success(`${location} map downloaded for offline use!`);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [downloadState, location]);
  
  const handleDownload = () => {
    if (downloadState === 'idle' || downloadState === 'error') {
      setDownloadState('downloading');
      setProgress(0);
    }
  };
  
  return (
    <div className="bg-background rounded-lg border border-border/50 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Map size={18} className="text-primary mr-2" />
          <h3 className="font-medium">Offline Map: {location}</h3>
        </div>
        <span className="text-xs text-muted-foreground">{size}</span>
      </div>
      
      {downloadState === 'idle' && (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={handleDownload}
        >
          <Download size={16} className="mr-2" />
          Download for offline use
        </Button>
      )}
      
      {downloadState === 'downloading' && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Downloading...</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}
      
      {downloadState === 'completed' && (
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center text-emerald-500">
            <CheckCircle2 size={16} className="mr-1" />
            Downloaded
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setDownloadState('idle')}
          >
            <Download size={16} className="mr-1" />
            Update Map
          </Button>
        </div>
      )}
      
      {downloadState === 'error' && (
        <div className="space-y-2">
          <div className="flex items-center text-red-500 mb-2">
            <AlertCircle size={16} className="mr-1" />
            <span className="text-sm">Download failed</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={handleDownload}
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};
