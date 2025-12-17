import { Star, MapPin, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { stores } from "@/data/mockData";

const FeaturedStoresCarousel = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lojas <span className="text-gradient">Registadas</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Conheça algumas das lojas que já fazem parte do HojiVirtual
          </p>
        </div>

        {/* Stores Carousel */}
        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {stores.map((store) => (
                <CarouselItem key={store.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Card hover className="h-full overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {store.verified && (
                        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <BadgeCheck className="w-3 h-3" />
                          Verificada
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1 truncate">{store.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 truncate">{store.category}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{store.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                          <span className="font-semibold">{store.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({store.reviewCount} avaliações)
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStoresCarousel;
