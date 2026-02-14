import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "primeicons/primeicons.css";
import InputField from "@/components/layout/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import axios from "axios";
import {
  FaUser,
  FaCalendarAlt,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaFileDownload,
  FaInfoCircle,
  FaTruck,
  FaUndoAlt,
  FaCogs,
} from "react-icons/fa";
import { DataTable } from "@/components/layout/DataTable";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

const OrderMangement = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleProcess, setVisibleProcess] = useState(false);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [form, setForm] = useState({
  refund_reason: "",               // selected value from dropdown
  reason_text: "",                 // input
  idempotency_key: "",
  retailer_id: "",
  quantity: 1,
  amount: "",
  currency: "USD",
  subtotal: "",
  shipping: "",
  tax: "",
  total: "",
  refundcurrency: "",
refundamount: "",
});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const rawOrders = [
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
    {
      id: "ORD-1001",
      channel: "Instagram",
      order_status: { state: "CREATED" },
      created: "2026-01-08T09:00:00Z",
      buyer: {
        name: "Pankhuri Sharma",
        phone: "+91 9876543210",
        email: "pankhuri.sharma@example.com",
      },
      shipping_address: {
        name: "Pankhuri Sharma",
        street1: "101 MG Road",
        street2: "Near Metro Pillar 45",
        city: "Jaipur",
        state: "Rajasthan",
        postal_code: "302001",
        country: "India",
      },
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price_per_unit: { amount: "20.00", currency: "USD" },
          description: "Winterwear with fleece lining",
          brand: "UrbanWear",
          gtin: "9876543210",
          manufacturer_part_number: "UW-HOODIE-101",
          color: "Navy Blue",
          size: "L",
          gender: "Unisex",
          availability: "in_stock",
          inventory: 42,
          image_url:
            "https://redtape.com/cdn/shop/files/RHE0556A_1.jpg?v=1754292425",
          tax_details: {
            estimated_tax: { amount: "0.30", currency: "USD" },
            captured_tax: { total_tax: { amount: "0.30", currency: "USD" } },
          },
        },
      ],
    },
  ];

  const order = {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Home_made_sour_dough_bread.jpg/640px-Home_made_sour_dough_bread.jpg",
    body: "Thanks for your order! Please review and pay to proceed.",
    footer: "Order will expire in 2 hours.",
    retailer_id: "1234567",
    item_name: "Sourdough Bread",
    original_price: 1500,
    sale_price: 1000,
    subtotal: 1000,
    tax: 100,
    shipping: 100,
    discount: 100,
    total: 1100,
  };


  const rows = rawOrders.map((order, index) => {
    const itemCount = order.items.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = order.items.reduce(
      (acc, item) =>
        acc + item.quantity * parseFloat(item.price_per_unit.amount),
      0
    );
    const taxAmount = order.items.reduce(
      (acc, item) =>
        acc +
        parseFloat(item.tax_details?.captured_tax?.total_tax?.amount || 0),
      0
    );

    return {
      id: index + 1,
      sn: index + 1,
      order_ID: order.id,
      buyer: order.buyer.name,
      channel: order.channel,
      status: order.order_status.state,
      items: itemCount,
      total: `$${totalAmount.toFixed(2)}`,
      action: order.id, 
    };
  });

  const columns = [
    { field: "sn", headerName: "S.No", width: 70 },
    { field: "order_ID", headerName: "Order ID", minWidth: 120, flex: 1 },
    { field: "buyer", headerName: "Buyer", minWidth: 120, flex: 1 },
    { field: "channel", headerName: "Channel", minWidth: 150, flex: 1 },
    { field: "status", headerName: "Status", minWidth: 120, flex: 1 },
    { field: "items", headerName: "Items", minWidth: 120, flex: 1 },
    { field: "total", headerName: "Total", minWidth: 120, flex: 1 },

    {
      field: "action",
      headerName: "Action",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <>
          <CustomTooltip title="View Order" placement="top" arrow>
            <IconButton
              onClick={() => {
                const clickedOrder = rawOrders.find(
                  (o) => o.id === params.row.order_ID
                );
                setSelectedOrder(clickedOrder);
                setVisible(true);
              }}
            >
              <VisibilityIcon sx={{ fontSize: "1.2rem", color: "green" }} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Process Order" placement="top" arrow>
            <IconButton
              onClick={() => {
                const clickedOrder = rawOrders.find(
                  (o) => o.id === params.row.order_ID
                );
                setSelectedOrder(clickedOrder);
                setVisibleProcess(true);
              }}
            >
              <CheckCircleIcon sx={{ fontSize: "1.2rem", color: "blue" }} />
            </IconButton>
          </CustomTooltip>

          {/* Cancel */}
          <CustomTooltip title="Cancel Order" placement="top" arrow>
            <IconButton
              onClick={() => {
                console.log("Cancelling Order:", params.row.order_ID);
                setVisibleCancel(true);
              }}
            >
              <CancelIcon sx={{ fontSize: "1.2rem", color: "red" }} />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  const getTotalAmount = (items) =>
    items.reduce(
      (acc, item) =>
        acc + item.quantity * parseFloat(item.price_per_unit.amount),
      0
    );


    const handleRefundSubmit = async () => {
  const payload = {
    order_id: selectedOrder?.id,
    idempotency_key: form.idempotency_key,
    items: [
      {
        retailer_id: form.retailer_id,
        quantity: Number(form.quantity),
        refund_subtotal: {
          amount: form.amount,
          currency: form.currency,
        }
      }
    ],
    refund_reason: {
      reason_code: form.refund_reason,
      reason_text: form.reason_text
    },
    refund_amount: {
      subtotal: form.subtotal,
      shipping: form.shipping,
      tax: form.tax,
      total: form.total,
      amount: form.amount,
      currency: form.currency
    }
  };

  try {
    const res = await axios.post("/your/api/endpoint", payload);
    console.log("Refund Success", res.data);
    setVisibleCancel(false);
  } catch (error) {
    console.error("Refund Failed", error);
  }
};

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Marketplace Orders
      </h1>

      <DataTable col={columns} rows={rows} pageSize={10} getRowHeight={null} />
      <Dialog
        header={`Order Details - ${selectedOrder?.id || ""}`}
        visible={visible}
        style={{ width: "60vw" }}
        onHide={() => setVisible(false)}
      >
        {selectedOrder && (
          <div className="space-y-4 p-4 md:p-6 text-[15px] text-gray-800">
            <div className="bg-white rounded-xl border shadow-sm p-5 space-y-4">
              <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2">
                <FaInfoCircle className="text-blue-500" /> Order Summary
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <p>
                  <strong>Order ID:</strong> {selectedOrder.id}
                </p>
                <p>
                  <strong>Channel:</strong> {selectedOrder.channel}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.order_status.state}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedOrder.created).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Buyer Info */}
              <div className="bg-white rounded-xl border p-5 shadow-sm space-y-2">
                <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                  <FaUser className="text-blue-500" /> Buyer Details
                </h3>
                <div className="text-sm">
                  <p>
                    <strong>Name:</strong> {selectedOrder.buyer.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedOrder.buyer.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedOrder.buyer.email}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl border p-5 shadow-sm space-y-2">
                <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                  <FaTruck className="text-blue-500" /> Shipping Address
                </h3>
                <div className="text-sm">
                  {Object.entries(selectedOrder.shipping_address).map(
                    ([key, val]) => (
                      <p key={key}>
                        <strong>{key.replace(/_/g, " ")}:</strong> {val}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {selectedOrder.items.map((item, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-3 gap-6 bg-white p-5 border rounded-xl shadow-sm"
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-48 h-48 object-cover rounded-lg border"
                    />
                  </div>
                  <div className="space-y-2 text-sm">
                    <h4 className="text-blue-800 font-semibold text-lg">
                      {item.name}
                    </h4>
                    <p className=" text-gray-700">{item.description}</p>
                    <p>
                      <strong>Brand:</strong> {item.brand}
                    </p>
                    <p>
                      <strong>Color:</strong> {item.color}
                    </p>
                    <p>
                      <strong>Size:</strong> {item.size}
                    </p>
                    <p>
                      <strong>Gender:</strong> {item.gender}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <h4 className="text-blue-800 font-semibold flex items-center gap-2">
                      <FaCogs /> Specs
                    </h4>
                    <p>
                      <strong>Qty:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Unit Price:</strong> ${item.price_per_unit.amount}
                    </p>
                    <p>
                      <strong>GTIN:</strong> {item.gtin}
                    </p>
                    <p>
                      <strong>MPN:</strong> {item.manufacturer_part_number}
                    </p>
                    <p>
                      <strong>Availability:</strong> {item.availability}
                    </p>
                    <p>
                      <strong>Tax:</strong> $
                      {item.tax_details?.captured_tax?.total_tax?.amount ||
                        "0.00"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right pt-4 border-t mt-6">
              <span className="text-lg font-semibold text-gray-700">
                Total:
              </span>{" "}
              <span className="text-xl font-bold text-green-700">
                <FaRupeeSign className="inline-block mr-1" />
                {getTotalAmount(selectedOrder.items).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </Dialog>

      <Dialog
        header={`Process Order - ${selectedOrder?.id || ""}`}
        visible={visibleProcess}
        onHide={() => setVisibleProcess(false)}
        className="p-fluid"
      >
        <div className="max-w-md mx-auto border rounded-lg shadow-lg overflow-hidden bg-white">
          <img
            src={order.image}
            alt="Product"
            className="w-full h-48 object-cover"
          />
          <div className="p-4 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">
              🧾 Order Summary
            </h2>
            <p className="text-sm text-gray-600">{order.body}</p>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  {order.item_name}
                </span>
                <span className="text-green-600 font-semibold">
                  ₹{(order.sale_price / 100).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                MRP ₹{(order.original_price / 100).toFixed(2)} • Retailer ID:{" "}
                {order.retailer_id}
              </p>
            </div>
            <div className="border-t pt-3 space-y-1 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{(order.subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{(order.tax / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{(order.shipping / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Discount</span>
                <span>-₹{(order.discount / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total Payable</span>
                <span>₹{(order.total / 100).toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 border-t pt-2">
              {order.footer}
            </p>
            <button className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
              Review & Pay
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog
        header={`Cancel Order ${selectedOrder?.id || ""}`}
        visible={visibleCancel}
        onHide={() => setVisibleCancel(false)}
        className="p-fluid"
      >
         <div className="space-y-6 p-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      <div className="flex  gap-2">

      <InputField
        label="Refund Amount"
        name="amount"
        type="text"
        value={form.amount}
        onChange={handleChange}
        placeholder="e.g. 12.02"
      />
      <InputField
        label="Currency"
        name="currency"
        type="text"
        value={form.currency}
        onChange={handleChange}
        placeholder="e.g. USD"
      />
      </div>
      <InputField
        label="Refund Quantity"
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        placeholder="e.g. 1"
      />
      <AnimatedDropdown
        label="Refund Reason"
        name="refund_reason"
        value={form.refund_reason}
        onChange={handleChange}
        placeholder="Select Refund Reason"
        options={[
          { label: "BUYERS REMORSE", value: "BUYERS_REMORSE" },
          { label: "DAMAGED GOODS", value: "DAMAGED_GOODS" },
          { label: "NOT AS DESCRIBED", value: "NOT_AS_DESCRIBED" },
          { label: "QUALITY ISSUE", value: "QUALITY_ISSUE" },
          { label: "REFUND REASON OTHER", value: "REFUND_REASON_OTHER" },
          { label: "WRONG ITEM", value: "WRONG_ITEM" },
          { label: "FACEBOOK INITIATED", value: "FACEBOOK_INITIATED" },
        ]}
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <InputField
        label="Subtotal"
        name="subtotal"
        type="text"
        value={form.subtotal}
        onChange={handleChange}
        placeholder="e.g. 1.00"
      />
      <InputField
        label="Shipping"
        name="shipping"
        type="text"
        value={form.shipping}
        onChange={handleChange}
        placeholder="e.g. 10.00"
      />
      <InputField
        label="Tax"
        name="tax"
        type="text"
        value={form.tax}
        onChange={handleChange}
        placeholder="e.g. -1.02"
      />
      <InputField
        label="Total"
        name="total"
        type="text"
        value={form.total}
        onChange={handleChange}
        placeholder="e.g. 12.02"
      />
      <InputField
        label="Refund Total Amount"
        name="amount"
        type="text"
        value={form.refundamount}
        onChange={handleChange}
        placeholder="e.g. 12.02"
      />
      <InputField
        label="Refund Currency"
        name="currency"
        type="text"
        value={form.refundcurrency}
        onChange={handleChange}
        placeholder="e.g. USD"
      />
    </div>
    <div className="flex justify-center mt-4">
      <UniversalButton label="Submit Refund" onClick={handleRefundSubmit} />
    </div>
  </div>
      </Dialog>
    </div>
  );
};

export default OrderMangement;
