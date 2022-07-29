import io
import json
import re


def count_syllables():
	pass

def process():
	out=io.open("../lists/rhymes_lists.json","w+",encoding="utf8")

	names=io.open("names.txt","r",encoding="utf8").read().splitlines()

	nouns="\n".join(json.loads(io.open("EN_1syl_nouns_list.json","r",encoding="utf8").read()))
	adjs="\n".join(json.loads(io.open("EN_1syl_adjectives_list.json","r",encoding="utf8").read()))

	d={}

	for name in names:
		name_rhyme = re.findall(r"[aeiyou].*",name,re.I)[0]
		pattern=str("^\w?[^aeiyou\n]{rhyme}$".format(rhyme=name_rhyme.lower()))
		found_nouns=re.findall(pattern,nouns,re.M)
		found_adjs=re.findall(pattern,adjs,re.M)
		if found_nouns!=[] or found_adjs!=[]:
			d[name]={}
			if found_nouns!=[]:
				d[name]["noun"] = found_nouns
			if found_adjs!=[]:
				d[name]["adj"] = found_adjs
	print("{} name".format(len(d.keys())))
	obj = json.dumps(d,ensure_ascii=False, indent=4)
	out.write(obj)
	out.close()


process()