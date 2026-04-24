import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { BlogPost } from "../../../../../content/blog/posts.generated"

/**
 * Blog index card. Large hero image on top, Fraunces headline, excerpt,
 * date + tags meta strip. Used on /blog listing and the 3-up teaser
 * on the recipes index.
 */
export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <LocalizedClientLink
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-4"
    >
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-ink/[0.04]">
        {post.heroImage && (
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
          />
        )}
      </div>
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-ink/55">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
        {post.tags.slice(0, 1).map((t) => (
          <span key={t} className="text-cane">
            {t}
          </span>
        ))}
      </div>
      <h3 className="font-display text-2xl leading-[1.15] text-ink group-hover:text-cane transition-colors">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="text-sm text-ink/70 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      )}
    </LocalizedClientLink>
  )
}
