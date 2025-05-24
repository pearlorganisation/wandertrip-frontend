
interface TravelDocument {
  type: string;
  title: string;
  reference: string;
  date: string;
}

interface TravelDocumentsProps {
  documents: TravelDocument[];
}

export const TravelDocuments = ({ documents }: TravelDocumentsProps) => {
  return (
    <div>
      <div className="glass rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium">Your Travel Documents</h2>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Available Offline</span>
        </div>
        
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="bg-muted/30 p-3 rounded-lg flex justify-between items-center">
              <div>
                <span className="text-xs text-muted-foreground">{doc.type}</span>
                <p className="text-sm font-medium">{doc.title}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground">{doc.reference}</span>
                <p className="text-xs">{doc.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelDocuments;
