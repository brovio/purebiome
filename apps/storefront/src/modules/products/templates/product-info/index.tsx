import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const primaryCategory = product.categories?.[0]

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-5 lg:max-w-[500px] mx-auto">
        {primaryCategory && (
          <LocalizedClientLink
            href={`/categories/${primaryCategory.handle}`}
            className="text-xs uppercase tracking-[0.2em] text-cane hover:text-ink transition-colors"
          >
            {primaryCategory.name}
          </LocalizedClientLink>
        )}
        <h1
          className="font-display text-4xl md:text-5xl leading-[1.05] text-ink"
          data-testid="product-title"
        >
          {product.title}
        </h1>
        {product.subtitle && (
          <p className="text-lg text-cane/90 font-medium">{product.subtitle}</p>
        )}
        <p
          className="text-ink/75 whitespace-pre-line leading-relaxed"
          data-testid="product-description"
        >
          {product.description}
        </p>
      </div>
    </div>
  )
}

export default ProductInfo
