"""Audit rendered page metadata, indexability, links, anchors and schema without dependencies."""

import argparse
import collections
import concurrent.futures
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
parser = argparse.ArgumentParser(description='Read-only rendered SEO, internal-link and sitemap audit. Start the production server first.')
parser.add_argument('--origin', default='http://127.0.0.1:3000')
parser.add_argument('--output', default='output/seo-audit.json')
args = parser.parse_args()
BASE = args.origin.rstrip('/')
HOST = 'https://www.buenaparkinjurylawyer.com'

class Page(HTMLParser):

    def __init__(self):
        super().__init__()
        self.meta = collections.defaultdict(list)
        self.links = []
        self.images = []
        self.ids = set()
        self.h1 = []
        self.h2 = []
        self.titles = []
        self.schemas = []
        self.scripts = []
        self.in_tag = None
        self.buffer = ''
        self.lang = ''
        self.canonical = []

    def handle_starttag(self, t, a):
        d = dict(a)
        if t == 'html':
            self.lang = d.get('lang', '')
        if 'id' in d:
            self.ids.add(d['id'])
        if t == 'meta':
            self.meta[d.get('name') or d.get('property', '')].append(d.get('content', ''))
        if t == 'a':
            self.links.append(d.get('href', ''))
        if t == 'img':
            self.images.append(d)
        if t == 'link' and d.get('rel') == 'canonical':
            self.canonical.append(d.get('href', ''))
        if t in ['h1', 'h2', 'title'] or (t == 'script' and d.get('type') == 'application/ld+json'):
            self.in_tag = t
            self.buffer = ''

    def handle_data(self, s):
        if self.in_tag:
            self.buffer += s

    def handle_endtag(self, t):
        if t == self.in_tag:
            {'h1': self.h1, 'h2': self.h2, 'title': self.titles, 'script': self.schemas}[t].append(self.buffer.strip())
            self.in_tag = None

def fetch(path):
    try:
        r = urllib.request.urlopen(BASE + path, timeout=20)
        body = r.read().decode()
        p = Page()
        p.feed(body)
        return {'path': path, 'status': r.status, 'page': p, 'html': body}
    except urllib.error.HTTPError as e:
        return {'path': path, 'status': e.code}
    except Exception as e:
        return {'path': path, 'error': str(e)}
root = ET.fromstring(urllib.request.urlopen(BASE + '/sitemap.xml').read())
sitemap = {urllib.parse.urlsplit(e.text).path for e in root.iter() if e.tag.endswith('loc')}
seen = {}
todo = set(sitemap) | {'/ko', '/es', '/review', '/thank-you'}
for iteration in range(6):
    if not todo:
        break
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
        results = list(ex.map(fetch, sorted(todo)))
    todo = set()
    for item in results:
        seen[item['path']] = item
        if 'page' not in item:
            continue
        for link in item['page'].links:
            u = urllib.parse.urlsplit(urllib.parse.urljoin(HOST + item['path'], link))
            if u.hostname not in ['www.buenaparkinjurylawyer.com', 'buenaparkinjurylawyer.com']:
                continue
            path = u.path.rstrip('/') or '/'
            if path.startswith(('/api', '/admin', '/auth')) or re.search('\\.(?:png|jpg|jpeg|svg|webp|avif|pdf|xml)$', path):
                continue
            if path not in seen:
                todo.add(path)
issues = []
warnings = []
titles = collections.defaultdict(list)
descs = collections.defaultdict(list)
for (path, row) in sorted(seen.items()):
    if 'page' not in row:
        issues.append({'path': path, 'issue': 'fetch', 'detail': row})
        continue
    p = row['page']
    indexed = not any(('noindex' in r for r in p.meta['robots']))
    if len(p.h1) != 1:
        issues.append({'path': path, 'issue': 'h1_count', 'detail': len(p.h1)})
    if indexed:
        for (field, values) in [('title', p.titles), ('description', p.meta['description']), ('canonical', p.canonical), ('robots', p.meta['robots'])]:
            if len(values) != 1 or not values[0]:
                issues.append({'path': path, 'issue': field + '_count', 'detail': values})
        if p.canonical != [HOST + path]:
            issues.append({'path': path, 'issue': 'canonical_mismatch', 'detail': p.canonical})
        for field in ['og:title', 'og:description', 'og:image', 'twitter:card', 'og:url']:
            if not p.meta[field]:
                issues.append({'path': path, 'issue': 'missing_' + field})
        if p.meta['og:url'] != p.canonical:
            issues.append({'path': path, 'issue': 'og_url_mismatch'})
        if p.titles:
            titles[p.titles[0]].append(path)
        if p.meta['description']:
            descs[p.meta['description'][0]].append(path)
        if p.titles and len(p.titles[0]) > 75:
            warnings.append({'path': path, 'issue': 'long_title', 'length': len(p.titles[0])})
        if p.meta['description'] and len(p.meta['description'][0]) > 180:
            warnings.append({'path': path, 'issue': 'long_description', 'length': len(p.meta['description'][0])})
    if path.startswith(('/es', '/ko')) and indexed:
        issues.append({'path': path, 'issue': 'language_should_be_noindex'})
    if path in sitemap and (not indexed):
        issues.append({'path': path, 'issue': 'noindex_in_sitemap'})
    if not p.lang:
        issues.append({'path': path, 'issue': 'missing_lang'})
    for img in p.images:
        if 'alt' not in img:
            issues.append({'path': path, 'issue': 'image_missing_alt', 'src': img.get('src')})
    for raw in p.schemas:
        try:
            json.loads(raw)
        except:
            issues.append({'path': path, 'issue': 'invalid_jsonld'})
    for link in p.links:
        u = urllib.parse.urlsplit(urllib.parse.urljoin(HOST + path, link))
        target = u.path.rstrip('/') or '/'
        if u.hostname not in ['www.buenaparkinjurylawyer.com', 'buenaparkinjurylawyer.com']:
            continue
        if target in seen and 'page' not in seen[target]:
            issues.append({'path': path, 'issue': 'broken_internal_link', 'target': target, 'status': seen[target].get('status')})
        if u.fragment and target in seen and ('page' in seen[target]) and (urllib.parse.unquote(u.fragment) not in seen[target]['page'].ids):
            issues.append({'path': path, 'issue': 'broken_fragment', 'target': target + '#' + u.fragment})
for (kind, values) in [('duplicate_title', titles), ('duplicate_description', descs)]:
    for (value, paths) in values.items():
        if len(paths) > 1:
            issues.append({'issue': kind, 'paths': paths, 'value': value})
assets = set()
for row in seen.values():
    if 'page' not in row:
        continue
    page = row['page']
    for value in [img.get('src', '') for img in page.images] + page.meta['og:image'] + page.meta['twitter:image']:
        if not value:
            continue
        url = urllib.parse.urlsplit(urllib.parse.urljoin(HOST + row['path'], value))
        if url.scheme in ('http', 'https') and url.hostname in ('www.buenaparkinjurylawyer.com', 'buenaparkinjurylawyer.com'):
            assets.add(url.path)

def check_asset(path):
    try:
        request = urllib.request.Request(BASE + path, method='HEAD')
        with urllib.request.urlopen(request, timeout=20) as response:
            if response.status != 200 or not response.headers.get('content-type', '').startswith('image/'):
                return {'path': path, 'issue': 'invalid_image_asset', 'status': response.status}
    except Exception as error:
        return {'path': path, 'issue': 'image_fetch', 'detail': str(error)}

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
    issues.extend(result for result in executor.map(check_asset, sorted(assets)) if result)

report = {'crawled': len(seen), 'sitemap': len(sitemap), 'image_assets_checked': len(assets), 'issues': issues, 'warnings': warnings, 'pages': [{'path': r['path'], 'status': r.get('status'), 'title': r['page'].titles, 'description': r['page'].meta['description'], 'h1': r['page'].h1, 'lang': r['page'].lang, 'schemas': len(r['page'].schemas)} for r in seen.values() if 'page' in r]}
output = Path(args.output)
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(report, ensure_ascii=False, indent=2))
print(json.dumps({k: v for (k, v) in report.items() if k != 'pages'}, ensure_ascii=False, indent=2))
sys.exit(bool(issues))
