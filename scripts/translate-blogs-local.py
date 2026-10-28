import json,urllib.request,re,hashlib,sys
# Explicit local-only translation drafts. Requires the existing Ollama model;
# never installs a model or calls a paid/external language service.
from pathlib import Path
root=Path(__file__).resolve().parents[1]; dest=root/'src/data/blog-translations';dest.mkdir(exist_ok=True)
model='hf.co/alexdenton/Qwen3.5-35B-A3B-heretic-GGUF:Q4_K_M'
def parse(p):
 raw=p.read_text();fm,end=json.JSONDecoder().raw_decode(raw);body=raw[end:].strip();lead=body.split('## ',1)[0].strip();sections=[]
 for part in re.split(r'^## ',body,flags=re.M)[1:]:
  h,_,text=part.partition('\n');sections.append({'heading':h.strip(),'paragraphs':[x.strip().replace('\n',' ') for x in text.strip().split('\n\n') if x.strip()]})
 return fm,{'intro':fm['intro'],'takeaway':fm['takeaway'],'leadParagraphs':[x.strip().replace('\n',' ') for x in lead.split('\n\n') if x.strip()],'sections':sections},hashlib.sha256(raw.encode()).hexdigest()
failed=False
for locale,lang in [('es','Spanish'),('ko','Korean')]:
 for p in sorted((root/'content/blog').glob('*.md')):
  fm,source,sha=parse(p)
  if fm.get('published') is False:continue
  target=dest/(fm['slug']+'.'+locale+'.json')
  if target.exists() and json.loads(target.read_text()).get('sourceHash')==sha:continue
  print('START',locale,fm['slug'],flush=True)
  prompt='Translate this California personal-injury legal article into natural '+lang+'. Translate EVERY sentence fully, without summaries, additions, omissions or changing legal meaning. Preserve every JSON key, section order, paragraph count, numbers, dates, statutory references and exact URLs. Do not translate URLs. Do not add Markdown fences. Output ONLY the complete JSON object. English is the factual master; translations must convey identical facts and qualifications.\n'+json.dumps(source,ensure_ascii=False)
  req=urllib.request.Request('http://localhost:11434/api/generate',data=json.dumps({'model':model,'prompt':prompt,'stream':False,'think':False,'format':'json','options':{'temperature':0,'num_ctx':16384,'num_predict':14000}}).encode(),headers={'Content-Type':'application/json'})
  try:
   d=json.load(urllib.request.urlopen(req,timeout=1800));raw=d['response'];data=json.loads(raw)
   assert len(data['sections'])==len(source['sections'])
   assert len(data['leadParagraphs'])==len(source['leadParagraphs'])
   for a,b in zip(source['sections'],data['sections']):assert len(a['paragraphs'])==len(b['paragraphs'])
   data['sourceHash']=sha;data['reviewStatus']='translation-draft-pending-legal-language-review';target.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n');print('DONE',locale,fm['slug'],d.get('eval_count'),flush=True)
  except Exception as e:
   failed=True
   print('ERROR',locale,fm['slug'],str(e),flush=True)

sys.exit(1 if failed else 0)
