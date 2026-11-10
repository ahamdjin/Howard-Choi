"""Refresh small resource summaries from their editable page/Markdown sources."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
catalog_path=root/'content/learning/catalog.json'
catalog=json.loads(catalog_path.read_text())
pages=json.loads((root/'content/learning/dklaw-authorized.json').read_text())
by_path={r['path']:r for r in pages}
for item in catalog:
 if item['path'] in by_path:
  item.update(by_path[item['path']])
 elif item['kind']=='guide' and item['slug']!='ca-car-accident-101':
  raw=(root/'content/blog'/f"{item['path'].split('/')[-1]}.md").read_text()
  meta,_=json.JSONDecoder().raw_decode(raw)
  item['title']=meta['title'];item['metaTitle']=meta['metaTitle'];item['description']=meta['excerpt']
 item['sections']=[{'heading':s['heading'],'paragraphs':[]} for s in item['sections']]
catalog_path.write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
print(f'Refreshed {len(catalog)} resource summaries.')
