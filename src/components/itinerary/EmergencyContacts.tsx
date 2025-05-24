
import { AlertTriangle } from 'lucide-react';

interface EmergencyContact {
  title: string;
  contact: string;
}

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
}

export const EmergencyContacts = ({ contacts }: EmergencyContactsProps) => {
  return (
    <section className="py-8 bg-secondary/10">
      <div className="container px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <AlertTriangle size={18} className="text-red-500 mr-2" />
              Emergency Contacts in Bali
            </h3>
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-background/80 rounded-lg">
                  <span className="font-medium">{contact.title}</span>
                  <a href={`tel:${contact.contact}`} className="text-primary">
                    {contact.contact}
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-red-50 rounded-lg text-sm text-red-700">
              In case of emergency, you can also contact our 24/7 helpline at <strong>+1-800-123-4567</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
