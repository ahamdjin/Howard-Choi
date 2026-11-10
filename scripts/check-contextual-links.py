"""Verify curated body links, incoming paths and publishable destinations.
Uses built HTML, excluding navigation, rails, headers and footer links.
"""
import json,re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parents[1]
class BodyLinks(HTMLParser):
 def __init__(self):super().__init__();self.stack=[];self.links=[];self.current=None
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='a' and any(t in ('main','article') for t in self.stack) and any(t in ('p','li') for t in self.stack) and not any(t in ('nav','aside','header','footer') for t in self.stack):
   href=a.get('href','')
   if href.startswith('/') and not href.startswith('//'):self.current={'to':urlsplit(href).path.rstrip('/') or '/','anchor':'','placement':'paragraph' if 'p' in self.stack else 'list'}
  if tag not in ('area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'):self.stack.append(tag)
 def handle_endtag(self,tag):
  if tag=='a' and self.current:
   self.current['anchor']=' '.join(self.current['anchor'].split());self.links.append(self.current);self.current=None
  if tag in self.stack:self.stack=self.stack[:len(self.stack)-1-self.stack[::-1].index(tag)]
 def handle_data(self,data):
  if self.current:self.current['anchor']+=data
rows=json.loads((ROOT/'reference/seo/competitors/dklaw/2026-11-10/metadata-alignment.json').read_text())
paths=[r['path'] for r in rows]+['/about/our-difference','/about/what-to-expect','/about/zero-fee-guarantee']
graph=[]
for path in paths:
 p=BodyLinks();p.feed((ROOT/'.output/public'/path.strip('/')/'index.html').read_text())
 graph.extend({'from':path,**a} for a in p.links if a['to']!=path)
plan=json.loads((ROOT/'scripts/fixtures/editorial-links/planned-edits.json').read_text())
for edit in plan:
 targets=re.findall(r'\]\((/[^)]+)\)',edit.get('text','')) or [edit['to']]
 for target in targets:assert any(e['from']==edit['from'] and e['to']==target for e in graph),('Missing planned body link',edit['from'],target)
all_sources={r['path'] for r in rows}
no_incoming=[p for p in all_sources if not any(e['to']==p and e['from']!=p for e in graph)]
assert not no_incoming,('No incoming body link',no_incoming)
# Unpublished drafts must never be destinations of these editorial links.
drafts=set()
for p in (ROOT/'content/blog').glob('*.md'):
 try:m,_=json.JSONDecoder().raw_decode(p.read_text())
 except ValueError:continue
 if m.get('published') is False:drafts.add('/blogs/'+m['slug'])
assert not [e for e in graph if e['to'] in drafts],'Body links to unpublished drafts'
assert not [e for e in graph if not e['anchor']],'Empty anchor text'
before=json.loads((ROOT/'scripts/fixtures/editorial-links/before.json').read_text())
old_edges={(e['from'],e['to']) for e in before}
new_edges=sorted({(e['from'],e['to']) for e in graph}-old_edges)
result={'bodyLinks':graph,'newSourceTargetPairs':new_edges,'sourcePages':len(paths),'mappedPagesWithIncomingBodyLinks':len(all_sources),'plannedEditsVerified':len(plan),'draftTargets':[],'definition':'Links inside reading-content paragraphs or lists, excluding navigation, headers, footers and reading rails.'}
(ROOT/'output/seo').mkdir(parents=True,exist_ok=True)
(ROOT/'output/seo/2026-11-10-context-links-after.json').write_text(json.dumps(result,indent=2)+'\n')
print(f'Verified {len(plan)} curated edits, {len(new_edges)} new source-target pairs, incoming body links to all {len(all_sources)} mapped pages, and no draft targets.')
