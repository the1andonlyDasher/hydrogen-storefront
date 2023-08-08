import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import * as THREE from 'three';

export const model = atom<any>([])
export const globalScroll = atomWithStorage<any>("currentScroll",0)
export const currentSection = atom<any>("");
export const globalLoaded = atomWithStorage("loaded", false)

const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

manager.onLoad = () => {console.log("finished")}

// manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
// 	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
// };

manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};

export const loadManager = atom<any>(manager)
