import { ElementType } from "react";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export interface PricingPlan {
  name: string;
  price: number | null;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  stars: number;
}

export interface Feature {
  icon: ElementType;
  title: string;
  desc: string;
  color: string;
}

export interface FAQItem {
  q: string;
  a: string;
}