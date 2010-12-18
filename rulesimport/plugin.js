/* Name			: Css from File ckeditor plugin
*  Description	: Peret de prendre des class depuis un fichier css et de les assigner depuis un dropdown
*  TODO			: Spécifier le chemin du fichier css / détection des classes à la selection / détection des tags dans
* les règles du fichier css
*  Creation		: 18/12/2010
*  Version		: 0.1
*  Author		: Tessier Ronan
*/

CKEDITOR.plugins.add( 'egcssimport',
{   
   requires : ['richcombo'],
   init : function( editor )
   {
      var config = editor.config,lang = editor.lang.format;

	  var tags = findEditorStyleSheet('ckstyles') || [];
	  tags.unshift(['', 'Défaut', 'Défaut']);
      
      editor.ui.addRichCombo( 'CssClass',
         {
            label : "Insérer des élements prédéfinis",
            title : "Insérer élements prédéfinis",
            voiceLabel : "Insérer élements prédéfinis",
            className : 'cke_format',
            multiSelect : false,

            panel :
            {
               css : [ config.contentsCss, CKEDITOR.getUrl( editor.skinPath + 'editor.css' ) ],
               voiceLabel : lang.panelVoiceLabel
            },

            init : function()
            {
				this.startGroup( "Décorations" );
				for (var this_tag in tags){
					this.add(tags[this_tag][0], tags[this_tag][1], tags[this_tag][2]);
               }
            },

            onClick : function( value )
            {
				editor.focus();
				editor.fire( 'saveSnapshot' );
            	var mSelection = editor.getSelection().getStartElement(); // objet sélectionné, transformé en "element"
            	mSelection.setAttribute('class', value);
				editor.fire( 'saveSnapshot' );
            }
		});
   }
});

function findEditorStyleSheet(title) {
	for (var i = 0; i <= document.styleSheets.length ; i++) 
	{
		if (document.styleSheets[i].href.indexOf(title+'.css') > -1) 
			return getRules(document.styleSheets[i]);
	}
	return false;
}


function getRules(cssDoc) {
    var rulesObj = new Array();
    var rules = cssDoc.rules || cssDoc.cssRules;
    var i = 0;
    for (var x = 0; x < rules.length; x++) 
    { 				
    	if (rules[x].selectorText.indexOf(',') == -1 && rules[x].selectorText.indexOf('.') > -1) 
    	{
    		var ruleDeclaration = rules[x].selectorText.substring(1);
			rulesObj[i] = [ruleDeclaration, ruleDeclaration, ruleDeclaration];
    		i++;
    	}
    }
    return rulesObj;
}