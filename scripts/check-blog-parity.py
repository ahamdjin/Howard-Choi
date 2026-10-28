#!/usr/bin/env python3
"""Verify translated publication coverage, source freshness and structural parity.
This enforces coverage, not professional legal/language accuracy approval.
"""
import hashlib,json,re,sys
from collections import Counter
from pathlib import Path
root=Path(__file__).resolve().parents[1]
def numeric_tokens(text):
 # Korean monetary notation expresses 100,000 as 10만; compare values,
 # not just the visible digits. English magnitude words are normalized too.
 text=re.sub(r'(\d+(?:[,.]\d+)*)\s*만(?:\s*(\d+)\s*천)?', lambda m:str(int(float(m[1].replace(',',''))*10000)+int(m[2] or 0)*1000),text)
 text=text.replace('millones','million').replace('millón','million')
 text=re.sub(r'(\d+(?:[,.]\d+)*)\s*(million|billion|thousand)\b',lambda m:str(int(float(m[1].replace(',',''))*{'million':1000000,'billion':1000000000,'thousand':1000}[m[2]])),text,flags=re.I)
 return [re.sub(r'\D','',n) for n in re.findall(r'\d+(?:[,.]\d+)*',text)]
failures=[]; checked=0
for p in sorted((root/'content/blog').glob('*.md')):
 raw=p.read_text();meta,end=json.JSONDecoder().raw_decode(raw)
 if meta.get('published') is False:continue
 body=raw[end:].strip();parts=re.split(r'^## ',body,flags=re.M)
 leads=[v for v in parts[0].split('\n\n') if v.strip()]
 sections=[]
 for part in parts[1:]:
  heading,_,text=part.partition('\n');sections.append({'heading':heading,'paragraphs':[v.strip().replace('\n',' ') for v in text.strip().split('\n\n') if v.strip()]})
 for locale in ['ko','es']:
  label=meta['slug']+'/'+locale;target=root/'src/data/blog-translations'/f"{meta['slug']}.{locale}.json"
  if not target.exists():failures.append(label+': missing');continue
  d=json.loads(target.read_text());checked+=1
  for field in ['intro','takeaway']:
   if not isinstance(d.get(field),str) or not d[field].strip():failures.append(label+': missing '+field)
  if d.get('sourceHash')!=hashlib.sha256(raw.encode()).hexdigest():failures.append(label+': stale master hash')
  if len(d.get('sections',[]))!=len(sections):failures.append(label+': section count')
  if len(d.get('leadParagraphs',[]))!=len(leads):failures.append(label+': lead paragraph count')
  for i,(a,b) in enumerate(zip(sections,d.get('sections',[]))):
   if not b.get('heading','').strip():failures.append(label+': empty heading '+str(i))
   if len(a['paragraphs'])!=len(b.get('paragraphs',[])):failures.append(label+': paragraph count '+str(i))
   for j,(x,y) in enumerate(zip(a['paragraphs'],b.get('paragraphs',[]))):
    if not isinstance(y,str) or not y.strip():failures.append(label+f': empty paragraph {i}/{j}')
    elif len(y)<len(x)*0.25:failures.append(label+f': suspiciously short paragraph {i}/{j}')
    urls=lambda t:sorted(re.findall(r'https?://[^\s)\]>]+',t))
    if urls(x)!=urls(y):failures.append(label+f': source URL mismatch {i}/{j}')
    # Numbers should remain explicit in legal translations. Separators and sentence order may
    # be localized; preserve the count of each explicit numeric value.
    nums=numeric_tokens
    if Counter(nums(x))-Counter(nums(y)):failures.append(label+f': numeric review needed {i}/{j}: {nums(x)} != {nums(y)}')
print(json.dumps({'checked':checked,'passed':not failures,'failures':failures},ensure_ascii=False,indent=2))
sys.exit(bool(failures))
