import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { blogPosts } from "../../../../../content/blog/posts.generated"

type Params = { countryCode: string; slug: string }

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.heroImage ? [post.heroImage] : undefined,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const idx = blogPosts.findIndex((p) => p.slug === slug)
  const prev = idx > 0 ? blogPosts[idx - 1] : null
  const next = idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null

  return (
    <article className="bg-bone">
      {/* Breadcrumb + date eyebrow */}
      <div className="content-container pt-12 pb-4">
        <nav
          aria-label="Breadcrumb"
          className="text-xs uppercase tracking-[0.18em] text-ink/50 flex gap-2"
        >
          <LocalizedClientLink
            href="/blog"
            className="hover:text-cane transition-colors"
          >
            Journal
          </LocalizedClientLink>
          <span aria-hidden className="text-ink/30">
            /
          </span>
          <span className="text-ink/80 line-clamp-1">{post.title}</span>
        </nav>
      </div>

      {/* Title block */}
      <div className="content-container pb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-3">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          {post.tags.length > 0 && (
            <span className="text-ink/55"> · {post.tags.slice(0, 2).join(" · ")}</span>
          )}
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-ink leading-[1.02] max-w-4xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-lg md:text-xl text-ink/70 mt-6 max-w-2xl leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </div>

      {/* Hero image */}
      {post.heroImage && (
        <div className="content-container pb-12">
          <div className="relative w-full aspect-[16/8] rounded-[32px] overflow-hidden bg-ink/[0.04]">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      )}

      {/* Body — Fraunces headings, Inter body via @layer base defaults */}
      <div className="content-container pb-16">
        <div
          className="prose-purebiome max-w-2xl mx-auto text-ink/85 leading-[1.75] text-[17px] [&_h2]:font-display [&_h2]:text-3xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-ink [&_h3]:font-display [&_h3]:text-2xl [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-ink [&_p]:mb-6 [&_ul]:mb-6 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:mb-6 [&_ol]:pl-6 [&_ol]:list-decimal [&_li]:mb-2 [&_a]:text-cane [&_a]:underline hover:[&_a]:text-ink [&_img]:rounded-2xl [&_img]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-cane [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-ink/80 [&_blockquote]:my-8 [&_b]:font-semibold [&_b]:text-ink"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />
      </div>

      {/* Attribution */}
      <div className="content-container pb-12">
        <div className="max-w-2xl mx-auto border-t border-ink/10 pt-8">
          <p className="text-sm text-ink/60 leading-relaxed">
            This essay was originally published at{" "}
            <a
              href={post.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cane hover:text-ink transition-colors underline"
            >
              kfibre.brov.io
            </a>
            . We're republishing it here with light reformatting because the
            science under PureBiome is the same science under Kfibre — same
            Australian sugar-cane prebiotic backbone, same research group.
          </p>
        </div>
      </div>

      {/* Prev / next */}
      <div className="content-container pb-20">
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-ink/10 pt-8">
          {prev && (
            <LocalizedClientLink
              href={`/blog/${prev.slug}`}
              className="group block rounded-2xl p-5 bg-ink/[0.03] hover:bg-ink/[0.06] transition-colors"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-ink/50 mb-2">
                ← Newer
              </p>
              <p className="font-display text-lg text-ink group-hover:text-cane transition-colors leading-snug">
                {prev.title}
              </p>
            </LocalizedClientLink>
          )}
          {next && (
            <LocalizedClientLink
              href={`/blog/${next.slug}`}
              className={`group block rounded-2xl p-5 bg-ink/[0.03] hover:bg-ink/[0.06] transition-colors ${
                !prev ? "md:col-start-2" : ""
              }`}
            >
              <p className="text-xs uppercase tracking-[0.18em] text-ink/50 mb-2 md:text-right">
                Older →
              </p>
              <p className="font-display text-lg text-ink group-hover:text-cane transition-colors leading-snug md:text-right">
                {next.title}
              </p>
            </LocalizedClientLink>
          )}
        </div>
      </div>
    </article>
  )
}
