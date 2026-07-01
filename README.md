# VvvebJS React

[VvvebJS](https://github.com/VvvebJs) wrapper for React.

[Example](https://github.com/VvvebJs/react-example) React router dashboard example.

## Installation

```sh
npm i vvvebjs @vvvebjs/react
```

### Example

This is a simple example that loads and saves pages from local storage, 

```js
import { useRef, useEffect, useState, useCallback } from 'react';
import VvvebJs from '@vvvebjs/react';

function Builder() {
	let pages = {
		"page1": {
			name: "page1",
			filename: null,
			file: null,
			url: null,
			title: "Page 1",
			folder: null,
			description: "Page 1 description"
		},
	};
	
	// starter templates for new page modal
	let startTemplates = {
		"template1": {
			name: "template1",
			html:`<html>
				<head><link href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"></head>
				<body><div class="container my-3"><h1>Template 1</h1></div></body>
				</html>`
		},
		"template2": {
			name: "template2",
			html:`<html>
				<head><link href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"></head>
				<body>
					<div class="container my-3">
						<h2>Template 2</h2>
						<p class="lead">Lorem ipsum</p>
					</div>
				</body>
				</html>`
		},
	};
		
	if (localStorage.getItem('vvveb.pages')) {
		pages = JSON.parse(localStorage.getItem('vvveb.pages'));
	}
	
	//add custom sections
	const sections = () => {
		Vvveb.SectionsGroup['Custom'] =
		["custom/section-1", "custom/section-2"];


		Vvveb.Sections.add("custom/section-1", {
			name: "Custom section 1",
			dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/image.svg">',        
			image: Vvveb.baseUrl + 'icons/image.svg',
			html:`
		<section data-name="section-1">    
		  <div class="container">
			<h2>Custom section 1</h2>
		  </div>
		</section>`});
		
		Vvveb.Sections.add("custom/section-2", {
			name: "Custom section 1",
			dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/image.svg">',        
			image: Vvveb.baseUrl + 'icons/image.svg',
			html:`
		<section data-name="section-2">    
		  <div class="container">
			<h2>Custom section 2</h2>
		  </div>
		</section>`});
	}
	
	//add custom blocks
	const blocks = () => {
		Vvveb.BlocksGroup['Custom'] =
		["custom/block-1", "custom/block-2"];


		Vvveb.Blocks.add("custom/block-1", {
			name: "Custom block 1",
			image: Vvveb.baseUrl + 'icons/image.svg',
			html: `
				<div class="container">
					<h2>Custom block 1</h2>
				</div>`
		});
		
		Vvveb.Blocks.add("custom/block-2", {
			name: "Custom block 1",
			image: Vvveb.baseUrl + 'icons/image.svg',
			html: `
				<div class="container">
					<h2>Custom block 2</h2>
				</div>`
		});
		
	}

	//add custom components
	const components = () => {
			
		Vvveb.ComponentsGroup['Custom'] = [	
		"custom/myelement",
		];

		Vvveb.Components.extend("_base","custom/myelement", {
			nodes: ["myelement"],
			name: "MyElement",
			image: "icons/image.svg",
			resizable:true,
			html: `<myelement>
				  <img src="${Vvveb.baseUrl}icons/image.svg" alt="Desc">
				  <h1>Bane</h1>
				  <p>Description</p>
				</myelement>`,
				
			resizable:true,//show select box resize handlers
			
			properties: [{
				name: "Image",
				key: "src",
				child:"img",
				htmlAttr: "src",
				inputtype: ImageInput
			},{
				name: "Width",
				key: "width",
				child:"img",
				htmlAttr: "width",
				inputtype: CssUnitInput
			},{
				name: "Height",
				key: "height",
				child:"img",
				htmlAttr: "height",
				inputtype: CssUnitInput
			},{
				name: "Alt",
				key: "alt",
				child:"img",
				htmlAttr: "alt",
				inputtype: TextInput
			},{
				name: "Caption",
				key: "caption",
				child:"figcaption",
				htmlAttr: "innerHTML",
				inputtype: TextareaInput
			}]    
		});
			
	}
	
	const ready = (Vvveb) => {
		sections();
		components();
		blocks();
		
		//disable new page form sumission
		document.querySelector("#new-page-modal form").action = "";
	}

	const init = (Vvveb) => {
		//set media path
		//window.mediaPath = '';
		window.mediaPath = Vvveb.baseUrl + '../../media';
		
		//set media handlers
		window.uploadUrl = '/upload-endpoint';
		window.deleteUrl = '/delete-endpoint';
		window.renameUrl = '/rename-endpoint';
	
		Vvveb.MediaModal.setResponse([{
		"name": "",
		"type": "folder",
		"path": "",
		"items": [
			{
				"name": "15.jpg",
				"type": "file",
				"path": "\/15.jpg",
				"size": 135553
			},
			{
				"name": "2.jpg",
				"type": "file",
				"path": "\/2.jpg",
				"size": 87295
			},
			{
				"name": "4.jpg",
				"type": "file",
				"path": "\/4.jpg",
				"size": 225688
			},
			{
				"name": "5.jpg",
				"type": "file",
				"path": "\/5.jpg",
				"size": 158339
			},
			{
				"name": "6.jpg",
				"type": "file",
				"path": "\/6.jpg",
				"size": 149161
			},
			{
				"name": "7.jpg",
				"type": "file",
				"path": "\/7.jpg",
				"size": 57618
			},
			{
				"name": "mountains",
				"type": "folder",
				"path": "\/mountains",
				"items": [
					{
						"name": "1.jpg",
						"type": "file",
						"path": "\/mountains\/1.jpg",
						"size": 72587
					},
					{
						"name": "12.jpg",
						"type": "file",
						"path": "\/mountains\/12.jpg",
						"size": 130542
					},
					{
						"name": "3.jpg",
						"type": "file",
						"path": "\/mountains\/3.jpg",
						"size": 126297
					}
				]
			},
			{
				"name": "sample.webm",
				"type": "file",
				"path": "\/sample.webm",
				"size": 663407
			},
			{
				"name": "sample.webp",
				"type": "file",
				"path": "\/sample.webp",
				"size": 5138
			}]}]);
	}
	
	const editor = (Vvveb) => console.log(Vvveb);
	
	window.addEventListener("Vvveb.FileManager.deletePage", (e) => {
		let data = e.detail;
		delete pages[data.name];
		localStorage.setItem('vvveb.pages', JSON.stringify(pages));
	});
	
	window.addEventListener("Vvveb.FileManager.renamePage", (e) => {
		let data = e.detail;
		console.log(e, 'renamePage', data);
	});
	
	window.addEventListener("Vvveb.FileManager.addPage", (e) => {
		let data = e.detail;
		console.log(e, 'addPage', data);
	});
	
	window.addEventListener("Vvveb.FileManager.loadPage", (e) => {
		let data = e.detail;
		if (localStorage.hasOwnProperty('vvveb.content')) {
			let content = JSON.parse(localStorage.getItem('vvveb.content'));
			
			if (content.hasOwnProperty(data.name)) {
				return Vvveb.Builder.loadHtml(content[data.name]);
			}
		}
	
		Vvveb.Builder.loadHtml(`<html>
				<head><link href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"></head>
				<body><div class="m-5"><h1>${data.name}</h1></div></body>
				</html>`);
	});
	
	window.addEventListener("Vvveb.Builder.save", (e) => {
		let data = e.detail;
		pages[data.name] = data;
		localStorage.setItem('vvveb.pages', JSON.stringify(pages));

		let content = {};
		if (localStorage.hasOwnProperty('vvveb.content')) {
			content = JSON.parse(localStorage.getItem('vvveb.content'));
		}
		
		if (data.startTemplateUrl) {
			//new page use selected template
			content[data.name] = startTemplates[data.startTemplateUrl]["html"];
		} else {
			//existing page
			content[data.name] = data.html;//Vvveb.Builder.getHtml();
		}
		
		localStorage.setItem('vvveb.content', JSON.stringify(content));
		
		displayToast("success", "Save", "Page saved!");
	});
	


 return (
		<VvvebJs pages={pages} startTemplates={startTemplates} onEditor={editor} onReady={ready} onInit={init}/>
	);
}

export default Builder;
```

## License

Apache 2
