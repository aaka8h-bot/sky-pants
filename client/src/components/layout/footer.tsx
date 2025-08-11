import { Link } from "wouter";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Shop",
      links: [
        { href: "/products?gender=men", label: "Men's Pants" },
        { href: "/products?gender=women", label: "Women's Pants" },
        { href: "/products?category=formal", label: "Formal Wear" },
        { href: "/products?category=casual", label: "Casual Wear" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/size-guide", label: "Size Guide" },
        { href: "/returns", label: "Returns" },
        { href: "/shipping", label: "Shipping Info" },
        { href: "/contact", label: "Contact Us" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/careers", label: "Careers" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
      ],
    },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: Twitter, label: "Twitter" },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-3xl font-bold mb-4">
              SKY<span className="text-accent">Pants</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Premium quality pants for the modern lifestyle. Discover comfort and style in every piece.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-md">
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe for exclusive offers and new arrivals.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
              />
              <Button className="bg-accent hover:bg-accent/90">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-700 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-300">
            &copy; {currentYear} SKY Pants. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
