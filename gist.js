var settings = null;
var originalGistList = [];
var favoriteGistList = [];


/*
function gistlogs(gistDesc, gistId, gistUrl) {
	this.gistUrl = gistUrl;
	this.gistId = gistId;
	this.gistDesc= gistDesc;

}
*/
function findId(gistId){
	for(var x = 0; x < originalGistList.length; x++){
  			if(originalGistList[x].id == gistlog.id){
				//favoriteGistList.push(gitlog.id);
				return originalGistList[x];
  			}

}}

function createGistList(ul){
	
	// from lecture demo
	//settings.favoriteGists.forEach(function(s){
	originalGistList.forEach(function (s) {
        var li = document.createElement('li');
        li.appendChild(liGists(s));
        ul.appendChild(li);});
    
}
function createFavGistList(ul){
	
	// from lecture demo
	//settings.favoriteGists.forEach(function(s){
	favoriteGistList.forEach(function (s) {
        var li = document.createElement('li');
        li.appendChild(lifGists(s));
        ul.appendChild(li);});
    
}
function lifGists(gistLog){
	
	var dl = document.createElement('dl');
  	var entry = dlfEntry('Description: ', gistLog.description, gistLog);
  	dl.appendChild(entry.dt);
  	dl.appendChild(entry.dd);
  	var entry = dlfEntry('ID: ', gistLog.id, gistLog);
  	dl.appendChild(entry.dt);
  	dl.appendChild(entry.dd);
  	var entry = dlfEntry('URL: ', gistLog.url, gistLog);

  	//url not working
  	//dl.setAttribute('href', gistLog.url);
  	dl.appendChild(entry.dt);
  	dl.appendChild(entry.dd);
  	dl.appendChild(entry.button);
  	
  	
  	
  	return dl;

}

function liGists(gistLog){
	
	var dl = document.createElement('dl');
  	var entry = dlEntry('Description: ', gistLog.description, gistLog);
  	dl.appendChild(entry.dt);
  	dl.appendChild(entry.dd);
  	var entry = dlEntry('ID: ', gistLog.id, gistLog);
  	dl.appendChild(entry.dt);
  	dl.appendChild(entry.dd);
  	var entry = dlEntry('URL: ', gistLog.url, gistLog);

  	//url not working
  	//dl.setAttribute('href', gistLog.url);
  	dl.appendChild(entry.dt);
  	dl.appendChild(entry.dd);
  	dl.appendChild(entry.button);
  	
  	
  	
  	return dl;

}
function dlfEntry(term, definition, gistLog){
	var dt = document.createElement('dt');
	var dd = document.createElement('dd');
	dt.innerText = term;
	dd.innerText = definition;
	//var favg = document.getElementById('favorites');
	var rbutton = document.createElement('button');
  	rbutton.innerHTML = "- unFavorite";
  	
	
	
	return{'dt': dt, 'dd':dd, 'button': fbutton};

}
function dlEntry(term, definition, gistLog){
	var dt = document.createElement('dt');
	var dd = document.createElement('dd');
	dt.innerText = term;
	dd.innerText = definition;
	var favg = document.getElementById('favorites');
	var fbutton = document.createElement('button');
  	fbutton.innerHTML = "+ Favorite";
  	fbutton.setAttribute("id", gistLog.id);
  	fbutton.onclick = function(){
  				var favoredGist = findId(gistLog.id);
				favoriteGistList.push(favoredGist);
				createFavGistList(document.getElementById("favorites"));

  			};

  		
  	
	
	
	return{'dt': dt, 'dd':dd, 'button': fbutton};

}



function fetchData(){
	var req = new XMLHttpRequest();
	if(!req){
		throw 'Unable to create HttpRequest.';
	}
	
	var url = 'https://api.github.com/gists/public';

	
	req.onreadystatechange = function(){ 
		if(this.readyState === 4 && this.status === 200){
			var gistLog = JSON.parse(this.responseText);
			

			for(var i = 0; i< gistLog.length; i++){
				//var gUrl = gistLog[i].url;
				//var gId = gistLog[i].id;
				//var gDesc = gistLog[i].description;
				//if(gDesc == null || gDesc == '' || gDesc == undefined){
					//gDesc = "No Description Listed.";
					if(gistLog[i].description == null || gistLog[i].description == '' || gistLog[i].description ==undefined){
						gistLog[i].description = "No Description";
					}

						originalGistList.push(gistLog[i]);
					}
			

		
			}

			//originalGistList.push(new gistlogs(gDesc, gId, gUrl));
			
			createGistList(document.getElementById("originGist"));
			
			//createGistList(document.getElementById('originGist'), gUrl, gId, gDesc);  //id in html to display
					
		
	};
	req.open('GET', url, true);
	req.send();
}



window.onload = function() {
	var settingsStr = localStorage.getItem('userSettings');
	if( settingsStr === null ) {
		settings = {'favorites':[]};
		localStorage.setItem('userSettings', JSON.stringify(settings));
	}
	else {
		settings = JSON.parse(localStorage.getItem('userSettings'));
	}
	
}

