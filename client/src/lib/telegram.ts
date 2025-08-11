interface TelegramMessage {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
  }>;
  total: string;
  orderDate: string;
}

export async function sendTelegramNotification(orderData: TelegramMessage) {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "8221818796:AAHuC6RplH24gStNeEarpeAszdyYOyiUmaY";
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || "5983253591";

  const itemsList = orderData.items
    .map(
      (item) =>
        `• ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}${
          item.size ? ` • Size: ${item.size}` : ""
        }${item.color ? ` • Color: ${item.color}` : ""}`
    )
    .join("\n");

  const message = `
🛍️ *NEW ORDER RECEIVED*

*Order ID:* ${orderData.orderId}
*Customer:* ${orderData.customerName}
*Email:* ${orderData.customerEmail}
*Phone:* ${orderData.customerPhone}

*Shipping Address:*
${orderData.shippingAddress}
${orderData.city}, ${orderData.postalCode}

*Items:*
${itemsList}

*Total:* $${orderData.total}

*Order Date:* ${new Date(orderData.orderDate).toLocaleString()}
`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
    throw error;
  }
}
