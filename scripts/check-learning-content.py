"""Protect the requested coverage, source provenance, and pre-existing draft gates."""
import csv,json,re,subprocess
from pathlib import Path
root=Path(__file__).resolve().parents[1]
read=lambda path:json.loads((root/path).read_text())
catalog=read('content/learning/catalog.json');pages=read('content/learning/dklaw-authorized.json')
faqs=[r for r in pages if r['kind']=='faq'];assert len(faqs)==12
questions={s['heading'] for r in faqs for s in r['sections']}
source_questions={r['question'] for r in csv.DictReader((root/'reference/seo/competitors/dklaw/2026-11-10/faq-question-inventory.csv').open())}
assert len(questions)==75 and questions==source_questions,'FAQ headings changed or disappeared'
assert len([r for r in catalog if r['kind']=='guide'])==11
assert len([r for r in catalog if r['kind']=='injury'])==11
assert {r['slug'] for r in pages if r['kind']=='service'} >= {'bicycle-accidents','dog-bites'}
for r in pages:
 assert r['title'] and r['description'] and r['metaTitle'] and r['sections'],r['path']
 for s in r['sections']:
  assert s['paragraphs'],(r['path'],s['heading'])
  for t in [s['heading'],*s['paragraphs']]:
   assert not re.search(r'DK Law|Daniel Kim|dklaw\.com|around the clock|24/7',t), (r['path'],t)
 words=sum(len(p.split()) for s in r['sections'] for p in s['paragraphs'])
 assert words >= (150 if r['kind']=='faq' else 1800 if r['slug'] in ('dog-bites','bicycle-accidents') and r['kind']=='service' else 500),('Resource lost substantive content',r['path'],words)
 assert r['source'].startswith('https://dklaw.com/')
for f in (root/'content/blog').glob('*.md'):
 text=f.read_text();meta,_=json.JSONDecoder().raw_decode(text.lstrip())
 old=subprocess.run(['git','show','HEAD:content/blog/'+f.name],cwd=root,capture_output=True,text=True)
 if old.returncode==0:
  before,_=json.JSONDecoder().raw_decode(old.stdout.lstrip())
  if before.get('published') is False:assert meta.get('published') is False,'Old draft published: '+f.name
for r in catalog:
 if r['kind']=='guide' and r['slug']!='ca-car-accident-101':
  f=root/'content/blog'/f"{r['path'].split('/')[-1]}.md";raw=f.read_text();meta,end=json.JSONDecoder().raw_decode(raw)
  assert len(raw[end:].split()) >= 1500,'Guide lost substantive content: '+str(f)
  assert meta['published'] is True and meta['requiredTranslations']==[],str(f)
print('Verified 12 FAQ topics / 75 source questions, 11 guides, 11 injury topics, two new services and existing draft gates.')
