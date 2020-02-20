import React from 'react';
import { Link } from 'react-router-dom';
import { RendererContext } from '@magnolia/react-renderer';
import { getRootPath } from '../AppHelpers';
import ENVIRONMENT from '../../environments/environment';

function Navigation() {
    const [contentList, setContentList] = React.useState([]);
    const context = React.useContext(RendererContext);
    const { content } = context;
    const rootPath = getRootPath(content['@path']);
    const url = `${ENVIRONMENT.restUrlBase}${rootPath}`;
    const childUrl = `${ENVIRONMENT.restUrlBase}${rootPath}/@nodes`;

    React.useEffect(() => {
        if (!contentList.length) {
            fetchContent();
        }
    });

    async function fetchContent() {
        const parentRes = fetch(url);
        const childRes = fetch(childUrl);
        await parentRes;
        await childRes;
        const parentData = await (await parentRes).json();
        const childData = await (await childRes).json();
        const contents = [parentData, ...childData];
        setContentList(contents);
    }

    return contentList.length ? (
        <div>
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                <ul className="navbar-nav">
                    {
                        contentList.map(item => {
                            const { pathname } = window.location;
                            const path = `${ENVIRONMENT.serverPath}${item['@path']}.html`;
                            return (
                                <li className={`nav-item ${path === pathname ? 'active' : ''}`}>
                                    <Link className="nav-link" to={path}>{item.title || item['@name']}</Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
        </div>
    ) : (<div />);
}

export default Navigation;
