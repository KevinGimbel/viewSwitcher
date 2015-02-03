var View = (function() {
  var VIEW_ATTRIBUTE = 'data-view',
      VIEW_ATTRIBUTE_NAME = 'view',
      url = window.location.hash,
      pageTitle = document.querySelector('head title'),
      originalTitle = pageTitle.textContent,
      TITLE_DEVIDER = '&mdash;',
      ERROR_VIEW = document.querySelector('[' + VIEW_ATTRIBUTE + '="error"]'); 


  var views = document.querySelectorAll('[' + VIEW_ATTRIBUTE + ']');
  
  Array.prototype.forEach.call(views, function(view) {
     view.style.display = 'none'; 
  });

  // setters

  //
  // Set a new URL or VIEW to be active, this
  // also hides all other open views!
  //
  function _setActive(url) {
      var viewSelector = '[' + VIEW_ATTRIBUTE + '="' + url + '"]';
      var view = document.querySelector(viewSelector); 
      
      if(!view) {
        view = ERROR_VIEW;
      }
       
      View.setTitle(view.dataset[VIEW_ATTRIBUTE_NAME]);
      View.setHash(url);
      
      Array.prototype.forEach.call(views, function(view) {
         view.style.display = 'none';    
      });

      view.style.display = 'block';
    }


  // Update the page's hash.
  function _setHash(hash) {
    window.location.hash = hash;
  }

  function _setTitle(title) {
    var titleFirstLetter = title.slice(0,1),
        titleRemaining = title.slice(1),
        title = titleFirstLetter.toUpperCase() + titleRemaining; 
    pageTitle.innerHTML = title + ' '+ TITLE_DEVIDER +' ' + originalTitle;
  }
  
  function _initActive(defaultView) {
    if(window.location.hash) {
      View.setActive(window.location.hash.replace('#', ''));
    } else {
      View.setActive(defaultView);
    }
  }



 // get the current hash
  function _getHash() {
    return url;
  }


 // 
 // Auto-Generate Basic HTML markup
 // 
 // @params {String} - Class Name(s) 
 //
 function _createMenuHtml(className) {
   var output = '<ul>';
   
   Array.prototype.forEach.call(views, function(view) {
       if(view.dataset.view === '404' || view.dataset.view === 'error') {
          // return nothing and skip the Error Page.
          return;
       }
       output += '<li class="' + className + '"><a href="#'+ view.dataset[VIEW_ATTRIBUTE_NAME] +'">'
                  + view.dataset[VIEW_ATTRIBUTE_NAME] + '</a></li>';
   });
   
   output += '</ul>';
   
   return output;
 }
  
  return {
    getHash: _getHash,
    getHtmlMenu: _createMenuHtml,
    
    setHash: _setHash,   
    setActive: _setActive,
    setTitle: _setTitle,
    
    initActive: _initActive,
  }
}(window, document));
