import React from 'react';
import PropTypes from 'prop-types';
import ENVIRONMENT from '../../environments/environment';

function TextImage(props) {
    const { title, image, text } = props;

    function CleanImage(properties) {
        const { image: img } = properties;
        if (img) {
            const damURL = ENVIRONMENT.server + img.renditions['480'].link;

            return (
                <img className="img-responsive" src={damURL} alt="TextIm alt." />
            );
        }
        return null;
    }

    function createMarkup() {
        return { __html: text };
    }

    return (
        <div>
            <h5 className="light">{title}</h5>
            <div>
                <CleanImage image={image} />
            </div>
            <div>
                <p dangerouslySetInnerHTML={createMarkup()} />
            </div>
        </div>
    );
}

TextImage.propTypes = {
    title: PropTypes.string,
    image: PropTypes.object,
    text: PropTypes.string
};

TextImage.defaultProps = {
    title: null,
    image: null,
    text: null
};

export default TextImage;
