import { useState } from 'react';
import type { Product, ProductVariant } from '../types';

interface Props {
  product: Product;
}

function volumeMl(size: string): number {
  const match = String(size).match(/(\d+(?:\.\d+)?)\s*ml/i);
  return match ? Number(match[1]) : 0;
}

function volumeLabel(size: string): string {
  const ml = volumeMl(size);
  return ml > 0 ? `${ml} ml` : size;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const variants = [...(product.variants || [])].sort((a, b) => volumeMl(b.size) - volumeMl(a.size));
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    variants[0] || {
      id: 0,
      size: 'Standard',
      price: product.price,
      inStock: true,
    }
  );

  const savings = product.compareAtPrice && product.compareAtPrice > product.price
    ? (product.compareAtPrice - product.price).toFixed(2)
    : null;

  const productHref = `/product/${product.slug}?volume=${encodeURIComponent(selectedVariant.size)}`;

  return (
    <div className="group flex flex-col bg-transparent">
      <a
        href={productHref}
        className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100 block shadow-2xs"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80';
          }}
          className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
            product.hoverImageUrl ? 'group-hover:opacity-0' : ''
          }`}
          loading="lazy"
        />

        {product.hoverImageUrl && (
          <img
            src={product.hoverImageUrl}
            alt={`${product.name} view`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {savings && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
            <span className="bg-[#D4AF37] text-[#1C140C] font-extrabold text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-[3px] shadow-xs tracking-wider">
              SAVE GH₵{savings}
            </span>
          </div>
        )}

        {product.comingSoon ? (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
            <span className="bg-[#D4AF37] text-[#1C140C] font-extrabold text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase px-2 py-0.5 sm:py-1 rounded-[3px] shadow-xs tracking-wider">
              Coming Soon
            </span>
          </div>
        ) : product.inStock === false || (product.stockQuantity !== undefined && product.stockQuantity <= 0) ? (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
            <span className="bg-neutral-900/90 text-white font-extrabold text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase px-2 py-0.5 sm:py-1 rounded-[3px] shadow-xs tracking-wider">
              Out of Stock
            </span>
          </div>
        ) : product.stockQuantity !== undefined && product.stockQuantity <= 10 ? (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
            <span className="bg-amber-600 text-white font-extrabold text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase px-2 py-0.5 sm:py-1 rounded-[3px] shadow-xs tracking-wider">
              Only {product.stockQuantity} Left
            </span>
          </div>
        ) : null}
      </a>

      <div className="pt-2.5 text-center">
        <a href={productHref} className="block">
          <h3 className="font-['Cormorant_Garamond',serif] text-[13px] sm:text-[15px] font-bold text-[#1C140C] leading-tight line-clamp-2">
            {product.name}
          </h3>
        </a>
      </div>

      {variants.length > 0 && (
        <div className="mt-2 flex flex-col items-center gap-1.5">
          <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label={`Volumes for ${product.name}`}>
            {variants.map((variant) => {
              const variantStock = variant.stockQuantity !== undefined
                ? Number(variant.stockQuantity)
                : (product.stockQuantity !== undefined ? Number(product.stockQuantity) : 50);
              const variantOut = product.inStock === false || variant.inStock === false || variantStock <= 0;
              const isSelected = selectedVariant.size === variant.size;
              return (
                <button
                  key={variant.size}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C140C] text-white'
                      : 'bg-white text-[#1C140C]/70 ring-1 ring-[#1C140C]/15 hover:text-[#1C140C]'
                  } ${variantOut ? 'opacity-40' : ''}`}
                >
                  {volumeLabel(variant.size)}
                </button>
              );
            })}
          </div>
          <p className="font-['Cormorant_Garamond',serif] text-[15px] sm:text-base font-bold leading-none tracking-wide text-[#1C140C]">
            GH₵{Number(selectedVariant.price).toFixed(0)}
          </p>
        </div>
      )}

      <a
        href={productHref}
        className="mt-2.5 w-full py-2 px-2 rounded-lg bg-[#D4AF37] hover:bg-[#C49B2A] text-[#1C140C] font-bold text-[11px] sm:text-xs uppercase tracking-[0.14em] text-center transition-colors"
      >
        View Product
      </a>
    </div>
  );
};
