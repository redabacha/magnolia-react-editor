import Title from '../app/component/Title';
import TextImage from '../app/component/TextImage';
import Nested from '../app/component/Nested';
import Navigation from '../app/component/Navigation';
// NƠTE: This component mapping is very important, and it needs to be passed into enableMgnlRenderer
// to render the content
const COMPONENTS = {
    'sample-light-module:components/title': Title,
    'sample-light-module:components/text-image': TextImage,
    'sample-light-module:components/nested': Nested,
    'sample-light-module:components/navigation': Navigation
};

export default COMPONENTS;
