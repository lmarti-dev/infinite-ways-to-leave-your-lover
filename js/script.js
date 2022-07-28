


function load_files() {
	var rhymes_lists;
	var verbs_list;
	var simple_verbs_lists;
	var simple_adjs_list;
	$.ajax(
		{
			url: "files/lists/rhymes_lists.json",
			mimeType: "json",
			async: false,
			success: function(data)
			{
				rhymes_lists = data;
				
			}
		});
	$.ajax(
		{
			url: "files/lists/verbs_list.json",
			mimeType: "json",
			async: false,
			success: function(data)
			{
				verbs_list = data;
				
			}
		});
	$.ajax(
		{
			url: "files/lists/simple_verbs_list.json",
			mimeType: "json",
			async: false,
			success: function(data)
			{
				simple_verbs_list = data;
				
			}
		});
	$.ajax(
		{
			url: "files/lists/simple_adjs_list.json",
			mimeType: "json",
			async: false,
			success: function(data)
			{
				simple_adjs_list = data;
				
			}
		});
		
		console.log(rhymes_lists)
		console.log(verbs_list)
		
		return [rhymes_lists,verbs_list,simple_verbs_list,simple_adjs_list]
}

var random_dict_item = function(obj) {
	return obj[random_key(obj)]
	}

var random_key = function (obj) {
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
};
var random_array_item = function (arr) {
    return arr[arr.length * Math.random() << 0];
};



function cap_first(s){
	return s[0].toUpperCase() + s.substring(1) 
	}

function is_not_empty(array){
	return Array.isArray(array) && array.length
	}
	
function starts_with_vowel(word){
	return /[aeiou]/i.test(word[0]);
}

var add_line = function(rhymes_lists,verbs_list,simple_verbs_list,simple_adjs_list) {
	
		
		
		var name = random_key(rhymes_lists)
		
		var expression_type = random_key(rhymes_lists[name])
		
		var thing = random_dict_item(rhymes_lists[name][expression_type])
		possible_prepend=["Ooh,"]
		if (expression_type === "noun"){
			if (Math.random() < .9){
				var verb = random_array_item(verbs_list)
				var expression = verb+" the "+thing+", "+name
			}
			else {
				var simple_verb = random_array_item(simple_verbs_list)
				var simple_adj = random_array_item(simple_adjs_list)
				article = "a"
				if (starts_with_vowel(simple_adj)){
					article = "an"
				}
				var expression = simple_verb+" "+article+" "+simple_adj+ " "+thing+", "+name
			}
			possible_prepend.push("Just")
		}
		else if (expression_type === "adj"){
			var expression = "no need to be "+thing+", "+name
		}
		
		if (Math.random() > .9){
			expression = random_array_item(possible_prepend) + " " + expression
		}
		
	$("div.canvas").append(cap_first(expression))
	$("div.canvas").append("<br>")
	return expression_type
	}


function cap_chorus(last_expression){
	possible_expressions=["You just listen to me", "Just get yourself free","You just listen to me"]
	if (expression_type === "noun"){
		possible_expressions.push("And get yourself free","And just listen to me")
	}
	$("div.canvas").append(random_array_item(possible_expressions))
	$("div.canvas").append("<br>")
	$("div.canvas").append("<br>")
	}

function main() {

	files = load_files()

	$("#genb").click( function() {
		for (i=0;i<3;i++){
			expression_type=add_line(files[0],files[1],files[2],files[3])
		}
		cap_chorus(expression_type)
		$('#bottom')[0].scrollIntoView();
	})
}

document.addEventListener('DOMContentLoaded', (event) => {
  main()
});