export default /*@ngInject*/function markdownDirective($window,$sanitize,markdown){
  function link(scope,el,attrs){
    function render(){
      const text = scope.$eval(attrs.markdown) || el.text() || '';
      const html = $sanitize(markdown.render(text));
      el.html(html);
      if($window.MathJax && attrs.hasOwnProperty('mathJax')){
        $window.MathJax.Hub.Queue(['Typeset', $window.MathJax.Hub, el[0]]);
      }
    }
    render();
    if(attrs.markdown){
      const clean = scope.$watch(attrs.markdown,() => {
        render();
      });
      scope.$on('$destroy',clean);
    }
  }
  return {
    restrict: 'AE',
    scope: false,
    link
  };
}