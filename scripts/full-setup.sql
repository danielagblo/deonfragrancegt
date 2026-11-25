-- Dion Fragrance full database setup
-- Creates all app tables and seeds collections, products, variants, notes, FAQs, blog posts, and homepage settings.
-- Intended for a fresh database. Re-running overwrites rows with the same IDs/slugs.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `collections` (
        `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `slug` varchar(255) NOT NULL,
        `subtitle` varchar(255) DEFAULT NULL,
        `description` text,
        `image_url` longtext,
        `badge` varchar(100) DEFAULT NULL,
        `featured` tinyint(1) DEFAULT '0',
        `sort_order` bigint(20) DEFAULT '0',
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `idx_collections_slug` (`slug`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `products` (
        `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        `collection_id` bigint(20) unsigned DEFAULT NULL,
        `name` varchar(255) NOT NULL,
        `slug` varchar(255) NOT NULL,
        `subtitle` varchar(255) DEFAULT NULL,
        `description` text,
        `concentration` varchar(100) NOT NULL,
        `scent_family` varchar(100) NOT NULL,
        `gender` varchar(50) DEFAULT 'Unisex',
        `sillage` varchar(100) DEFAULT 'Strong',
        `longevity` varchar(100) DEFAULT '12+ Hours',
        `price` decimal(10,2) NOT NULL,
        `compare_at_price` decimal(10,2) DEFAULT NULL,
        `image_url` longtext,
        `hover_image_url` longtext,
        `rating` decimal(3,2) DEFAULT '5.00',
        `review_count` bigint(20) DEFAULT '0',
        `is_best_seller` tinyint(1) DEFAULT '0',
        `is_new` tinyint(1) DEFAULT '0',
        `coming_soon` tinyint(1) NOT NULL DEFAULT '0',
        `show_in_hero` tinyint(1) NOT NULL DEFAULT '1',
        `highlight_one` varchar(160) NOT NULL DEFAULT 'Authentic Aged Oud',
        `highlight_two` varchar(160) NOT NULL DEFAULT 'Paystack Secured',
        `highlight_three` varchar(160) NOT NULL DEFAULT '100% Pure Perfume Oil',
        `in_stock` tinyint(1) DEFAULT '1',
        `stock_quantity` int(11) NOT NULL DEFAULT '50',
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `idx_products_slug` (`slug`),
        KEY `idx_products_collection_id` (`collection_id`),
        CONSTRAINT `fk_collections_products` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `product_variants` (
        `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        `product_id` bigint(20) unsigned NOT NULL,
        `size` varchar(50) NOT NULL,
        `price` decimal(10,2) NOT NULL,
        `in_stock` tinyint(1) DEFAULT '1',
        `stock_quantity` int(11) NOT NULL DEFAULT '50',
        PRIMARY KEY (`id`),
        KEY `idx_product_variants_product_id` (`product_id`),
        CONSTRAINT `fk_products_variants` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `fragrance_notes` (
        `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        `product_id` bigint(20) unsigned NOT NULL,
        `layer` varchar(50) NOT NULL,
        `note_name` varchar(100) NOT NULL,
        `description` varchar(255) DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `idx_fragrance_notes_product_id` (`product_id`),
        CONSTRAINT `fk_products_notes` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `reviews` (
        `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        `product_id` bigint(20) unsigned NOT NULL,
        `author_name` varchar(100) NOT NULL,
        `rating` bigint(20) NOT NULL,
        `title` varchar(255) DEFAULT NULL,
        `comment` text,
        `verified_purchase` tinyint(1) DEFAULT '1',
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        KEY `idx_reviews_product_id` (`product_id`),
        CONSTRAINT `fk_products_reviews` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `orders` (
        `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        `reference` varchar(100) NOT NULL,
        `paystack_ref` varchar(100) DEFAULT NULL,
        `customer_name` varchar(255) NOT NULL,
        `customer_email` varchar(255) NOT NULL,
        `customer_phone` varchar(50) DEFAULT NULL,
        `shipping_street` varchar(255) DEFAULT NULL,
        `shipping_city` varchar(100) DEFAULT NULL,
        `shipping_state` varchar(100) DEFAULT NULL,
        `shipping_zip` varchar(50) DEFAULT NULL,
        `shipping_country` varchar(100) DEFAULT 'Ghana',
        `total_amount` decimal(10,2) NOT NULL,
        `currency` varchar(10) DEFAULT 'GHS',
        `status` varchar(50) DEFAULT 'pending',
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `idx_orders_reference` (`reference`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `order_items` (
        `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        `order_id` bigint(20) unsigned NOT NULL,
        `product_id` bigint(20) unsigned NOT NULL,
        `product_name` varchar(255) NOT NULL,
        `variant_size` varchar(50) NOT NULL,
        `quantity` bigint(20) NOT NULL,
        `unit_price` decimal(10,2) NOT NULL,
        `image_url` longtext,
        PRIMARY KEY (`id`),
        KEY `idx_order_items_order_id` (`order_id`),
        CONSTRAINT `fk_orders_items` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `blog_posts` (
        `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `slug` varchar(255) NOT NULL,
        `excerpt` text,
        `content` text,
        `image_url` longtext,
        `category` varchar(100) DEFAULT NULL,
        `read_time` varchar(50) DEFAULT NULL,
        `published` tinyint(1) DEFAULT '1',
        `sort_order` bigint(20) DEFAULT '0',
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `idx_blog_posts_slug` (`slug`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `faqs` (
        `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        `category` varchar(100) NOT NULL,
        `question` varchar(500) NOT NULL,
        `answer` text NOT NULL,
        `sort_order` bigint(20) DEFAULT '0',
        `published` tinyint(1) DEFAULT '1',
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `site_settings` (
        `setting_key` varchar(100) NOT NULL,
        `setting_value` longtext,
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`setting_key`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
        `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        `email` varchar(255) NOT NULL,
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `idx_newsletter_email` (`email`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Collections
-- ---------------------------------------------------------------------------
INSERT INTO `collections` (`id`, `name`, `slug`, `subtitle`, `description`, `image_url`, `badge`, `featured`, `sort_order`) VALUES
  (1, 'Extrait De Parfum', 'extrait-de-parfum', '30 ml luxury fragrance', 'Our complete range of extrait de parfum, crafted to feel clean, confident, and personal.', '/hero/perfume.jpg', 'Signature', 1, 1),
  (2, 'Attars & Oud Oils', 'attars-oud-oils', 'Pure perfume oils', 'Traditional attars and oud perfume oils with deep, long-lasting character.', '/hero/woods.jpg', 'Oud', 0, 2),
  (3, 'Bestsellers', 'bestsellers', 'Loved most', 'The fragrances our community reaches for again and again.', '/hero/florals.jpg', 'Popular', 1, 3),
  (4, 'New Arrivals', 'new-arrivals', 'Just added', 'The newest additions to the Dion Fragrance house.', '/hero/citrus.jpg', 'New', 1, 4)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `slug`=VALUES(`slug`), `subtitle`=VALUES(`subtitle`), `description`=VALUES(`description`), `image_url`=VALUES(`image_url`), `badge`=VALUES(`badge`), `featured`=VALUES(`featured`), `sort_order`=VALUES(`sort_order`);

-- ---------------------------------------------------------------------------
-- Products
-- ---------------------------------------------------------------------------
INSERT INTO `products` (`id`, `collection_id`, `name`, `slug`, `subtitle`, `description`, `concentration`, `scent_family`, `gender`, `sillage`, `longevity`, `price`, `image_url`, `rating`, `review_count`, `is_best_seller`, `is_new`, `coming_soon`, `show_in_hero`, `highlight_one`, `highlight_two`, `highlight_three`, `in_stock`, `stock_quantity`) VALUES
  (1, 1, 'Midnight Aura', 'midnight-aura', 'Fruity, Sweet, Warm', 'Born for the nights that turn into unforgettable stories, Midnight Aura is a daring blend of juicy fruits, vibrant spices, and addictive sweetness. It opens with a fresh, energetic burst before revealing an aromatic heart that balances playful charm with rebellious confidence. As the night deepens, creamy vanilla, warm amber, and sensual woods create a magnetic trail that lingers long after you’ve left the room.\n\nPerfect for: Nightlife, dates, parties, and making unforgettable first impressions.', 'Extrait De Parfum', 'Fruity, Sweet, Warm', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 1, 'Juicy pineapple', 'Aromatic lavender', 'Creamy vanilla', 1, 50),
  (2, 1, 'Solaris', 'solaris', 'Citrus, Fresh, Amber', 'This fragrance captures the feeling of cool citrus, sparkling spices, and sophisticated woods. Bright and invigorating at first, it develops into a smooth, refined scent that feels clean, confident, and irresistibly modern. Solaris opens with an electrifying burst of sun-ripened mandarin and bergamot, awakening the senses with crisp, radiant freshness. A vibrant heart of aromatic spices adds energy and character, while earthy vetiver grounds the fragrance in a smooth, confident finish.\n\nPerfect for: Everyday luxury, business wear, warm weather, and signature-scent lovers.', 'Extrait De Parfum', 'Citrus, Fresh, Amber', 'Unisex', 'Moderate', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 1, 'Bright citrus', 'Aromatic spices', 'Earthy woods', 1, 50),
  (3, 1, 'Velvet Oud', 'velvet-oud', 'Floral, Oud, Ambery', 'Velvet Oud is the art of seduction dressed in luxury. A delicate veil of velvety rose unfolds over the mysterious depth of precious oud, creating a fragrance that feels both tender and commanding. Warm vanilla and golden amber melt into the richness of smooth woods, leaving a sensual trail that feels like silk against the skin.\n\nPerfect for: Romantic evenings, special occasions, and those who love rich, sophisticated fragrances.', 'Extrait De Parfum', 'Floral, Oud, Ambery', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 1, 'Velvety rose', 'Precious oud', 'Golden amber', 1, 50),
  (4, 1, 'Wanted Desire', 'wanted-desire', 'Spicy, Gourmand, Ambery, Woody', 'Wanted Desire opens with the seductive spark of aromatic spice, unfolding into a rich, addictive caramel sweetness that draws people closer. Beneath its delicious warmth lies a deep amber-woody foundation, smooth and sensual, creating a confident trail that speaks of ambition, charm, and undeniable attraction.\n\nPerfect for: Romantic evenings, parties, special occasions, and making a lasting impression.', 'Extrait De Parfum', 'Spicy, Gourmand, Ambery, Woody', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 1, 'Aromatic spice', 'Caramel sweetness', 'Amber woods', 1, 50),
  (5, 1, 'Pure Elegance', 'pure-elegance', 'Fresh, Aromatic, Creamy, Woody', 'Pure Elegance is a refined, luxurious fragrance known for its clean floral character, aromatic freshness, and creamy woody warmth. It balances freshness with elegance, creating a polished scent that feels timeless, sophisticated, and effortlessly attractive.\n\nPerfect for: Office wear, daytime elegance, formal occasions, and the modern gentleman who appreciates understated luxury.', 'Extrait De Parfum', 'Fresh, Aromatic, Creamy, Woody', 'Men', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Aromatic rosemary', 'Clean neroli', 'Creamy sandalwood', 1, 50),
  (6, 1, 'Forbidden Fruit', 'forbidden-fruit', 'Fruity, Fresh, Sweet, Juicy, Clean', 'A taste of summer captured in a fragrance. Forbidden Fruit opens with the mouthwatering freshness of ripe melon, bursting with juicy sweetness and a cool, refreshing touch. Soft fruity accords blend beautifully with delicate florals, while a smooth base of musk and creamy sweetness leaves the skin smelling clean, playful, and irresistibly inviting. Fresh, fruity, and effortlessly charming, Forbidden Fruit is the perfect scent for those who love to smell delicious without being overpowering.\n\nPerfect for: Everyday wear, sunny days, casual outings, and anyone who loves refreshing fruity fragrances.', 'Extrait De Parfum', 'Fruity, Fresh, Sweet, Juicy, Clean', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Ripe melon', 'Juicy sweetness', 'Soft vanilla', 1, 50),
  (7, 1, 'King', 'king', 'Fresh, Spicy, Woody, Ambery, Masculine', 'King opens with a commanding burst of fresh citrus and vibrant spices, capturing the confidence of a man who knows exactly who he is. As the fragrance unfolds, refined aromatic notes blend with rich woods, creating a powerful balance of sophistication and masculine strength. A deep, warm base of amber, musk, and smooth woods leaves an unforgettable trail of authority and elegance. Bold in character. Royal in spirit. Unmatched in presence.\n\nPerfect for: Everyday luxury, business meetings, special occasions, and evening wear.', 'Extrait De Parfum', 'Fresh, Spicy, Woody, Ambery, Masculine', 'Men', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Fresh citrus', 'Aromatic herbs', 'Warm amber', 1, 50),
  (8, 1, 'Rosso Amore', 'rosso-amore', 'Fruity, Aquatic, Sweet, Fresh, Musky', 'A vibrant, seductive fragrance built around juicy fruits, delicious sweetness, and sensual warmth. Rosso Amore evokes the feeling of a luxurious Italian dessert on a summer evening — playful, rich, and impossible to resist.\n\nPerfect for: Sunny days, holidays, casual outings, and anyone who loves juicy, refreshing fragrances.', 'Extrait De Parfum', 'Fruity, Aquatic, Sweet, Fresh, Musky', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Juicy tangerine', 'Fresh fruit', 'Sweet praline', 1, 50),
  (9, 1, 'Juicy Apple', 'juicy-apple', 'Juicy, Fruity, Sweet, Floral, Musky', 'Juicy Apple awakens the senses with sparkling citrus, blackcurrant, and exotic lychee before unfolding into a luscious garden of wild berries, delicate rose, and intoxicating jasmine. As the sweetness settles, creamy vanilla, golden amber, sensual musk, and soft moss wrap the skin in a deliciously addictive finish.\n\nPerfect for: Everyday wear, dates, brunch, sunny afternoons, and anyone who loves irresistible fruity-floral scents.', 'Extrait De Parfum', 'Juicy, Fruity, Sweet, Floral, Musky', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Red apple', 'Wild berries', 'Creamy vanilla', 1, 50),
  (10, 1, 'Eclipse Oud', 'eclipse-oud', 'Smoky, Spicy, Resinous, Woody, Ambery', 'A flash of bergamot cuts through the darkness, sharpened by wild oregano and fiery pimento berry. Then comes the soul of the fragrance: a hypnotic cloud of smouldering incense, golden amber, and rich resins that feels ancient, mysterious, and deeply captivating. As the smoke settles, dark oud, supple leather, patchouli, and creamy sandalwood emerge, creating a powerful, textured trail that feels bold, commanding, and almost untouchable.\n\nPerfect for: Evening wear, special occasions, cooler weather, and those who appreciate bold niche perfumery.', 'Extrait De Parfum', 'Smoky, Spicy, Resinous, Woody, Ambery', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Bright bergamot', 'Smouldering incense', 'Creamy sandalwood', 1, 50),
  (11, 1, 'Royale Oud', 'royale-oud', 'Resinous, Honeyed, Woody, Warm, Oriental', 'The fragrance opens with the sacred, resinous character of frankincense, evoking the warmth of traditional Arabian perfumery. Golden honey then flows through the heart, softening the smoky resin with a rich, seductive sweetness. Finally, deep agarwood emerges, leaving a dark, woody signature that feels regal, mysterious, and timeless.\n\nPerfect for: Evening wear, special occasions, cultural gatherings, and lovers of rich Arabian fragrances.', 'Extrait De Parfum', 'Resinous, Honeyed, Woody, Warm, Oriental', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Sacred frankincense', 'Golden honey', 'Precious oud', 1, 50),
  (12, 1, 'Obsidian Kiss', 'obsidian-kiss', 'Almond, Sweet, Floral, Creamy, Sensual', 'Obsidian Kiss opens with the mysterious allure of bitter almond, drawing you into a velvety heart of intoxicating white florals. Beneath this seductive layer, creamy vanilla and sensual woods melt together, creating a warm, addictive finish that feels intimate, elegant, and dangerously irresistible.\n\nPerfect for: Romantic evenings, special occasions, and lovers of rich, seductive gourmand fragrances.', 'Extrait De Parfum', 'Almond, Sweet, Floral, Creamy, Sensual', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Bitter almond', 'White florals', 'Creamy vanilla', 1, 50),
  (13, 1, 'Golden Nectar', 'golden-nectar', 'Sweet, Floral, Fresh, Musky, Playful', 'A playful sweetness wrapped in effortless sensuality. Golden Nectar opens with sparkling grapefruit and delicate honeysuckle, creating a bright, flirtatious first impression. A soft heart of water lily and freesia adds an airy floral elegance, while a delicious blend of sweet sugar and intimate skin musk leaves a smooth, addictive finish.\n\nPerfect for: Everyday wear, dates, brunch, and anyone who loves soft, sweet fragrances.', 'Extrait De Parfum', 'Sweet, Floral, Fresh, Musky, Playful', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Sparkling grapefruit', 'Airy florals', 'Skin musk', 1, 50),
  (14, 1, 'Nomade', 'nomade', 'Smoky, Oud, Fruity, Leathery, Resinous', 'Nomade is a journey into the untamed beauty of precious oud. A seductive touch of raspberry cuts through the darkness, creating a striking contrast between fruity sweetness and deep, smoky woods. As the fragrance unfolds, mysterious incense and rich benzoin rise like smoke over desert sands, wrapping the senses in warmth, leather, and resinous depth. Its powerful, lingering character is made for those who don’t simply enter a room — they transform its atmosphere.\n\nPerfect for: Evening wear, special occasions, cooler nights, and lovers of bold Arabian-inspired luxury.', 'Extrait De Parfum', 'Smoky, Oud, Fruity, Leathery, Resinous', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Seductive raspberry', 'Smoky oud', 'Leather and resin', 1, 50),
  (15, 1, 'Amber Veil', 'amber-veil', 'Woody, Airy, Sweet, Sophisticated', 'Amber Veil surrounds you with a luminous blend of airy sweetness, delicate florals, and warm amber woods. It opens with a radiant, almost crystalline freshness before unfolding into an elegant heart of jasmine and saffron. As the fragrance settles, ambergris-like accords, cedarwood, and a subtle sugary warmth create a sophisticated, addictive trail that feels both weightless and powerful.\n\nPerfect for: Special occasions, evening wear, luxury everyday styling, and those who want a distinctive signature scent.', 'Extrait De Parfum', 'Woody, Airy, Sweet, Sophisticated', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Saffron and jasmine', 'Amber woods', 'Cedarwood', 1, 50),
  (16, 1, 'Coco Bliss', 'coco-bliss', 'Tropical, Creamy, Sweet, Warm, Sensual', 'Coco Bliss wraps you in a delicious blend of tropical coconut and velvety vanilla, creating a soft, comforting sweetness that feels warm, playful, and effortlessly sensual. Its creamy finish melts beautifully into the skin, leaving behind the inviting impression of a sun-kissed paradise.\n\nPerfect for: Everyday wear, holidays, sunny afternoons, and anyone who loves soft tropical fragrances.', 'Extrait De Parfum', 'Tropical, Creamy, Sweet, Warm, Sensual', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Tropical coconut', 'Velvety vanilla', 'Warm musk', 1, 50),
  (17, 1, 'Imperial Elixir', 'imperial-elixir', 'Spicy, Aromatic, Woody, Warm, Powerful', 'Imperial Elixir ignites the senses with a fierce burst of grapefruit and commanding spices, setting the stage for a rich heart of aromatic lavender. Beneath this bold opening lies a darker world of warm amber, smooth sandalwood, earthy vetiver, and seductive patchouli, creating a powerful signature that feels refined, intense, and undeniably masculine.\n\nPerfect for: Evening wear, special occasions, cooler nights, and men who appreciate bold, sophisticated fragrances.', 'Extrait De Parfum', 'Spicy, Aromatic, Woody, Warm, Powerful', 'Men', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Spiced grapefruit', 'Aromatic lavender', 'Sandalwood and vetiver', 1, 50),
  (18, 1, 'Paradiso Gold', 'paradiso-gold', 'Fruity, Citrus, Sweet, Musky, Ambery', 'Imagine a burst of sun-ripened citrus dissolving into a vibrant basket of exotic fruits. Paradiso Gold is bright, juicy, and irresistibly smooth, wrapping the senses in a luxurious cloud of fruity sweetness. As the fragrance unfolds, its sparkling citrus opening gives way to a rich medley of ripe fruits, creating an alluring, almost addictive character. Finally, golden amber, creamy Madagascar vanilla, and soft white musk melt together into a velvety finish that feels warm, sensual, and beautifully refined.\n\nPerfect for: Daytime luxury, evening outings, special occasions, and anyone who loves vibrant, attention-grabbing fruity fragrances.', 'Extrait De Parfum', 'Fruity, Citrus, Sweet, Musky, Ambery', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Sun-ripened citrus', 'Ripe fruit', 'Madagascar vanilla', 1, 50),
  (19, 1, 'Golden Aura', 'golden-aura', 'Musky, Warm, Sweet, Powdery, Elegant', 'Golden Aura is a luxurious, smooth and captivating fragrance that wraps your skin in a warm golden aura. Its soft musky character blends beautifully with sweet amber and creamy warmth, creating an elegant scent that feels clean, sensual and effortlessly sophisticated. A fragrance for those who appreciate quiet luxury, lasting impressions and the beauty of simplicity.\n\nPerfect for: Everyday luxury, special occasions and anyone who loves a smooth, sensual scent.', 'Extrait De Parfum', 'Musky, Warm, Sweet, Powdery, Elegant', 'Unisex', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Soft musk', 'Golden amber', 'Creamy vanilla', 1, 50),
  (20, 1, 'Seductive Bloom', 'seductive-bloom', 'Fruity, Sweet, Fresh, Flirty, Sensual', 'Seductive Bloom is a deliciously sweet and captivating fragrance that awakens the senses. Bursting with juicy fruits and playful sweetness, it melts into a soft, sensual finish that feels feminine, confident and irresistibly attractive.\n\nPerfect for: Everyday wear, dates, outings and anyone who loves sweet, attention-grabbing fragrances.', 'Extrait De Parfum', 'Fruity, Sweet, Fresh, Flirty, Sensual', 'Women', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Red plum', 'Sweet florals', 'Soft musk', 1, 50),
  (21, 1, 'Velvet Temptation', 'velvet-temptation', 'Sweet, Floral, Warm, Creamy, Seductive', 'Velvet Temptation is a captivating fragrance that celebrates the duality of a woman — sweet yet daring, elegant yet rebellious. It opens with a sparkling touch of almond and coffee before unfolding into a beautiful floral heart. As it settles, creamy tonka bean, warm cocoa and rich woods create a sensual trail that commands attention.\n\nPerfect for: Romantic evenings, special occasions, nights out and making a lasting impression.', 'Extrait De Parfum', 'Sweet, Floral, Warm, Creamy, Seductive', 'Women', 'Strong', 'Long lasting', 350.00, '/dion-fragrance.jpg', 5.00, 0, 0, 1, 0, 0, 'Almond and coffee', 'White florals', 'Cocoa and vanilla', 1, 50)
ON DUPLICATE KEY UPDATE `collection_id`=VALUES(`collection_id`), `name`=VALUES(`name`), `slug`=VALUES(`slug`), `subtitle`=VALUES(`subtitle`), `description`=VALUES(`description`), `concentration`=VALUES(`concentration`), `scent_family`=VALUES(`scent_family`), `gender`=VALUES(`gender`), `sillage`=VALUES(`sillage`), `longevity`=VALUES(`longevity`), `price`=VALUES(`price`), `image_url`=VALUES(`image_url`), `rating`=VALUES(`rating`), `review_count`=VALUES(`review_count`), `is_best_seller`=VALUES(`is_best_seller`), `is_new`=VALUES(`is_new`), `coming_soon`=VALUES(`coming_soon`), `show_in_hero`=VALUES(`show_in_hero`), `highlight_one`=VALUES(`highlight_one`), `highlight_two`=VALUES(`highlight_two`), `highlight_three`=VALUES(`highlight_three`), `in_stock`=VALUES(`in_stock`), `stock_quantity`=VALUES(`stock_quantity`);

-- ---------------------------------------------------------------------------
-- Product variants (30 ml, GH₵350)
-- ---------------------------------------------------------------------------
INSERT INTO `product_variants` (`id`, `product_id`, `size`, `price`, `in_stock`, `stock_quantity`) VALUES
  (1, 1, '30ml', 350.00, 1, 50),
  (2, 2, '30ml', 350.00, 1, 50),
  (3, 3, '30ml', 350.00, 1, 50),
  (4, 4, '30ml', 350.00, 1, 50),
  (5, 5, '30ml', 350.00, 1, 50),
  (6, 6, '30ml', 350.00, 1, 50),
  (7, 7, '30ml', 350.00, 1, 50),
  (8, 8, '30ml', 350.00, 1, 50),
  (9, 9, '30ml', 350.00, 1, 50),
  (10, 10, '30ml', 350.00, 1, 50),
  (11, 11, '30ml', 350.00, 1, 50),
  (12, 12, '30ml', 350.00, 1, 50),
  (13, 13, '30ml', 350.00, 1, 50),
  (14, 14, '30ml', 350.00, 1, 50),
  (15, 15, '30ml', 350.00, 1, 50),
  (16, 16, '30ml', 350.00, 1, 50),
  (17, 17, '30ml', 350.00, 1, 50),
  (18, 18, '30ml', 350.00, 1, 50),
  (19, 19, '30ml', 350.00, 1, 50),
  (20, 20, '30ml', 350.00, 1, 50),
  (21, 21, '30ml', 350.00, 1, 50)
ON DUPLICATE KEY UPDATE `id`=VALUES(`id`);

-- ---------------------------------------------------------------------------
-- Fragrance notes
-- ---------------------------------------------------------------------------
INSERT INTO `fragrance_notes` (`id`, `product_id`, `layer`, `note_name`, `description`) VALUES
  (1, 1, 'top', 'Pineapple', 'A fresh, energetic burst of juicy fruit'),
  (2, 1, 'heart', 'Lavender', 'Playful charm with rebellious confidence'),
  (3, 1, 'base', 'Vanilla', 'Creamy sweetness, warm amber, and sensual woods'),
  (4, 2, 'top', 'Bergamot', 'Sun-ripened mandarin and crisp, radiant freshness'),
  (5, 2, 'heart', 'Cardamom', 'Sparkling spices with energy and character'),
  (6, 2, 'base', 'Earthy Woods', 'Earthy vetiver in a smooth, confident finish'),
  (7, 3, 'top', 'Bulgarian Rose', ''),
  (8, 3, 'heart', 'Oud', ''),
  (9, 3, 'base', 'Amber', ''),
  (10, 4, 'top', 'Cardamom', ''),
  (11, 4, 'heart', 'Sweet Gourmand Accords', ''),
  (12, 4, 'base', 'Amberwood, Warm Woods', ''),
  (13, 5, 'top', 'Rosemary', ''),
  (14, 5, 'heart', 'Neroli', ''),
  (15, 5, 'base', 'Sandalwood', ''),
  (16, 6, 'top', 'Juicy Melon', ''),
  (17, 6, 'heart', 'Honeydew Melon', ''),
  (18, 6, 'base', 'Soft Vanilla', ''),
  (19, 7, 'top', 'Bergamot, Black Pepper', ''),
  (20, 7, 'heart', 'Lavender, Aromatic Herbs, Geranium', ''),
  (21, 7, 'base', 'Amber, Cedarwood, Patchouli, Musk', ''),
  (22, 8, 'top', 'Tangerine', ''),
  (23, 8, 'heart', 'Watermelon, Strawberry, Apple', ''),
  (24, 8, 'base', 'Praline, Musk, Amber', ''),
  (25, 9, 'top', 'Red Apple', ''),
  (26, 9, 'heart', 'Raspberry Blossom', ''),
  (27, 9, 'base', 'Vanilla Flower', ''),
  (28, 10, 'top', 'Bergamot', ''),
  (29, 10, 'heart', 'Frankincense', ''),
  (30, 10, 'base', 'Sandalwood', ''),
  (31, 11, 'top', 'Frankincense (Luban)', ''),
  (32, 11, 'heart', 'Golden Honey', ''),
  (33, 11, 'base', 'Precious Oud (Agarwood)', ''),
  (34, 12, 'top', 'Bitter Almond, Caraway', ''),
  (35, 12, 'heart', 'Jasmine Sambac, Mysterious Floral Accords', ''),
  (36, 12, 'base', 'Vanilla, Musk, Sandalwood', ''),
  (37, 13, 'top', 'Honeysuckle, Grapefruit', ''),
  (38, 13, 'heart', 'Water Lily, Freesia', ''),
  (39, 13, 'base', 'Sweet Sugar, Skin Musk', ''),
  (40, 14, 'top', 'Raspberry, Dark Fruity Accords', ''),
  (41, 14, 'heart', 'Smoky Incense, Rich Oud', ''),
  (42, 14, 'base', 'Benzoin, Leather, Deep Woody Accords', ''),
  (43, 15, 'top', 'Saffron, Jasmine', ''),
  (44, 15, 'heart', 'Amberwood, Ambergris Accord', ''),
  (45, 15, 'base', 'Cedarwood, Resinous Sweetness, Mineral Woods', ''),
  (46, 16, 'top', 'Tropical Coconut', ''),
  (47, 16, 'heart', 'Creamy Vanilla, Soft Floral Accords', ''),
  (48, 16, 'base', 'Warm Musk, Smooth Sweetness', ''),
  (49, 17, 'top', 'Grapefruit, Cinnamon, Nutmeg, Cardamom', ''),
  (50, 17, 'heart', 'Lavender', ''),
  (51, 17, 'base', 'Amber, Licorice, Sandalwood, Patchouli, Haitian Vetiver', ''),
  (52, 18, 'top', 'Sicilian Orange, Lemon, Calabrian Bergamot', ''),
  (53, 18, 'heart', 'Mediterranean Fruit Accord', ''),
  (54, 18, 'base', 'Amber, Madagascar Vanilla, White Musk', ''),
  (55, 19, 'top', 'Soft Musk, Delicate Citrus', ''),
  (56, 19, 'heart', 'Golden Amber, Floral Accords', ''),
  (57, 19, 'base', 'White Musk, Creamy Vanilla, Warm Woods', ''),
  (58, 20, 'top', 'Red Plum, Crushed Berries', ''),
  (59, 20, 'heart', 'Sweet Florals, Fresh Fruity Accords', ''),
  (60, 20, 'base', 'Soft Musk, Warm Woods', ''),
  (61, 21, 'top', 'Almond, Coffee', ''),
  (62, 21, 'heart', 'Jasmine Sambac, Tuberose', ''),
  (63, 21, 'base', 'Tonka Bean, Cocoa, Vanilla, Warm Woods', '')
ON DUPLICATE KEY UPDATE `id`=VALUES(`id`);

-- ---------------------------------------------------------------------------
-- FAQs
-- ---------------------------------------------------------------------------
INSERT INTO `faqs` (`id`, `category`, `question`, `answer`, `sort_order`, `published`) VALUES
  (1, 'The Fragrance', 'What size and concentration are the bottles?', 'Every Dion Fragrance bottle is a 30 ml extrait de parfum. The price is GH₵350.', 1, 1),
  (2, 'The Fragrance', 'How should I wear it?', 'Apply it to the pulse points: the wrists, the base of the neck, and behind the ears. Body heat helps the extrait open and last. Spray from about 30 cm away so the mist falls evenly.', 2, 1),
  (3, 'The Fragrance', 'How should I store the bottle?', 'Keep the bottle in a cool, dry place, away from direct sunlight and sharp changes in temperature. That protects the character of the extrait.', 3, 1),
  (4, 'Order Enquiries', 'I have not received an update about my order.', 'Check your junk or spam folder first. If the message is not there, message Dion Fragrance on WhatsApp or use the contact page with your order reference and we will resend the details.', 4, 1),
  (5, 'Order Enquiries', 'Can I cancel an order?', 'If the bottle has not been dispatched, contact us and we will cancel it. If it has already left, it needs to come back unopened before a refund can be made.', 5, 1),
  (6, 'Order Enquiries', 'I was charged twice.', 'Send us the payment proof and your order reference. If Paystack took the amount twice, the extra charge will be refunded.', 6, 1),
  (7, 'Shipping issues', 'How long does delivery take?', 'Orders in major cities in Ghana are usually delivered in 1 to 3 working days. More distant addresses can take up to 5 working days. Tracking is sent by email or WhatsApp after dispatch.', 7, 1),
  (8, 'Shipping issues', 'My tracking says delivered, but I do not have the parcel.', 'Check with anyone else at the address, including reception or neighbours. If it is still missing, contact us with the order reference and we will trace it with the courier.', 8, 1),
  (9, 'Shipping issues', 'I entered the wrong address.', 'Contact us straight away. We can change the address before the order is dispatched. After it has shipped, we have to wait for the courier to return it before sending it again.', 9, 1),
  (10, 'Returns & Product Care', 'I received the wrong fragrance.', 'Contact us within 48 hours and send a photo of what arrived, plus your order reference. We will arrange the correct bottle.', 10, 1),
  (11, 'Returns & Product Care', 'Are there any precautions?', 'Do not spray on the eyes, irritated skin, or other sensitive areas. Keep the mist off pale or delicate fabric, because fragrance can mark it. If your skin is sensitive, try a small amount on the inner wrist first.', 11, 1)
ON DUPLICATE KEY UPDATE `category`=VALUES(`category`), `question`=VALUES(`question`), `answer`=VALUES(`answer`), `sort_order`=VALUES(`sort_order`), `published`=VALUES(`published`);

-- ---------------------------------------------------------------------------
-- Blog posts
-- ---------------------------------------------------------------------------
INSERT INTO `blog_posts` (`id`, `title`, `slug`, `excerpt`, `content`, `image_url`, `category`, `read_time`, `published`, `sort_order`) VALUES
  (1, 'How to choose your first extrait de parfum', 'how-to-choose-your-first-extrait-de-parfum', 'A simple guide to finding a signature scent that feels like you, without guessing.', '<p>An extrait de parfum is the most concentrated form of fragrance. Start by choosing the mood you want: fresh and clean, warm and sweet, or deep and woody.</p><p>Apply a small amount to your wrist and let it settle for a few minutes before deciding. The first impression is only the beginning.</p>', '/hero/perfume.jpg', 'Guides', '4 min read', 1, 1),
  (2, 'Why oud oils last longer', 'why-oud-oils-last-longer', 'The quiet science behind the long, intimate trail of a quality oud oil.', '<p>Oud is a dense, resinous wood. When distilled into oil, its molecules sit close to the skin and release slowly throughout the day.</p><p>Apply to pulse points, then let body heat do the work. A little is enough.</p>', '/hero/woods.jpg', 'Fragrance Notes', '3 min read', 1, 2),
  (3, 'Building a small fragrance wardrobe', 'building-a-small-fragrance-wardrobe', 'Three bottles can cover almost every occasion. Here is how to choose them.', '<p>Choose one fresh scent for daytime, one warm scent for evenings, and one bold scent for moments that call for presence.</p><p>With those three, you can dress your fragrance to match the room rather than the other way around.</p>', '/hero/florals.jpg', 'Guides', '5 min read', 1, 3)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `excerpt`=VALUES(`excerpt`), `content`=VALUES(`content`), `image_url`=VALUES(`image_url`), `category`=VALUES(`category`), `read_time`=VALUES(`read_time`), `published`=VALUES(`published`), `sort_order`=VALUES(`sort_order`);

-- ---------------------------------------------------------------------------
-- Homepage settings
-- ---------------------------------------------------------------------------
INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
  ('home_founder', '/profile.jpg'),
  ('home_story', 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1000&q=80'),
  ('home_philosophy', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80')
ON DUPLICATE KEY UPDATE `setting_value`=VALUES(`setting_value`);

SET FOREIGN_KEY_CHECKS = 1;
