import { type Product, type InsertProduct, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<Product>): Promise<Product | undefined>;
  
  // Orders
  getOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, order: Partial<Order>): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private orders: Map<string, Order>;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Classic Formal Pants",
        description: "Premium formal pants perfect for business meetings and special occasions. Made from high-quality fabric with a tailored fit.",
        price: "89.99",
        category: "formal",
        gender: "men",
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: ["black", "navy", "charcoal"],
        imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        images: [
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
          "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
        ],
        inventory: 50,
        rating: "4.8"
      },
      {
        name: "Casual Denim Jeans",
        description: "Comfortable and stylish denim jeans for everyday wear. Features a relaxed fit and premium denim construction.",
        price: "79.99",
        category: "casual",
        gender: "women",
        sizes: ["24", "26", "28", "30", "32", "34"],
        colors: ["blue", "black", "light-blue"],
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        images: [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
        ],
        inventory: 75,
        rating: "4.6"
      },
      {
        name: "Khaki Chinos",
        description: "Versatile khaki chinos suitable for both casual and semi-formal occasions. Comfortable cotton blend with modern cut.",
        price: "69.99",
        category: "casual",
        gender: "men",
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: ["khaki", "olive", "beige"],
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        images: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
        ],
        inventory: 40,
        rating: "4.7"
      },
      {
        name: "Professional Dress Pants",
        description: "Elegant dress pants designed for professional women. Features a sophisticated cut and premium fabric blend.",
        price: "99.99",
        category: "formal",
        gender: "women",
        sizes: ["24", "26", "28", "30", "32", "34"],
        colors: ["black", "navy", "grey"],
        imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        images: [
          "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
        ],
        inventory: 35,
        rating: "4.9"
      },
      {
        name: "Dark Wash Jeans",
        description: "Premium dark wash jeans with contemporary styling. Perfect for casual outings and weekend wear.",
        price: "84.99",
        category: "casual",
        gender: "men",
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: ["dark-blue", "black"],
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        images: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
        ],
        inventory: 60,
        rating: "4.5"
      },
      {
        name: "High-Waist Leggings",
        description: "Comfortable high-waist leggings perfect for active lifestyle and casual wear. Made from premium stretch fabric.",
        price: "59.99",
        category: "active",
        gender: "women",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["black", "navy", "grey"],
        imageUrl: "https://images.unsplash.com/photo-1506629905312-d109ff5ec2db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        images: [
          "https://images.unsplash.com/photo-1506629905312-d109ff5ec2db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
        ],
        inventory: 80,
        rating: "4.4"
      },
      {
        name: "Navy Suit Pants",
        description: "Classic navy suit pants crafted from premium wool blend. Essential for formal and business attire.",
        price: "119.99",
        category: "formal",
        gender: "men",
        sizes: ["28", "30", "32", "34", "36", "38", "40"],
        colors: ["navy", "black", "charcoal"],
        imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        images: [
          "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
        ],
        inventory: 25,
        rating: "4.9"
      },
      {
        name: "Wide-Leg Trousers",
        description: "Elegant wide-leg trousers with sophisticated styling. Perfect for modern professional and formal occasions.",
        price: "94.99",
        category: "formal",
        gender: "women",
        sizes: ["24", "26", "28", "30", "32", "34"],
        colors: ["black", "beige", "navy"],
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        images: [
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
        ],
        inventory: 30,
        rating: "4.6"
      }
    ];

    sampleProducts.forEach(product => {
      const id = randomUUID();
      this.products.set(id, {
        id,
        ...product,
        inStock: true,
        inventory: product.inventory || 0,
        rating: product.rating || "5.0",
        createdAt: new Date(),
      });
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      id,
      ...insertProduct,
      inStock: true,
      inventory: insertProduct.inventory || 0,
      rating: insertProduct.rating || "5.0",
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updateData: Partial<Product>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updateData };
    this.products.set(id, updated);
    return updated;
  }

  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      id,
      customerName: insertOrder.customerName,
      customerEmail: insertOrder.customerEmail,
      customerPhone: insertOrder.customerPhone,
      shippingAddress: insertOrder.shippingAddress,
      city: insertOrder.city,
      postalCode: insertOrder.postalCode,
      items: insertOrder.items,
      total: insertOrder.total,
      status: "pending",
      telegramSent: false,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: string, updateData: Partial<Order>): Promise<Order | undefined> {
    const existing = this.orders.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updateData };
    this.orders.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
