/* Name			: Css from File ckeditor plugin
*  Description	: Permet de prendre des règles css depuis un fichier css et de les assigner dans un dropdown
*  Creation		: 18/12/2010
*  Version		: 0.3
*  Author		: Tessier Ronan
*/

// déclare les éléments de configuration

CKEDITOR.plugins.add( 'rulesimport',
{
	lang : [ 'fr', 'en' ],
	requires : ['richcombo'],
	init : function( editor )
	{
		var config = editor.config, lang = editor.lang.rulesimport;
		//éléments du menu d'insertion dans le contenu de la newsletter
		var tags = findEditorStyleSheet(config.rulesimport_filepath) || [];
      
		editor.ui.addRichCombo( 'RulesImport',
		{
            label : lang.label,
            title : lang.title,
            className : 'cke_format',
            multiSelect : false,

            panel :
            {
               css : editor.skin.editor.css.concat( config.contentsCss ),
               voiceLabel : lang.panelVoiceLabel
            },

            init : function()
            {
				this.add('', lang.reset, lang.reset);
				
				this.startGroup(lang.groupLabel);
				for (var this_tag in tags) this.add(this_tag,this_tag, this_tag);
            },

            onClick : function( value )
            {
				editor.focus();
				editor.fire( 'saveSnapshot' );
				var wrapper = getWrapper(editor.getSelection());
				wrapper.setAttribute('class', value)
				editor.fire( 'saveSnapshot' );
            },
            
            onRender : function()
			{
				editor.on( 'selectionChange', function( ev )
				{
			    	// valeur actuelle dans le Dropdown
			    	var value = "", 
			    		currentValue = this.getValue(),
			    		wrapper = getWrapper(editor.getSelection()),
			    		elementClass = wrapper.getAttribute('class');
			    	
			    	value = (elementClass in tags) ? elementClass : '';
			    	
			    	this.setValue(value);
			    },
			this);
			}
		});
	}
});

// recherche le fichier css
// retiré la création dynamique du fichier css: bug avec firefox
function findEditorStyleSheet(filePath)
{	
	for (var i = 0; i <= document.styleSheets.length ; i++) 
	{
	    if (document.styleSheets[i].href == filePath)
	    {
	    	return getRules(document.styleSheets[i]);
	    }
	}
	
	return false;
}

// Construit un array avec les class déclarée dans le fichier
// les déclaration de plsieurs éléments à la fois sont ignorées.
function getRules(cssDoc)
{	
    var rulesObj = new Array(), i = 0;
    var rules = cssDoc.rules || cssDoc.cssRules;
    
    for (var x = 0; x < rules.length; x++) 
    {
    	// ne prend pas les définitions de reglègles multiples   				
    	if (rules[x].selectorText.indexOf(',') == -1 && rules[x].selectorText.indexOf('.') > -1) 
    	{
    		var ruleDeclaration = rules[x].selectorText.substring(1);
			rulesObj[ruleDeclaration] = ruleDeclaration;
    		i++;
    	}
    }
    return rulesObj;
}

function getWrapper(selection)
{	
	if (selection.getCommonAncestor().type == 3 || selection.getCommonAncestor().getName() == 'body')
	{
		selection = selection.getStartElement();
	}
	else
	{
		selection = selection.getCommonAncestor();
	}
	return selection;
}
