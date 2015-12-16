var jade = require('jade/runtime'); module.exports = {
"index": function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<!DOCTYPE html><html lang=\"de\" ng-app=\"wbt\" strict-di><head><title>" + (jade.escape(null == (jade_interp = locals.title) ? "" : jade_interp)) + "</title><meta charset=\"utf-8\"><base" + (jade.attr("href", locals.base, true, true)) + ">");
if ( locals.prod)
{
buf.push("<link" + (jade.attr("href", "https://maxcdn.bootstrapcdn.com/bootstrap/" + (locals.versions.bootstrap) + "/css/bootstrap.min.css", true, true)) + " rel=\"stylesheet\"><link" + (jade.attr("href", "https://maxcdn.bootstrapcdn.com/font-awesome/" + (locals.versions.fontAwesome) + "/css/font-awesome.min.css", true, true)) + " rel=\"stylesheet\"><script src=\"http://code.jquery.com/jquery-2.1.4.min.js\"></script><script" + (jade.attr("src", "https://ajax.googleapis.com/ajax/libs/angularjs/" + (locals.versions.angular) + "/angular.min.js", true, true)) + "></script><script" + (jade.attr("src", "https://ajax.googleapis.com/ajax/libs/angularjs/" + (locals.versions.angular) + "/angular-messages.min.js", true, true)) + "></script><script" + (jade.attr("src", "https://ajax.googleapis.com/ajax/libs/angularjs/" + (locals.versions.angular) + "/angular-aria.min.js", true, true)) + "></script><script" + (jade.attr("src", "https://ajax.googleapis.com/ajax/libs/angularjs/" + (locals.versions.angular) + "/angular-animate.min.js", true, true)) + "></script><script" + (jade.attr("src", "https://ajax.googleapis.com/ajax/libs/angularjs/" + (locals.versions.angular) + "/angular-sanitize.min.js", true, true)) + "></script><script" + (jade.attr("src", "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/" + (locals.versions.lodash) + "/lodash.min.js", true, true)) + "></script><script" + (jade.attr("src", "https://cdnjs.cloudflare.com/ajax/libs/restangular/" + (locals.versions.restangular) + "/restangular.min.js", true, true)) + "></script>");
}
else
{
buf.push("<link" + (jade.attr("href", "https://maxcdn.bootstrapcdn.com/bootstrap/" + (locals.versions.bootstrap) + "/css/bootstrap.css", true, true)) + " rel=\"stylesheet\"><link" + (jade.attr("href", "https://maxcdn.bootstrapcdn.com/font-awesome/" + (locals.versions.fontAwesome) + "/css/font-awesome.css", true, true)) + " rel=\"stylesheet\"><script src=\"http://code.jquery.com/jquery-2.1.4.js\"></script><script" + (jade.attr("src", "https://ajax.googleapis.com/ajax/libs/angularjs/" + (locals.versions.angular) + "/angular.js", true, true)) + "></script><script" + (jade.attr("src", "https://ajax.googleapis.com/ajax/libs/angularjs/" + (locals.versions.angular) + "/angular-messages.js", true, true)) + "></script><script" + (jade.attr("src", "https://ajax.googleapis.com/ajax/libs/angularjs/" + (locals.versions.angular) + "/angular-aria.js", true, true)) + "></script><script" + (jade.attr("src", "https://ajax.googleapis.com/ajax/libs/angularjs/" + (locals.versions.angular) + "/angular-animate.js", true, true)) + "></script><script" + (jade.attr("src", "https://ajax.googleapis.com/ajax/libs/angularjs/" + (locals.versions.angular) + "/angular-sanitize.js", true, true)) + "></script><script" + (jade.attr("src", "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/" + (locals.versions.lodash) + "/lodash.js", true, true)) + "></script><script" + (jade.attr("src", "https://cdnjs.cloudflare.com/ajax/libs/restangular/" + (locals.versions.restangular) + "/restangular.js", true, true)) + "></script>");
}
buf.push("<script src=\"dist/vendors.js\"></script><script src=\"dist/app.js\"></script></head><body ng-cloak><ui-view></ui-view><script src=\"https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML\"></script><script>MathJax.Hub.Config({\n  tex2jax: {\n    inlineMath: [['$','$'], ['\\\\(','\\\\)']],\n    processEscapes: true\n  }\n});</script></body></html>");;return buf.join("");
},
}