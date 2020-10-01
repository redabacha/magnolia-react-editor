import Title from '../app/component/Title';
import TextImage from '../app/component/TextImage';
import Nested from '../app/component/Nested';
import Navigation from '../app/component/Navigation';
import HomePage from '../app/component/HomePage';
import TwoColumns from '../app/component/TwoColumns';
// NƠTE: This component mapping is very important, and it needs to be passed into <Page.config> property
// to render the content
const COMPONENTS = {
  'sample-light-module:components/title': Title,
  'sample-light-module:components/text-image': TextImage,
  'sample-light-module:components/nested': Nested,
  'sample-light-module:components/navigation': Navigation,
  'sample-light-module:pages/standard': HomePage,
  'sample-light-module:pages/twoColumns': TwoColumns
};

export default COMPONENTS;
