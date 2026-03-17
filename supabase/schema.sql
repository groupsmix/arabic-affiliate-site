-- Arabic Affiliate Site - Database Schema
-- Run this in your Supabase SQL Editor to set up the tables.

-- Categories
CREATE TABLE categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Content
CREATE TABLE content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  body text DEFAULT '',
  excerpt text DEFAULT '',
  type text NOT NULL DEFAULT 'article' CHECK (type IN ('article', 'review', 'comparison', 'guide')),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text DEFAULT '',
  affiliate_url text DEFAULT '',
  image_url text DEFAULT '',
  price text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Content-Products junction table
CREATE TABLE content_products (
  content_id uuid REFERENCES content(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, product_id)
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_products ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read published content" ON content FOR SELECT USING (status = 'published');
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read content_products" ON content_products FOR SELECT USING (true);

-- Indexes for performance
CREATE INDEX idx_content_status ON content(status);
CREATE INDEX idx_content_category ON content(category_id);
CREATE INDEX idx_content_slug ON content(slug);
CREATE INDEX idx_categories_slug ON categories(slug);
