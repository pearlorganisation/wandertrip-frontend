
import { Crown, Star, Shield, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  color: string;
  icon: JSX.Element;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: Template;
  onTemplateSelect: (template: Template) => void;
}

export const TemplateSelector = ({ templates, selectedTemplate, onTemplateSelect }: TemplateSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {templates.map((template) => (
        <div 
          key={template.id}
          onClick={() => onTemplateSelect(template)}
          className={cn(
            "relative rounded-lg overflow-hidden aspect-video cursor-pointer transition-all hover:shadow-md",
            selectedTemplate.id === template.id ? "ring-2 ring-primary" : ""
          )}
        >
          <div className={cn("absolute inset-0", template.color)}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs font-medium flex items-center">
              {template.icon}
              {template.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
