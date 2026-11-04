"""Validate complete local translations against the current English master.

Structural/fact checks support manual review; they do not certify legal advice.
"""
from collections import Counter
import hashlib
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'src/data/locations'
LOCKED = {'id', 'slug', 'practice', 'href', 'name', 'county', 'sectionId', 'image', 'kind'}
# Proper city names remain unchanged in Spanish navigation labels.
UNCHANGED_LABELS = {'Uber & Lyft', 'Howard Choi', 'Anaheim', 'Fullerton', 'Cypress', 'La Mirada', 'Buena Park', 'La Habra', 'Garden Grove', 'Cerritos', 'Whittier', 'Norwalk'}


def check(source, target, at='', key=''):
    if isinstance(source, dict):
        assert isinstance(target, dict) and set(source) == set(target), f'{at}: different keys'
        for k in source:
            check(source[k], target[k], f'{at}.{k}', k)
    elif isinstance(source, list):
        assert isinstance(target, list) and len(source) == len(target), f'{at}: different list length'
        for i, (a, b) in enumerate(zip(source, target)):
            check(a, b, f'{at}[{i}]', key)
    elif isinstance(source, str):
        assert isinstance(target, str) and target.strip(), f'{at}: empty or invalid translation'
        if key in LOCKED:
            assert target == source, f'{at}: changed identifier or URL'
        else:
            assert target != source or source in UNCHANGED_LABELS, f'{at}: untranslated English text'
            source_numbers = Counter(re.findall(r'\d+(?:[.,-]\d+)*', source))
            target_numbers = Counter(re.findall(r'\d+(?:[.,-]\d+)*', target))
            assert not source_numbers - target_numbers, f'{at}: missing numeric values'
            # Korean may naturally render "two-year" as "2년". Accept only
            # additions supported by a spelled-out number in this same string.
            words = {'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5'}
            written = Counter(words[word.lower()] for word in re.findall(r'\b(?:one|two|three|four|five)\b', source, re.I))
            assert not (target_numbers - source_numbers) - written, f'{at}: unsupported numeric values'
            assert re.findall(r'https?://\S+', source) == re.findall(r'https?://\S+', target), f'{at}: embedded URLs differ'
    else:
        assert target == source, f'{at}: value differs'


def main():
    checked = 0
    mirrored = json.loads((ROOT / 'src/data/locationExperienceRegistry.json').read_text())['mirrored']
    for slug in mirrored:
        source_path = DATA / f'{slug}.en.json'
        assert source_path.exists(), f'{slug}: missing English master'
        source = json.loads(source_path.read_text())
        digest = hashlib.sha256(source_path.read_bytes()).hexdigest()
        for locale in ('es', 'ko'):
            path = DATA / source_path.name.replace('.en.json', f'.{locale}.json')
            assert path.exists(), f'{path.name}: missing translation'
            target = json.loads(path.read_text())
            assert target['sourceHash'] == digest, f'{path.name}: English source changed'
            assert target['reviewStatus'] == 'reviewed-for-source-parity', f'{path.name}: source comparison still pending'
            check(source, target['content'], path.name)
            checked += 1
    assert checked, 'No location translations checked'
    print(f'Checked {checked} location translations for source freshness, coverage, identifiers, URLs and numeric values.')


if __name__ == '__main__':
    main()
