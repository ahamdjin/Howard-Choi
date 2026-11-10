"""Catch source sections present in JSON but silently omitted by a page renderer.

Run after npm run build. Checks body headings and paragraph text, not navigation
or just word counts. Existing guide draft gates are checked separately.
"""
import json,re
from pathlib import Path
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[1]
class MainText(HTMLParser):
 def __init__(self):super().__init__();self.depth=0;self.parts=[]
 def handle_starttag(self,tag,attrs):
  if tag=='main':self.depth+=1
 def handle_endtag(self,tag):
  if tag=='main':self.depth-=1
 def handle_data(self,data):
  if self.depth:self.parts.append(data)
def words(s):
 s=re.sub(r'\[([^\]]+)\]\([^)]+\)',r'\1',s)
 return ' '.join(re.findall(r'[^\W_]+',s.casefold()))
def rendered(path):
 f=ROOT/'.output/public'/path.strip('/')/'index.html'
 assert f.is_file(),f
 p=MainText();p.feed(f.read_text());return words(' '.join(p.parts))
resources=json.loads((ROOT/'content/learning/dklaw-authorized.json').read_text())
firm=json.loads((ROOT/'content/learning/firm-pages.json').read_text())
paths={'difference':'/about/our-difference','process':'/about/what-to-expect','fees':'/about/zero-fee-guarantee'}
checks=[]
for r in resources:
 if r['kind'] in ('faq','injury','service'):checks.append((r['path'],r['sections']))
for key,r in firm.items():checks.append((paths[key],r['sections']))
sections=0;paragraphs=0
for path,items in checks:
 body=rendered(path)
 for s in items:
  assert words(s['heading']) in body,('Missing source section',path,s['heading'])
  sections+=1
  for p in s['paragraphs']:
   # Markdown tables have separator syntax that does not create visible words.
   expected=words(p)
   assert not expected or expected in body,('Missing source paragraph',path,s['heading'],p[:100])
   paragraphs+=1
print(f'Verified {len(checks)} reading pages, {sections} source sections and {paragraphs} complete source paragraphs in built main content.')
