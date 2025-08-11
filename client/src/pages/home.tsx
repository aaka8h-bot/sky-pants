import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/product/product-card";
import FloatingCart from "@/components/cart/floating-cart";
import CartSidebar from "@/components/cart/cart-sidebar";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Truck, Award, RotateCcw } from "lucide-react";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary relative overflow-hidden">
        <div className="absolute inset-0 gradient-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Premium<br/>
              <span className="text-accent">Pants</span><br/>
              Collection
            </h1>
            <p className="text-xl text-neutral leading-relaxed">
              Discover our curated selection of high-quality pants designed for the modern lifestyle. 
              From casual to formal, find your perfect fit.
            </p>
            <div className="flex space-x-4">
              <Link href="/products">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all duration-300">
                  Shop Now
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  View Collection
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
              alt="Premium pants collection hero image" 
              className="w-full h-auto rounded-2xl shadow-2xl animate-float" 
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Featured Collection</h2>
            <p className="text-neutral text-lg">Handpicked styles for every occasion</p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-80 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/products">
              <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                View All Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose SKY Pants?</h2>
            <p className="text-neutral text-lg">Premium quality meets modern design</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Fast Shipping",
                description: "Free shipping on orders over $75. Get your pants delivered within 2-3 business days."
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "Made from the finest materials with attention to every detail and craftsmanship."
              },
              {
                icon: RotateCcw,
                title: "Easy Returns",
                description: "30-day return policy. If you're not satisfied, we'll make it right."
              }
            ].map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-neutral">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FloatingCart />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </div>
  );
}
