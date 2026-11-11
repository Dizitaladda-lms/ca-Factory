const express = require("express");
const blogService = require("../services/blog.service");
const pool = require("../config/db");
const router = express.Router();
const baseUrl = (process.env.PUBLIC_SITE_URL || "https://dizitaladda.com").replace(/\/+$/, "");
const xml = (value) => String(value || "").replace(/[<>&'\"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));
const postPath = (post) => {
  const category = String(post.category || "blog").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `/blog/${category}/${encodeURIComponent(post.slug)}`;
};

router.get("/robots.txt", (_req, res) => res.type("text/plain").send(`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: ${baseUrl}/sitemap.xml\n`));

router.get("/sitemap.xml", async (_req, res, next) => {
  try {
    const { blogs } = await blogService.getBlogs({ page: 1, limit: 50, onlyPublished: true });
    const urls = blogs.filter((post) => post.robots_index !== false).map((post) => `<url><loc>${xml(`${baseUrl}${postPath(post)}`)}</loc><lastmod>${new Date(post.updated_at || post.created_at || Date.now()).toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join("");
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${xml(baseUrl)}/</loc></url><url><loc>${xml(baseUrl)}/blogs</loc></url>${urls}</urlset>`);
  } catch (error) { next(error); }
});

router.get("/rss.xml", async (_req, res, next) => {
  try {
    const { blogs } = await blogService.getBlogs({ page: 1, limit: 50, onlyPublished: true });
    const items = blogs.map((post) => `<item><title>${xml(post.title)}</title><link>${xml(`${baseUrl}${postPath(post)}`)}</link><guid>${xml(`${baseUrl}${postPath(post)}`)}</guid><pubDate>${new Date(post.published_at || post.created_at || Date.now()).toUTCString()}</pubDate><description>${xml(post.meta_description || post.summary)}</description></item>`).join("");
    res.type("application/rss+xml").send(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Dizital Adda Blog</title><link>${xml(baseUrl)}/blogs</link><description>CA and CS exam preparation guides</description>${items}</channel></rss>`);
  } catch (error) { next(error); }
});

const escapeHtml = (value) => String(value || "").replace(/[&<>\"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const safeArticle = (html) => String(html || "")
  .replace(/<(script|style|iframe|object|embed|form)[^>]*>[\s\S]*?<\/\1\s*>/gi, "")
  .replace(/\son\w+\s*=\s*(["']).*?\1/gi, "")
  .replace(/\s(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, "")
  .replace(/<\/?(?!p\b|h[1-6]\b|ul\b|ol\b|li\b|a\b|strong\b|em\b|b\b|i\b|blockquote\b|table\b|thead\b|tbody\b|tr\b|th\b|td\b|br\b|hr\b|img\b|figure\b|figcaption\b|code\b|pre\b)[a-z][^>]*>/gi, "");

async function renderBlog(req, res, next) {
  try {
    const slug = req.params.slug;
    const db = pool.getRealPool?.();
    if (db) {
      const oldSlug = req.params.category ? null : slug;
      if (oldSlug) {
        const redirect = await db.query("SELECT new_slug FROM blog_redirects WHERE old_slug=$1 LIMIT 1", [oldSlug]).catch(() => ({ rows: [] }));
        if (redirect.rows[0]) return res.redirect(301, `/blog/${redirect.rows[0].new_slug}`);
      }
    }
    const post = await blogService.getBlogBySlug(slug);
    if (!post || post.is_published === false || ["draft", "in_review", "archived", "scheduled"].includes(post.status)) return res.status(404).send("<!doctype html><title>Article not found</title><h1>Article not found</h1>");
    const categorySlug = String(post.category || "blog").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!req.params.category) return res.redirect(301, `/blog/${categorySlug}/${encodeURIComponent(post.slug)}`);
    if (req.params.category !== categorySlug) return res.redirect(301, `/blog/${categorySlug}/${encodeURIComponent(post.slug)}`);

    const indexPath = require("path").join(__dirname, "..", "..", "..", "frontend", "dist", "index.html");
    const fs = require("fs");
    const htmlArticle = safeArticle(post.content);
    const canonical = post.canonical_url || `${baseUrl}/blog/${categorySlug}/${encodeURIComponent(post.slug)}`;
    const title = escapeHtml(post.meta_title || `${post.title} | Dizital Adda`);
    const description = escapeHtml(post.meta_description || post.summary || "CA and CS exam preparation guide.");
    const image = escapeHtml(post.og_image || post.featured_image || "");
    const schemas = post.schema?.combined || [];
    const jsonLd = JSON.stringify(schemas).replace(/</g, "\\u003c");
    let languageLinks = `<link rel="alternate" hreflang="${post.language === "hi" ? "hi" : "en"}" href="${escapeHtml(canonical)}">`;
    if (db && post.translation_key) {
      const translations = await db.query("SELECT slug,category,language FROM blogs WHERE translation_key=$1 AND is_published=true", [post.translation_key]).catch(() => ({ rows: [] }));
      languageLinks = translations.rows.map((translation) => {
        const languageCategory = String(translation.category || "blog").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        return `<link rel="alternate" hreflang="${translation.language === "hi" ? "hi" : "en"}" href="${escapeHtml(`${baseUrl}/blog/${languageCategory}/${encodeURIComponent(translation.slug)}`)}">`;
      }).join("");
    }
    const tags = `<title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${escapeHtml(canonical)}"><meta name="robots" content="${post.robots_index === false ? "noindex" : "index"},${post.robots_follow === false ? "nofollow" : "follow"}"><meta property="og:type" content="article"><meta property="og:title" content="${escapeHtml(post.og_title || title)}"><meta property="og:description" content="${escapeHtml(post.og_description || description)}"><meta property="og:url" content="${escapeHtml(canonical)}">${image ? `<meta property="og:image" content="${image}">` : ""}<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}"><meta name="twitter:title" content="${escapeHtml(post.twitter_title || title)}"><meta name="twitter:description" content="${escapeHtml(post.twitter_description || description)}">${image ? `<meta name="twitter:image" content="${escapeHtml(post.twitter_image || image)}">` : ""}${languageLinks}<script type="application/ld+json">${jsonLd}</script>`;
    const noscript = `<noscript><main><article><h1>${escapeHtml(post.title)}</h1><p>${description}</p><div>${htmlArticle}</div></article></main></noscript>`;
    if (!fs.existsSync(indexPath)) {
      const fallback = `<!doctype html><html lang="${post.language === "hi" ? "hi" : "en"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${tags}<style>body{font:16px/1.75 system-ui,sans-serif;color:#172033;margin:0}header,main,footer{max-width:900px;margin:auto;padding:1rem 1.5rem}header{border-bottom:1px solid #ddd}nav{font-size:.9rem;color:#526070}h1{font-size:clamp(2rem,5vw,3.5rem);line-height:1.15}article img{max-width:100%;height:auto}article h2{margin-top:2rem}aside{background:#f4f6f9;padding:1rem;border-radius:1rem}a{color:#7c4a00}</style></head><body><header><a href="/">Dizital Adda</a><nav aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blogs">Blog</a> › ${escapeHtml(post.category)} › ${escapeHtml(post.title)}</nav></header><main><article><h1>${escapeHtml(post.title)}</h1><p>${description}</p><p>By ${escapeHtml(post.author_name)} · ${new Date(post.published_at || post.created_at || Date.now()).toLocaleDateString("en-IN")} · ${escapeHtml(post.read_time || "")}</p>${image ? `<img src="${image}" alt="${escapeHtml(post.featured_image_alt || post.title)}" width="1200" height="514">` : ""}<div>${htmlArticle}</div></article>${Array.isArray(post.faqs) && post.faqs.length ? `<section><h2>Frequently asked questions</h2>${post.faqs.map((faq) => `<details><summary>${escapeHtml(faq.question)}</summary><p>${escapeHtml(faq.answer)}</p></details>`).join("")}</section>` : ""}<aside><h2>Prepare for your CA or CS exam</h2><p>Explore courses and test series from Dizital Adda.</p><a href="/ca/batches">Explore CA courses</a> · <a href="/cs/batches">Explore CS courses</a></aside><p>Reviewed by ${escapeHtml(post.reviewer_name || "Academic Review Team")} ${escapeHtml(post.reviewer_credentials || "")}</p></main><footer><a href="/blogs">More study guides</a></footer></body></html>`;
      return res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300").status(200).type("html").send(fallback);
    }
    let html = fs.readFileSync(indexPath, "utf8");
    html = html.replace(/<title>[\s\S]*?<\/title>/i, "").replace("</head>", `${tags}</head>`).replace("<div id=\"root\"></div>", `<div id="root"></div>${noscript}`);
    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300").status(200).type("html").send(html);
  } catch (error) { next(error); }
}
router.get("/blog/:category/:slug", renderBlog);
router.get("/blog/:slug", renderBlog);

module.exports = router;
