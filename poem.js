function prepare_syllables(phrase){
  for (var i = 0; i < phrase.length; i++) {
    if(is_wowel(phrase[i])){
      try {
        if(is_wowel(phrase[i + 1])){
          return phrase = phrase.substring(0, i + 1) + "~" + prepare_syllables(phrase.substring(i + 1, phrase.length));
        }
        else if(is_wowel(phrase[i + 2])){
          return phrase = phrase.substring(0, i + 1) + "~" + prepare_syllables(phrase.substring(i + 1, phrase.length));
        }
        else if(is_wowel(phrase[i + 3])){
          return phrase = phrase.substring(0, i + 2) + "~" + prepare_syllables(phrase.substring(i + 2, phrase.length));
        }
        else if(phrase.substring(i + 1, i + 4) == "str" || phrase.substring(i + 1, i + 4) == "ktr" || phrase.substring(i + 1, i + 4) == "ntr"){
          return phrase = phrase.substring(0, i + 2) + "~" + prepare_syllables(phrase.substring(i + 2, phrase.length));
        }
        else{
          return phrase = phrase.substring(0, i + 3) + "~" + prepare_syllables(phrase.substring(i + 3, phrase.length));
        }
      } catch (e) {
        return phrase;
      }
    }
  }
  return phrase;
}

function count_syllables(phrase){
  return phrase.split("~");
}

function line_syllables(phrase){
  return count_syllables(prepare_syllables(phrase)).length;
}

function is_wowel(character){
  return ['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü'].indexOf(character.toLowerCase()) !== -1
}

function addInputChangeEvents(){
  var lines = $("input");
  var info = $(".line_syllable_count");

  for (var i = 0; i < lines.length; i++) {
    lines[i].addEventListener("input", function () {
      info[this.getAttribute("line")-1].innerText = line_syllables(this.value);

      if(this.getAttribute("line")-1 == 0){
        info[this.getAttribute("line")-1].style.color = "green";
      }
      else if(info[this.getAttribute("line")-1].innerText == info[this.getAttribute("line")-2].innerText
    && info[this.getAttribute("line")-2].style.color == "green"){
        info[this.getAttribute("line")-1].style.color = "green";
      }
      else{
        info[this.getAttribute("line")-1].style.color = "#B40404";
      }

      if(this.value == ""){
        info[this.getAttribute("line")-1].style.visibility = "hidden";
      }
      else{
        info[this.getAttribute("line")-1].style.visibility = "visible";
      }
    }, false);
  }

  for (var i = 0; i < lines.length; i++) {
    lines[i].addEventListener("keydown", function (event) {
      console.log(event.keyCode);

      /*if(event.keyCode == 13 && this.getAttribute("line")-1 != lines.length-1){
        event.preventDefault();
        focusNextLine(this);
      }*/
      if(event.keyCode == 8 && this.value == ""){
        event.preventDefault();
        if(this.getAttribute("line")-1 == lines.length-1 && this.getAttribute("line") != 1){
          removeRow(this);
          addInputChangeEvents();
        }
      }
      else if(event.keyCode == 9 || event.keyCode == 13){
        if(this.getAttribute("line")-1 == lines.length-1){
          addNewTableRow(lines.length);
        }
      }
    }, false);
  }
}

function addNewTableRow(index){
  var poem_table = document.getElementById("poem");
  /*if(index % 4 == 0){
    var verse_break_row = poem_table.insertRow(index);
    verse_break_row.className += "verse_break";
  }*/
  var new_row = poem_table.insertRow(index);
  var verse_line = new_row.insertCell(0);
  verse_line.className += "verse_line";
  var verse_section_tag = document.createElement('section');
  verse_section_tag.className = "line";
  var div_tag = document.createElement('div');
  div_tag.className += "fancyInput";
  var input_tag = document.createElement('input');
  input_tag.type = "text";
  input_tag.setAttribute('line', index + 1);
  div_tag.appendChild(input_tag);
  verse_section_tag.appendChild(div_tag);
  verse_line.appendChild(verse_section_tag);

  var line_info = new_row.insertCell(1);
  line_info.className += "line_info";
  var line_info_section_tag = document.createElement('section');
  line_info_section_tag.className = "line_syllable_count";
  line_info_section_tag.innerText = "0";
  line_info.appendChild(line_info_section_tag);
  $('section :input').fancyInput();
  addInputChangeEvents();
}

function changeFontSize(option){
  var lines = $(".fancyInput");
  for (var i = 0; i < lines.length; i++) {
    lines[i].style.fontSize = option + "px";
  }
}

function removeRow(element){
  var parent = element.parentNode.parentNode.parentNode.parentNode;
  parent.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.focus();
  parent.parentNode.removeChild(parent);
}

function prepareUI(){
  addInputChangeEvents();
}
