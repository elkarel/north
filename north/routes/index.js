
/*
 * GET home page.
 */
function hasProperties(obj) {
  for(var prop in obj) {
      return true;
  }
  return false;
}

function createTree(object) {
    if( typeof object === 'object' && hasProperties(object)) {
        
        var i = 0;
        object.children = object.children || [];
        for (var property in object) {
            if (property=='undefined' || property=='text' || property=='children') {
                continue;
            }
            if (property=='type') {
                var icon = ""
                switch(object[property]) {
                  case 'string':
                      icon = 'string';
                      break;
                  case 'long':
                  case 'double':
                      icon = 'number';
                      break;
                  case 'date':
                      icon = 'date';
                      break;
                  default:
                      icon = 'generic';
                }
                object.icon = '/img/north/'+icon+'.png';
            }else{
                object[property].text = property;
                object.children.push(object[property]);
                if (hasProperties(object.children[i])) {
                    createTree(object.children[i])
                }
                delete object[property];    
            }
            i++;
        }
    }
    return object;
}

exports.index = function(req, res){
  
  var http = require('http');
  
  http.get("http://localhost:9200/_mapping", function(elasticRes) {
    elasticRes.setEncoding('utf8');
    elasticRes.on('data', function(jsonStr){
        jsonObj = JSON.parse(jsonStr);
        var treeDataObj = createTree(jsonObj);
        console.log(JSON.stringify(treeDataObj.children));
        res.render('index', { treeData: treeDataObj.children, title: 'North' });
    });
    
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    res.render('index', { title: 'Elastic Error' })
  });
  
};


