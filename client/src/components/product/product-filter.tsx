import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductFilterProps {
  selectedCategory: string;
  selectedGender: string;
  onCategoryChange: (category: string) => void;
  onGenderChange: (gender: string) => void;
}

export default function ProductFilter({
  selectedCategory,
  selectedGender,
  onCategoryChange,
  onGenderChange,
}: ProductFilterProps) {
  const categories = [
    { value: "all", label: "All" },
    { value: "casual", label: "Casual" },
    { value: "formal", label: "Formal" },
    { value: "active", label: "Active" },
  ];

  const genders = [
    { value: "all", label: "All" },
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
  ];

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Category Filter */}
      <div className="flex flex-wrap gap-1 bg-secondary rounded-lg p-1">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange(category.value)}
            className={cn(
              "rounded-md transition-all duration-200",
              selectedCategory === category.value
                ? "bg-background shadow-sm text-primary font-medium"
                : "text-neutral hover:text-primary"
            )}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="flex flex-wrap gap-1 bg-secondary rounded-lg p-1">
        {genders.map((gender) => (
          <Button
            key={gender.value}
            variant="ghost"
            size="sm"
            onClick={() => onGenderChange(gender.value)}
            className={cn(
              "rounded-md transition-all duration-200",
              selectedGender === gender.value
                ? "bg-background shadow-sm text-primary font-medium"
                : "text-neutral hover:text-primary"
            )}
          >
            {gender.label}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
