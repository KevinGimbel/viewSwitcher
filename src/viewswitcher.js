var View = (function(window, document) {
  var VIEW_ATTRIBUTE = 'data-view',
      VIEW_ATTRIBUTE_NAME = 'view',
      url = window.location.hash,
      pageTitle = document.querySelector('head title'),
      originalTitle = pageTitle.textContent,
      TITLE_DEVIDER = '&mdash;',
      ERROR_VIEW = document.querySelector('[' + VIEW_ATTRIBUTE + '="error"]');

  var options = {
    changeTitle: true 
  }
  
  // select all the views
  var views = document.querySelectorAll('[' + VIEW_ATTRIBUTE + ']');
  
  // hide all views by default.
  // @TODO this should may be optional.
  Array.prototype.forEach.call(views, function(view) {
     view.style.display = 'none'; 
  });



  // SETTERS
  
  //
  // Set Options to configure viewSwitcher before
  // using it. This needs to be called first!
  // 
  // @param {Object} - Options Object 
  //
  function _setOptions(opts) {
    options = {
      changeTitle: opts.changeTitle
    }  
  }

  //
  // Set a new URL or VIEW to be active, this
  // also hides all other open views!
  // 
  // @param {String} - URL/Hash to display
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

  // _setHash
  // Update the page's hash.
  //
  // @param {String} - Hash
  function _setHash(hash) {
    window.location.hash = hash;
  }

  // _setTitle
  // Update the page's real title
  //
  // @param {String} - Title
  function _setTitle(title) {
    if(options.changeTitle) {
      var titleFirstLetter = title.slice(0,1),
          titleRemaining = title.slice(1),
          title = titleFirstLetter.toUpperCase() + titleRemaining; 
      pageTitle.innerHTML = title + ' '+ TITLE_DEVIDER +' ' + originalTitle;
    }
  }
  
  // _initActive
  // set a view as active view when the page loads.
  // If there is a hash present, this one will load!
  //
  // @param {String} - default View 
  function _initActive(defaultView) {
    if(window.location.hash) {
      View.setActive(window.location.hash.replace('#', ''));
    } else {
      View.setActive(defaultView);
    }
  }


 // _getHash
 // get the current hash
 //
 // @return url
  function _getHash() {
    return url;
  }


 // _createMenuHtml
 // Auto-Generate Basic HTML markup
 // 
 // @params {String} - Class Name(s)
 // @return generated HTML
 function _createMenuHtml(className) {
   var output = '<ul>';
   
   Array.prototype.forEach.call(views, function(view) {
       if(view.dataset.view === '404' || view.dataset.view === 'error' || view.dataset.viewExclude) {
          // return nothing and skip the Error Page.
          return;
       }
       output += '<li class="' + className + '">';
       output += '<a href="#'+ view.dataset[VIEW_ATTRIBUTE_NAME] +'">';
       output += view.dataset[VIEW_ATTRIBUTE_NAME] + '</a></li>';
   });
   
   output += '</ul>';
   
   return output;
 }
  
  // Public exposed functions.
  // All these functions are available
  // to the View object, like
  // View.getHash(), View.setOptions(), etc.
  return {
    getHash: _getHash,
    getHtmlMenu: _createMenuHtml,
    
    setOptions: _setOptions,   
    setHash: _setHash,   
    setActive: _setActive,
    setTitle: _setTitle,
    
    initActive: _initActive
  }
}(window, document));
