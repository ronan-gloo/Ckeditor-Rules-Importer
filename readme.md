CKEDITOR css rules importer
============================

This plugin allow you to import in dropdown menu css class declarations from a file.

How to use it
---------------------------------------

Load plugin and set path to your css file in config.js:

`CKEDITOR.editorConfig = function( config )
{
    config.extraPlugins = 'rulesimport';
	config.rulesimport_filepath = 'http://example.com/ckstyles.css';
};`

Add the plugin to your toolbar ("RulesImport")

ATM, you'll need to link the file manually in your html page