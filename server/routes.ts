import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8221818796:AAHuC6RplH24gStNeEarpeAszdyYOyiUmaY";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "5983253591";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Get products by category
  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Create order
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      
      // Send Telegram notification
      try {
        await sendTelegramNotification(order);
        await storage.updateOrder(order.id, { telegramSent: true });
      } catch (telegramError) {
        console.error("Failed to send Telegram notification:", telegramError);
        // Don't fail the order creation if Telegram fails
      }
      
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create order" });
      }
    }
  });

  // Get all orders
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Get single order
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function sendTelegramNotification(order: any) {
  const items = JSON.parse(order.items);
  const itemsList = items.map((item: any) => 
    `• ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}`
  ).join('\n');

  const message = `
🛍️ *NEW ORDER RECEIVED*

*Order ID:* ${order.id}
*Customer:* ${order.customerName}
*Email:* ${order.customerEmail}
*Phone:* ${order.customerPhone}

*Shipping Address:*
${order.shippingAddress}
${order.city}, ${order.postalCode}

*Items:*
${itemsList}

*Total:* $${order.total}

*Order Date:* ${new Date(order.createdAt).toLocaleString()}
`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram API error: ${response.statusText}`);
  }

  return response.json();
}
