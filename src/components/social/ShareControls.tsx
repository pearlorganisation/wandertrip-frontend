
import { Instagram, Facebook, Twitter, Send, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareControlsProps {
  onShare: (platform: string) => void;
}

export const ShareControls = ({ onShare }: ShareControlsProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onShare('Instagram')}
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
      >
        <Instagram size={16} className="mr-2" />
        Instagram
      </button>
      <button
        onClick={() => onShare('Facebook')}
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:opacity-90 transition-opacity"
      >
        <Facebook size={16} className="mr-2" />
        Facebook
      </button>
      <button
        onClick={() => onShare('Twitter')}
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-sky-500 text-white hover:opacity-90 transition-opacity"
      >
        <Twitter size={16} className="mr-2" />
        Twitter
      </button>
      <button
        onClick={() => onShare('WhatsApp')}
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-green-500 text-white hover:opacity-90 transition-opacity"
      >
        <Send size={16} className="mr-2" />
        WhatsApp
      </button>
      <button
        onClick={() => onShare('download')}
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
      >
        <Download size={16} className="mr-2" />
        Download
      </button>
    </div>
  );
};
