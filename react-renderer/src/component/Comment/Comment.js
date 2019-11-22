import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class Comment extends Component {
    static propTypes = {
        text: PropTypes.string,
        trim: PropTypes.bool
    };

    static defaultProps = {
        text: '',
        trim: true
    };

    componentDidMount() {
        ReactDOM.unmountComponentAtNode(this.node);
        this.node.outerHTML = this.createComment();
    }

    createComment() {
        let { text } = this.props;
        const { trim } = this.props;

        if (trim) {
            text = text.trim();
        }

        return `<!-- ${text} -->`;
    }

    render() {
        return <div ref={(node => this.node = node)} />;
    }
}

export default Comment;
