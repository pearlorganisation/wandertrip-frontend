
interface PremiumAddon {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

interface PremiumAddonsProps {
  addons: PremiumAddon[];
}

export const PremiumAddons = ({ addons }: PremiumAddonsProps) => {
  return (
    <section className="py-12">
      <div className="container px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-medium mb-6">Premium Add-ons</h2>
          <p className="text-muted-foreground mb-8">
            Enhance your trip with these exclusive experiences hand-picked to complement your itinerary
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addons.map((addon) => (
              <div key={addon.id} className="glass rounded-xl overflow-hidden shadow-sm hover-scale">
                <img
                  src={addon.image}
                  alt={addon.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-medium mb-2">{addon.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{addon.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-primary">{addon.price}</span>
                    <button className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20">
                      Add to Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
