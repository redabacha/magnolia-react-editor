/* eslint-disable no-console */
import ENVIRONMENT from '../environments/environment';

export function dlog(message, parameter) {
    // if (process.env.REACT_APP_LOG_LEVEL > 0) {
    if (parameter) {
        console.log(message, parameter);
    } else {
        console.log(message);
    }
    // }
}

/* Get the path of an item relative to it's page.

For example if a component is /myproject/mypage/area/comp2,
then it will return just /area/comp2.
*/
export function getRelativePath(path, serverPath, rootCmsPath, inPageEditor) {
    if (inPageEditor) {
        dlog(`NAV: inPageEdigtor:${serverPath}${path}`);
        return serverPath + path;
    }
    dlog('NAV: Not in page editor.');
    // Just strip off the pathOfPage. We assume it is the correct path root.
    const relativePath = path.substr(rootCmsPath.length);
    return relativePath;
}

export function getLink(path, serverPath, rootCmsPath, inPageEditor) {
    let link = getRelativePath(path, serverPath, rootCmsPath, inPageEditor);
    if (inPageEditor) {
    // link += rootCmsPath;
        link += '.html';
    }
    return link;
}

export function isInPageEditor() {
    return window.inPageEditor || Boolean(window.parent && window.parent.mgnlRefresh);
}

export function getEditorPath(relativePath) {
    // remove serverPath
    let newPath = relativePath.substr(ENVIRONMENT.serverPath.length);

    // remove rootCmsPath
    newPath = newPath.substr(ENVIRONMENT.rootCmsPath.length);
    return newPath;
}

export function removeExtension(path) {
    let newPath = path;
    if (path.indexOf('.') > -1) {
        newPath = path.substr(0, path.lastIndexOf('.'));
    }
    return newPath;
}

export function getRootPath(path) {
    const paths = removeExtension(path).split('/');
    if (paths.length < 2) {
        return path;
    }
    return `/${paths[1]}`;
}
