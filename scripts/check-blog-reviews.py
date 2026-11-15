#!/usr/bin/env python3
"""Prevent confirmed attorney review credits from surviving content changes."""
import hashlib,json,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
records=json.loads((root/'content/blog-review-confirmations.json').read_text())['articles']
supp=json.loads((root/'content/learning/source-depth-supplements.json').read_text())
plans=json.loads((root/'content/learning/reading-plans.json').read_text())
errors=[]
for slug,record in records.items():
 p=root/'content/blog'/f'{slug}.md'
 if not p.exists(): errors.append(slug+': missing article');continue
 raw=p.read_text();meta,_=json.JSONDecoder().raw_decode(raw)
 # An explicit pending revision suppresses its public review credit. Record
 # remains as historical evidence; never silently approve a changed version.
 if meta.get('reviewStatus')!='approved': continue
 payload={'markdown':raw,'supplement':supp.get(slug),'readingPlan':plans.get(slug)}
 digest=hashlib.sha256(json.dumps(payload,ensure_ascii=False,sort_keys=True).encode()).hexdigest()
 if digest!=record['contentHash'] or meta.get('reviewedBy')!=record['reviewedBy']:
  errors.append(slug+': confirmed version changed; mark pending review or obtain a new confirmation')
print(json.dumps({'confirmedVersions':len(records),'passed':not errors,'failures':errors},indent=2))
sys.exit(bool(errors))
