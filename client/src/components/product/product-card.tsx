import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
      imageUrl: product.imageUrl,
    });

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden rounded-xl bg-gray-50">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            ${product.price}
          </div>

          {/* Stock Badge */}
          {!product.inStock && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </div>
          )}

          {/* Add to Cart Button */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ y: 20 }}
            whileHover={{ y: 0 }}
          >
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </motion.div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg group-hover:text-accent transition-colors duration-200">
              {product.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-neutral">{product.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="capitalize text-xs">
              {product.category}
            </Badge>
            <Badge variant="outline" className="capitalize text-xs">
              {product.gender}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-accent">${product.price}</span>
            <span className="text-sm text-neutral">
              {product.inventory} in stock
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
