/**
 * Assigns accordion functionality to all elements having the class "accordionWrapper"
 *
 * @package Excol
 * @author Mandana Eibegger
 *          with support from eGovMon Project and
 *          W3C/WAI Education and Outreach Working Group (EOWG)
 *          see http://www.schoener.at/mewidgets/ for more information
 * @version 1.0 (17 Feb 2012)
 *
 * Basic framework and tools
 * @uses jquery-1.7.1.min.js jQuery v 1.7.1
 * @uses jquery.metools.js Tools used in the meWidgets
 *
 * Reaction to hash changes
 * @uses jquery.ba-hashchange.js jQuery hash change event
 * @uses jquery.mewidget.hashcontrol.js Handle hash change for meWidgets
 *
 * Accordion Plugin
 * @uses jquery.mewidget.panel.js Panel object
 * @uses jquery.mewidget.panelwrapper.js Panel object
 * @uses jquery.mewidget.accordion.js Accordion plug-in
 *
 * Button Templates
 * @uses controlall.html "expand/collapse all sections" button template
 * @uses controlsection.html "expand/collapse this section" button template
 *
 * Styles
 * @uses accordionInit.css Style to initialize the accordion
 * @uses accordionLoaded.css Style needed after initialization
 * @uses accordion_ie7.css Style fix for IE<=7
 * @uses accordion_ie8.css Style fix for IE<=8
 * @uses accordion_ie9.css Style fix for IE<=9
 */

/**** EDIT THIS ****/
// edit this to reflect your needs - path should probably be set absolute
var pathToResource = '//www.w3.org/WAI/scripts/excol/'; //'http://www.schoener.at/excol/';
/**** END OF EDIT ****/

/**
 * @var int Max ms to wait for each component to load
 */
var loadTimeout = 10000;
/**
 * @var int ms to poll if the component finished loading
 */
var checkTime = 100;
/**
 * @var string Paths to scripts
 */
var jQueryLocation = pathToResource+'jquery-1.7.1.min.js';
var metoolsLocation = pathToResource+'jquery.metools.min.js';
var hashchangeLocation = pathToResource+'jquery.ba-hashchange.min.js';
var hashcontrolLocation = pathToResource+'jquery.mewidget.hashcontrol.min.js';
var panelLocation = pathToResource+'jquery.mewidget.panel.min.js';
var panelwrapperLocation = pathToResource+'jquery.mewidget.panelwrapper.min.js';
var accordionLocation = pathToResource+'jquery.mewidget.accordion.min.js';
/**
 * @var string Paths to button templates
 */
var accordionControls = 'controlall.html';
var panelControls = 'controlsection.html';
/**
 * @var string Paths to accordion initialization CSSs
 */
var accordionInitCSS = pathToResource+'accordionInit.css';
var accordionLoadedCSS = pathToResource+'accordionLoaded.css';
var ie7Fix = pathToResource+'accordion_ie7.css';
var ie8Fix = pathToResource+'accordion_ie8.css';
var ie9Fix = pathToResource+'accordion_ie9.css';
/**
 * Load a CSS file at runtime
 *
 * Appends the style tag to the head
 * @param location Path to the style sheet
 */
function loadCSS ( location ) {
    var fileref = document.createElement("link");
    fileref.setAttribute('rel', 'stylesheet');
    fileref.setAttribute('type', 'text/css');
    fileref.setAttribute('href', location);
    document.getElementsByTagName("head")[0].appendChild(fileref);
}
// load the CSS for the initial state of the widgets (hides the elements, so the page does not jump, when the panels are initialised by the script and hidden)
loadCSS(accordionInitCSS);
/**
 * Load a Java Script file at runtime
 *
 * Appends the script tag to the head
 * @param location Path to the script
 */
function loadScript ( location ) {
    document.write('<script type="text/javascript" src="'+location+'"></script>');
}
/**
 * @var int loaded components
 */
var loadedComponents = 0;
/**
 * Loads the necessary script files and initialises the accordion
*/
function prepareScripts (timeElapsed) {
    if (typeof(timeElapsed)=="undefined") timeElapsed = 0;
    // loads and polls to see if jQuery is loaded.
    if (typeof($) == "undefined"
            || typeof($().accordion) == "undefined"
            || typeof($().panel) == "undefined"
            || typeof($().panelwrapper) == "undefined") { // scripts not loaded yet...

        if (timeElapsed==0) {   // start loading scripts
            loadScript(jQueryLocation);
            loadScript(metoolsLocation);
            loadScript(hashchangeLocation);
            loadScript(hashcontrolLocation);
            loadScript(panelLocation);
            loadScript(panelwrapperLocation);
            loadScript(accordionLocation);
        }
        if (timeElapsed <= loadTimeout) // load in progress and not timed out
            setTimeout(function () {
                        prepareScripts(timeElapsed + checkTime);
                       }, checkTime); // set a timer to check if jQuery is loaded

        else
            alert("Timed out while loading scripts.")

    } else {
        // load IE style fixes and assign the accordion functionality
        $(document).ready( function() {

            // load IE style fixes
            if ($.browser.msie) {
                if ($.browser.version<10)
                    loadCSS(ie9Fix);
                if ($.browser.version<9)
                    loadCSS(ie8Fix);
                if ($.browser.version<8)
                    loadCSS(ie7Fix);
            }

            // assign accordion
            $(".accordionWrapper").accordion({'panelControls' : panelControls, 'widgetLoadedCSS' : accordionLoadedCSS, 'slideAnim' : true, 'headIsTabDefault' : true, 'panelStartClosedDefault' : true});
        });
    }
}
prepareScripts();
