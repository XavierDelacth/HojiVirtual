import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

const StarRating = ({ 
  rating, 
  onRatingChange, 
  readonly = false,
  size = "md" 
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = value <= (hoverRating || rating);
        
        return (
          <button
            key={value}
            type="button"
            disabled={readonly}
            onClick={() => handleClick(value)}
            onMouseEnter={() => !readonly && setHoverRating(value)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            className={cn(
              "transition-transform",
              !readonly && "hover:scale-110 cursor-pointer",
              readonly && "cursor-default"
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "transition-colors",
                isFilled 
                  ? "fill-secondary text-secondary" 
                  : "text-muted-foreground/40"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
