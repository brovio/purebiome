// Last verified: 2026-04-26T22:56:19.973Z
import { Metadata } from "next"
import PostCard from "@modules/blog/components/post-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { blogPosts } from "../../../../content/blog/posts.generated"

export const metadata: Metadata = {
  title: "Journal — gut-health reading",
  description:
    "Essays and research notes from the Kfibre team and our source partners at Kfibre. Microbiome science, daily rituals, and the occasional opinion.",
}


export default function BlogIndexPage() {
  // posts.generated.ts is already ordered newest-first.
  const posts = blogPosts
  const [hero, ...rest] = posts

  return (
    <div className="bg-bone">
      {/* Page header */}
      <div className="content-container pt-16 pb-10">
        <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-3">
          The Kfibre journal
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-ink leading-[1.05]">
          Gut-health reading.
        </h1>
        <p className="text-ink/70 mt-4 max-w-xl leading-relaxed">
          Ten recent essays on the microbiome, research we're watching, and
          how the daily ritual actually lands. Originally published by our
          source partners at Kfibre — reformatted here.
        </p>
      </div>

      {/* Featured (first) post */}
      {hero && (
        <div className="content-container pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7">
              <a href={`blog/${hero.slug}`} className="block group">
                <div className="relative w-full aspect-[16/10] rounded-[32px] overflow-hidden bg-ink/[0.04]">
                  {hero.heroImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={hero.heroImage}
                      alt={hero.title}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  )}
                </div>
              </a>
            </div>
            <div className="md:col-span-5 flex flex-col gap-5">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-cane/80">
                <time dateTime={hero.date}>
                  {new Date(hero.date).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                {hero.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-ink/55">
                    · {t}
                  </span>
                ))}
              </div>
              <LocalizedClientLink
                href={`/blog/${hero.slug}`}
                className="group"
              >
                <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-ink group-hover:text-cane transition-colors">
                  {hero.title}
                </h2>
              </LocalizedClientLink>
              {hero.excerpt && (
                <p className="text-ink/75 leading-relaxed">{hero.excerpt}</p>
              )}
              <LocalizedClientLink
                href={`/blog/${hero.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ink hover:text-cane transition-colors"
              >
                Read the essay <span aria-hidden>→</span>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      )}

      {/* Rest of the grid */}
      <div className="content-container pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
