import React from "react";
import { ArrowRight } from "lucide-react";

// interface CardProps {
//   title: string;
//   description: string;
// }

function Card({ title, description }) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm">
      <div className="flex gap-6">
        {/* Image placeholder */}
        <div className="w-48 h-36 bg-muted-foreground/40 rounded-2xl flex-shrink-0"></div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* More button */}
          <div className="mt-6">
            <button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 py-2 text-sm font-medium">
              More
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardGrid() {
  const cardData = {
    title: "Layihenin basligi",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <Card
            key={index}
            title={cardData.title}
            description={cardData.description}
          />
        ))}
      </div>
    </div>
  );
}
