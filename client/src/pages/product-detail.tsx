import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FloatingCart from "@/components/cart/floating-cart";
import CartSidebar from "@/components/cart/cart-sidebar";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetail() {
  const { id } = useParams() as { id: string };
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", id],
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      size: selectedSize,
      color: selectedColor || product.colors[0],
      imageUrl: product.imageUrl,
    });

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <Skeleton className="h-96 w-full rounded-xl" />
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Product not found</h1>
              <Link href="/products">
                <Button>Back to Products</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <motion.div 
            className="flex items-center space-x-2 mb-8 text-sm text-neutral"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/products" className="hover:text-primary transition-colors duration-200 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-xl bg-gray-50">
                <img
                  src={product.images[selectedImage] || product.imageUrl}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative overflow-hidden rounded-lg bg-gray-50 border-2 transition-colors duration-200 ${
                        selectedImage === index ? "border-accent" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="secondary" className="capitalize">
                    {product.category}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {product.gender}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(parseFloat(product.rating || "5.0"))
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral">({product.rating})</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-accent">
                ${product.price}
              </div>

              <p className="text-neutral leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Color Selection */}
              {product.colors.length > 1 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">Color</label>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm capitalize transition-colors duration-200 ${
                          selectedColor === color
                            ? "border-accent bg-accent text-white"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm text-neutral">
                  {product.inStock ? `In Stock (${product.inventory} available)` : "Out of Stock"}
                </span>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-accent hover:bg-accent/90 text-white py-6 text-lg font-semibold"
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>

              {/* Features */}
              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center space-x-3 text-sm text-neutral">
                  <Truck className="h-5 w-5" />
                  <span>Free shipping on orders over $75</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-neutral">
                  <RotateCcw className="h-5 w-5" />
                  <span>30-day easy returns</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-neutral">
                  <Shield className="h-5 w-5" />
                  <span>Premium quality guarantee</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <FloatingCart />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </div>
  );
}
