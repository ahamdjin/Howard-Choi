# Blog authorship

## Source of truth

`src/data/blogAuthors.ts` owns author names, portraits, localized roles and biographies, credentials, profile links and external identity links. Howard Choi is the default author, as directed by the site owner. Use the existing `/attorney` profile and its Spanish and Korean equivalents rather than creating duplicate biography pages.

Authorship is an editorial assertion. Assign the person responsible for the article. This implementation does not assert attorney review, invent a review date or interpret a modification date as legal review.

## Adding an author

1. Add a stable ID and complete `BlogAuthor` record to `blogAuthors`.
2. Supply a real profile path, portrait and localized copy. Add only verified credentials and identity links.
3. Add `"article-slug": "author-id"` to `articleAuthorIds` for articles with a different author.
4. Keep the same slug across translated versions: they automatically resolve to the same author.

Unassigned articles inherit `DEFAULT_BLOG_AUTHOR_ID`. An unknown author ID throws rather than silently attributing an article to another person. Changing a default changes every unassigned article, so review existing attribution first.

## Shared presentation and metadata

- `ArticleByline`: visible credit near the article date and reading time.
- `ArticleAuthorBio`: portrait, biography, credential verification and profile links after the article.
- `articleJsonLd`: `BlogPosting` with the resolved `Person` author; the firm remains the publisher. Author IDs match the existing Howard Person entity.
- Publication and modification dates remain article data. Do not alter them solely to make an article look fresh.

Article body content remains in the existing Markdown and translation data. No CMS dependency or author database is required.

## Verification

Run `npm run typecheck`, lint changed files and `npm run build`. Inspect the rendered byline and author box on desktop and mobile. Check that each built article has one `BlogPosting`, the correct author/profile URL, and unchanged publisher, dates and indexing policy. Check English, Spanish and Korean.
