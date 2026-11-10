"""Verify rendered title, description and H1 against the approved source map."""
import json,re
from pathlib import Path
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[1]
class Metadata(HTMLParser):
 def __init__(self):super().__init__();self.in_title=False;self.in_h1=False;self.title=[];self.h1=[];self.descriptions=[];self.h1_count=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='title':self.in_title=True
  if tag=='h1':self.in_h1=True;self.h1_count+=1
  if tag=='meta' and a.get('name')=='description':self.descriptions.append(a.get('content',''))
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if tag=='h1':self.in_h1=False
 def handle_data(self,data):
  if self.in_title:self.title.append(data)
  if self.in_h1:self.h1.append(data)
norm=lambda x:re.sub(r'\s+',' ',x).strip()
rows=json.loads((ROOT/'reference/seo/competitors/dklaw/2026-11-10/metadata-alignment.json').read_text())
for r in rows:
 p=Metadata();p.feed((ROOT/'.output/public'/r['path'].strip('/')/'index.html').read_text())
 actual={'h1':norm(''.join(p.h1)),'title':norm(''.join(p.title)),'description':norm(p.descriptions[0]) if p.descriptions else ''}
 assert p.h1_count==1 and len(p.descriptions)==1,('Duplicate/missing metadata',r['path'])
 for key,value in actual.items():assert value==norm(r[key]),(r['path'],key,value,r[key])
print(f'Verified source-aligned title, description and single H1 on {len(rows)} built English pages.')
