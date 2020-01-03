import * as React from 'react';
import PropTypes from 'prop-types';
import { RendererProvider } from './RendererContext';

export default function enableMgnlRenderer(WrappedComponent, componentMappings) {
    return class extends React.Component {
        static propTypes = {
            templateDefinitions: PropTypes.object,
            content: PropTypes.object,
            inPageEditor: PropTypes.bool
        };

        static defaultProps = {
            templateDefinitions: null,
            content: null,
            inPageEditor: false
        };

        constructor(props) {
            super(props);
            const { templateDefinitions, content } = props;
            const isInPageEditor = Boolean(window.parent && window.parent.mgnlRefresh);

            this.state = {
                templateDefinitions,
                componentMappings,
                content,
                inPageEditor: isInPageEditor
            };
        }

        render() {
            return (
                <RendererProvider value={this.state}>
                    <WrappedComponent {...this.props} />
                </RendererProvider>
            );
        }
    };
}
