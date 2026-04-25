#!/usr/bin/env node
/**
 * Ingest the last 10 blog posts from kfibre.brov.io into our storefront.
 *
 * Output:
 *   apps/storefront/content/blog/posts.generated.ts  (typed array of all posts)
 *   apps/storefront/public/images/blog/<slug>.<ext>  (hero image, as-is)
 *
 * Each post object: { slug, title, date, excerpt, heroImage, bodyHtml, tags }
 *
 * Re-runnable: delete the generated file and re-run to refresh.
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const CONTENT = path.join(ROOT, "apps/storefront/src/content/blog")
const IMAGES = path.join(ROOT, "apps/storefront/public/images/blog")

const SOURCE = "https://kfibre.brov.io"

// Hand-curated from the kfibre.brov.io /blog index (page 1 = last 10 posts).
// Order matches chronological newest-first.
// `fallback` is used when the WordPress CDN 403s the remote hero image
// (it does for every post — brov.io has hotlink protection on uploads).
const posts = [
  {
    slug: "the-emerging-field-of-gut-microbiota-and-cancer-research",
    date: "2024-06-08",
    fallback: "/images/blog/fallback-studio.png",
  },
  {
    slug: "gen-zs-approach-to-gut-health-and-wellness-trends",
    date: "2024-05-25",
    fallback: "/images/blog/fallback-lifestyle.jpg",
  },
  {
    slug: "how-diet-affects-the-gut-microbiome-in-diabetes",
    date: "2024-05-11",
    fallback: "/images/blog/fallback-essential.png",
  },
  {
    slug: "rosalind-franklin-the-unsung-hero-of-dnas-double-helix-discovery",
    date: "2024-05-04",
    fallback: "/images/blog/fallback-sugarcane.svg",
  },
  {
    slug: "the-rising-trend-of-microbiome-testing-for-personalised-gut-health",
    date: "2024-04-27",
    fallback: "/images/blog/fallback-studio.png",
  },
  {
    slug: "gut-health-in-athletes-performance-and-recovery-from-cellulosic-prebiotics",
    date: "2024-04-20",
    fallback: "/images/blog/fallback-pro.png",
  },
  {
    slug: "gut-health-the-latest-research-and-technology",
    date: "2024-04-13",
    fallback: "/images/blog/fallback-lifestyle.jpg",
  },
  {
    slug: "diet-and-the-microbiome-how-what-you-eat-affects-gut-bacteria",
    date: "2024-04-06",
    fallback: "/images/blog/fallback-essential.png",
  },
  {
    slug: "did-lead-additives-in-petrol-impact-our-long-term-gut-and-heart-health",
    date: "2024-03-30",
    fallback: "/images/blog/fallback-sugarcane.svg",
  },
  {
    slug: "how-probiotics-and-prebiotics-work-together-for-optimal-gut-health",
    date: "2024-03-23",
    fallback: "/images/blog/fallback-essential.png",
  },
]

// Minimal HTML-to-reasonable-HTML pipeline. WordPress outputs messy divs —
// we strip WP-specific wrapping chrome and keep paragraphs, headings, lists,
// bold, italics, images, links.
function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/&#038;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&#039;/g, "'")
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ")).trim()
}

function extractBody(html) {
  // kfibre.brov.io runs the Fusion/Avada WP theme. Real post text lives
  // inside <article> (25-40KB) and is wrapped by <div class="fusion-text ...">
  // blocks, each containing <p>, <h2/3>, <ul>, <ol>.
  const artMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)
  if (!artMatch) return ""
  let article = artMatch[1]

  // Strip Fusion-specific non-content noise before we start matching.
  article = article
    .replace(/<ul\s+class="slides"[\s\S]*?<\/ul>/gi, "") // image gallery wrapper
    .replace(/<span\s+class="entry-title"[\s\S]*?<\/span>/gi, "") // hidden title
    .replace(/<div[^>]*class="[^"]*post-content-container[^"]*"[^>]*>[\s\S]*?<\/div>/gi, (m) => m) // keep content container
    .replace(/<div[^>]*class="[^"]*fusion-social-networks[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "")
    .replace(/<div[^>]*class="[^"]*post-meta[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")

  const keep = []
  const tagRe =
    /<(?<tag>h2|h3|h4|p|ul|ol|blockquote)[^>]*>(?<body>[\s\S]*?)<\/\1>/gi
  for (const m of article.matchAll(tagRe)) {
    const { tag } = m.groups
    const raw = m[0]
    const inner = m.groups.body
    const text = stripTags(raw)

    // Nav strips: short text + nav-looking tags.
    if (text.length < 40 && (tag === "p" || tag === "h4")) continue
    // Skip link-list paragraphs.
    if (tag === "p" && /^(\s*<a[^>]*>[^<]{1,40}<\/a>\s*){2,}$/i.test(inner.trim())) continue
    // Skip <ul>/<ol> that contain <img> (gallery leftovers).
    if ((tag === "ul" || tag === "ol") && /<img/i.test(inner)) continue

    const cleaned = raw
      .replace(/\s+(?:class|style|data-[a-z-]+|id|role|fetchpriority|decoding|loading|width|height|srcset|sizes|tabindex|aria-[a-z-]+)="[^"]*"/gi, "")
      .replace(/<img\s+([^>]*?)\s*\/?>/gi, (_, attrs) => {
        const srcM = attrs.match(/src="([^"]+)"/)
        const altM = attrs.match(/alt="([^"]*)"/)
        return srcM ? `<img src="${srcM[1]}" alt="${altM?.[1] ?? ""}" />` : ""
      })
    keep.push(cleaned.trim())
  }
  return keep.join("\n").trim()
}

function extractTitle(html) {
  // Fusion emits a hidden <span class="entry-title" style="display: none;">
  // with the exact post title — far more reliable than <h1> or <title>.
  const spanM = html.match(/<span\s+class="entry-title"\s+style="display:\s*none;?"\s*>([^<]+)<\/span>/i)
  if (spanM) return decodeEntities(spanM[1]).trim()

  const h1M = html.match(/<h1[^>]*class="[^"]*fusion-title-heading[^"]*"[^>]*>([^<]+)<\/h1>/i)
  if (h1M) return decodeEntities(h1M[1]).trim()

  const titleM = html.match(/<title>([^<]+)<\/title>/i)
  if (!titleM) return null
  return decodeEntities(titleM[1]).replace(/\s*[–|\-]\s*Kfibre.*$/i, "").trim()
}

function extractHeroImage(html) {
  const m =
    html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) ||
    html.match(/<img[^>]*class="[^"]*wp-post-image[^"]*"[^>]*src="([^"]+)"/i) ||
    html.match(/<div[^>]*class="[^"]*et_pb_post_content[^"]*"[\s\S]*?<img[^>]*src="([^"]+)"/i)
  return m ? m[1] : null
}

function extractExcerpt(bodyHtml) {
  // Plain-text preview from the body: strip all tags, take first 260 chars.
  const text = stripTags(bodyHtml)
  if (!text) return ""
  return text.length > 260 ? text.slice(0, 257).trimEnd() + "…" : text
}

function extractTags(html) {
  // Divi emits comma-joined categories in the post-meta block. Fall back to og:article:tag.
  const tags = new Set()
  const tagMatches = html.matchAll(/<meta\s+property="article:tag"\s+content="([^"]+)"/gi)
  for (const m of tagMatches) tags.add(decodeEntities(m[1]))
  return [...tags].slice(0, 5)
}

async function fetchPost(slug) {
  const url = `${SOURCE}/${slug}/`
  process.stdout.write(`  fetching ${slug}… `)
  const res = await fetch(url, { headers: { "user-agent": "PureBiome-ingest/1.0" } })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const html = await res.text()
  console.log(`${html.length} bytes`)
  return { url, html }
}

async function downloadImage(slug, imgUrl) {
  if (!imgUrl) return null
  const ext = (imgUrl.match(/\.(jpe?g|png|webp|avif)(\?|$)/i) || [, "jpg"])[1].toLowerCase()
  const filename = `${slug}.${ext === "jpeg" ? "jpg" : ext}`
  const target = path.join(IMAGES, filename)
  const res = await fetch(imgUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36",
      referer: `${SOURCE}/`,
    },
  })
  if (!res.ok) {
    console.warn(`    (hotlink ${res.status}) using fallback for ${slug}`)
    return null
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await fs.writeFile(target, buf)
  return `/images/blog/${filename}`
}

async function main() {
  await fs.mkdir(CONTENT, { recursive: true })
  await fs.mkdir(IMAGES, { recursive: true })

  const ingested = []
  for (const meta of posts) {
    const { url, html } = await fetchPost(meta.slug)
    const title = extractTitle(html)
    const heroRemote = extractHeroImage(html)
    const bodyHtml = extractBody(html)
    const excerpt = extractExcerpt(bodyHtml)
    const tags = extractTags(html)
    const downloaded = await downloadImage(meta.slug, heroRemote)
    const heroImage = downloaded ?? meta.fallback

    ingested.push({
      slug: meta.slug,
      date: meta.date,
      source: url,
      title: title ?? meta.slug,
      excerpt: excerpt ?? "",
      heroImage,
      tags,
      bodyHtml,
    })
  }

  // One generated TS file with a typed array. Importing this from the
  // Next.js app avoids any runtime file-reading or MDX toolchain.
  const banner = `// AUTO-GENERATED by scripts/ingest-blog.mjs — do not edit by hand.\n// Source: ${SOURCE}/blog/\n// Run \`node scripts/ingest-blog.mjs\` to refresh.\n\n`
  const typedef = `export type BlogPost = {\n  slug: string\n  date: string\n  source: string\n  title: string\n  excerpt: string\n  heroImage: string | null\n  tags: string[]\n  bodyHtml: string\n}\n\n`
  const body = `export const blogPosts: BlogPost[] = ${JSON.stringify(ingested, null, 2)}\n`
  const out = path.join(CONTENT, "posts.generated.ts")
  await fs.writeFile(out, banner + typedef + body)
  console.log(`\n[ok] wrote ${ingested.length} posts to ${path.relative(ROOT, out)}`)
  console.log(`[ok] images in ${path.relative(ROOT, IMAGES)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
