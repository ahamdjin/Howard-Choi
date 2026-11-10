#!/usr/bin/env python3
"""Validate explicit page visual coverage and placement in the production build."""
import argparse
import json
from urllib.request import urlopen
from pathlib import Path
from bs4 import BeautifulSoup

parser = argparse.ArgumentParser()
parser.add_argument('--origin', required=True, help='Running local production server, including its port')
args = parser.parse_args()
ROOT = Path(__file__).resolve().parents[1]
plans = json.loads((ROOT / 'src/data/page-visual-plans.json').read_text())
expected = {r['path'] for r in json.loads((ROOT / 'reference/seo/competitors/dklaw/2026-11-10/metadata-alignment.json').read_text())}
expected |= {'/about', '/attorney', '/results', '/about/our-difference', '/about/what-to-expect', '/about/zero-fee-guarantee'}
assert set(plans) == expected, 'Page visual plan coverage differs from the selected English scope'
assert len({p['title'] for p in plans.values()}) == len(plans), 'Repeated visual headline'
for path, plan in plans.items():
    built = ROOT / '.output/public' / path.strip('/') / 'index.html'
    source = built.read_text() if built.is_file() else urlopen(args.origin.rstrip('/') + path, timeout=15).read().decode()
    soup = BeautifulSoup(source, 'html.parser')
    figures = soup.select('[data-visual-page]')
    assert len(figures) == 1, (path, 'Expected exactly one explicit page visual', len(figures))
    figure = figures[0]
    assert figure['data-visual-page'] == path, (path, 'Wrong visual plan selected')
    assert figure.get('id') == 'page-visual', path
    assert 'visual-study--' + plan['layout'] in figure['class'], path
    assert plan['title'] in figure.get_text(' ', strip=True), (path, 'Missing page-specific headline')
    position = plan['afterSection']
    if position >= 0:
        if path.startswith('/blogs/'):
            selector = 'section[id^="article-section-"]'
        elif path.startswith('/about/'):
            selector = 'section[id^="firm-section-"]'
        elif path.startswith('/faqs/') or path.startswith('/injury-types/') or path in {'/practice-areas/dog-bites', '/practice-areas/bicycle-accidents'}:
            selector = 'section[id^="resource-section-"]'
        else:
            selector = 'section[id^="service-depth-"]'
        sections = soup.select(selector)
        assert position < len(sections), (path, 'Planned section no longer exists')
        nodes = list(soup.descendants)
        start = next(i for i, n in enumerate(nodes) if n is sections[position])
        visual = next(i for i, n in enumerate(nodes) if n is figure)
        assert start < visual, (path, 'Visual appears before its intended section')
        if position + 1 < len(sections):
            next_start = next(i for i, n in enumerate(nodes) if n is sections[position + 1])
            assert visual < next_start, (path, 'Visual appears after the wrong section')
print(f'Verified {len(plans)} explicit page visuals: unique headlines, correct routes, one visual each, and section-specific placement.')
