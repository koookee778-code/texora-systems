export type Language = 'ar' | 'en';

export interface NavItem {
  id: string;
  labelAr: string;
  labelEn: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  featuresAr: string[];
  featuresEn: string[];
  icon: string;
  badgeAr: string;
  badgeEn: string;
  color: string;
}

export interface ProjectItem {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'web' | 'pharma' | 'edu' | 'pos' | 'ai';
  categoryLabelAr: string;
  categoryLabelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  metricsAr: string;
  metricsEn: string;
  tags: string[];
  image: string;
  gradient: string;
}

export interface POSProduct {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  price: number;
  barcode: string;
  stock: number;
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
