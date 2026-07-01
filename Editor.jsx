import { React, useRef, useEffect, useState, useCallback } from 'react';
import { importScript, importCss } from 'vvvebjs/import-script';

const initBuilder = function (props) {
	let pages = props.pages || {};
	let startTemplates = props.startTemplates || {};
	let firstPage = Object.keys(pages)[0];

	Vvveb.MediaModal = new MediaModal(true);
	
	if (props.onReady) {
		props.onReady(Vvveb);
	}

	Vvveb.Builder.init(pages[firstPage]["url"], function () {
		if (props.onInit) {
			return props.onInit(Vvveb);
		}
		//load code after page is loaded here
	});

	Vvveb.Gui.init();
	Vvveb.FileManager.init();

	Vvveb.SectionList.init();
	if (props.sectionList) {
	} else {
		document.getElementById("sections-tabs").style.display = "none";
	}

	if (props.styleList) {
		Vvveb.StyleList.init();
	}

	Vvveb.TreeList.init();
	if (props.treeList) {
	} else {
		Vvveb.Gui.toggleTreeList();
	}

	if (props.cssEditor) {
		Vvveb.CssEditor.init();
	}

	Vvveb.Breadcrumb.init();

	Vvveb.FileManager.addPages(pages);
	Vvveb.FileManager.loadPage(pages[firstPage]["name"]);


	if (typeof props.fileManager != "undefined" && !props.fileManager) {
		Vvveb.Gui.toggleFileManager(false);
	}

	if (typeof props.rightColumn != "undefined" && !props.fileManager) {
		Vvveb.Gui.toggleRightColumn(false);
	} else {
		Vvveb.Gui.toggleRightColumn(true);
	}
	
	if (startTemplates) {
		let select = document.querySelector("[name=startTemplateUrl]");
		select.replaceChildren();
		for (const template in startTemplates) {
			select.add(new Option(startTemplates[template]["name"], template));
		}
	}
	
	document.querySelectorAll("[src^='libs/builder/']").forEach(e => e.setAttribute("src", e.getAttribute("src").replaceAll('libs/builder/', Vvveb.baseUrl)));
	document.querySelector("[data-vvveb-action=save]").removeAttribute("data-vvveb-url");

	Vvveb.MediaModal.mediaPath = window.mediaPath;

	if (props.onEditor) {
		return props.onEditor(Vvveb);
	}
}

function Editor(props) {
	const containerRef = useRef(null);
	const vvvebRef = useRef(null);
	//const [htmlContent, setHtmlContent] = useState('');
	let htmlContent;


	let defaults = {
		theme: 'auto',
		assets: [
			'vvvebjs/libs/media/media.css',
			'vvvebjs/libs/autocomplete/autocomplete.css',
			'vvvebjs/libs/coloris/coloris.min',
			'vvvebjs/libs/coloris/coloris.min.css',
			'vvvebjs/libs/codemirror/lib/codemirror',
			'vvvebjs/libs/codemirror/lib/xml',
			'vvvebjs/libs/codemirror/lib/css',
			'vvvebjs/libs/codemirror/lib/formatting',
			'vvvebjs/libs/codemirror/lib/codemirror.css',
			'vvvebjs/libs/codemirror/theme/duotone-dark.css'

		],
		components: ['common', 'html', 'elements', 'embeds', 'embeds', 'widgets', 'embeds'],
		sections: ['bootstrap4'],
		blocks: ['bootstrap4'],
		plugins: ['coloris', 'aos', 'google-fonts', 'codemirror'],
		editorHtml: 'vvvebjs/editor.html'
	};

	props = { ...defaults, ...props };
	const request = new XMLHttpRequest();
	request.open('GET', props.editorHtml , false); // `false` makes the request synchronous
	request.send(null);

	if (request.status === 200) {
		htmlContent = request.responseText.match(/<body[^>]*>(.+)<\/body>/s)[1] ?? request.responseText;
		//htmlContent = htmlContent.replaceAll('libs/builder/', Vvveb.baseUrl);
	}
	
	useEffect(() => {
		if (vvvebRef.current === null) {
			vvvebRef.current = containerRef.current;
			/*
			fetch('vvvebjs/editor.html')
				.then((response) => response.text())
				.then((htmlString) => {
					setHtmlContent(htmlString);
				});
			*/
		}

		import('vvvebjs/css/editor.css');

		const init = async () => {
			await importScript('vvvebjs/js/bootstrap.min');
			await importScript('vvvebjs/libs/builder/builder');
			await importScript('vvvebjs/libs/builder/undo');
			await importScript('vvvebjs/libs/builder/inputs');
			await importScript('vvvebjs/libs/media/media');
			await importScript('vvvebjs/libs/builder/section');
			await importScript('vvvebjs/libs/builder/oembed');
			await importScript('vvvebjs/libs/autocomplete/autocomplete');
			await importScript('vvvebjs/libs/builder/plugin-media');

			for (let asset of props.assets) {
				if (asset.endsWith(".css")) {
					await importCss(asset);
				} else {
					await importScript(asset);
				}
			}

			for (let component of props.components) {
				await importScript(`vvvebjs/libs/builder/components-${component}`);
			}

			for (let section of props.sections) {
				await importScript(`vvvebjs/libs/builder/sections-${section}`);
			}

			for (let block of props.blocks) {
				await importScript(`vvvebjs/libs/builder/blocks-${block}`);
			}

			for (let plugin of props.plugins) {
				await importScript(`vvvebjs/libs/builder/plugin-${plugin}`);
			}

			initBuilder(props);
		}

		init();
	});

	return (
		<div id="vvvebjs" ref={containerRef} data-bs-theme={props.theme || 'auto'}>
			<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
		</div>
	);
}

export default Editor

