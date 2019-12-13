import TemplateAnnotations from './TemplateAnnotations';
import page from '../../mock/page.json';
import pageDefinition from '../../mock/template-definition.json';

describe('Test Magnolia SPA Service', () => {
    it('Test getPageCommentString with data', () => {
        // GIVEN
        const expectedResult = 'cms:page content="website:/react-minimal" dialog="spa-react-app:pages/home"';

        // WHEN
        const result = TemplateAnnotations.getPageCommentString(page, pageDefinition);

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getAreaCommentString with data', () => {
        // GIVEN
        const expectedResult = cleanString(`cms:area name="main-area" content="website:/react-minimal/main-area"
         availableComponents="spa-react-app:components/title,spa-react-app:components/text-image" type="list" label=""
          inherit="false" optional="false" createdAreaNode="true" showAddButton="true" showNewComponentArea="true" description="" activationStatus="0"`);

        // WHEN
        const result = TemplateAnnotations.getAreaCommentString(page['main-area'], pageDefinition);

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getComponentCommentString with data', () => {
        // GIVEN
        const expectedResult = cleanString(`cms:component content="website:/react-minimal/main-area/0"
        dialog="spa-react-app:components/title" label="Standard Minimal Page" description="" activationStatus="0"`);

        // WHEN
        const result = TemplateAnnotations.getComponentCommentString(page['main-area']['0'], pageDefinition);

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getPageCommentString without data', () => {
        // GIVEN
        const expectedResult = 'cms:page content="" dialog=""';

        // WHEN
        const result = TemplateAnnotations.getPageCommentString(null, null);

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getAreaCommentString without data', () => {
        // GIVEN
        const expectedResult = cleanString(`cms:area name="" content="" availableComponents="" type="list" label="" inherit="false"
        optional="false" createdAreaNode="true" showAddButton="true" showNewComponentArea="true" description="" activationStatus="0"`);

        // WHEN
        const result = TemplateAnnotations.getAreaCommentString(null, null);

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getComponentCommentString without data', () => {
        // GIVEN
        const expectedResult = 'cms:component content="" dialog="" label="" description="" activationStatus="0"';

        // WHEN
        const result = TemplateAnnotations.getComponentCommentString(null, null);

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getPageCommentString with empty data', () => {
        // GIVEN
        const expectedResult = 'cms:page content="" dialog=""';

        // WHEN
        const result = TemplateAnnotations.getPageCommentString({}, {});

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getAreaCommentString with empty data', () => {
        // GIVEN
        const expectedResult = cleanString(`cms:area name="" content="" availableComponents="" type="list" label="" inherit="false" optional="false"
        createdAreaNode="true" showAddButton="true" showNewComponentArea="true" description="" activationStatus="0"`);

        // WHEN
        const result = TemplateAnnotations.getAreaCommentString({}, {});

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getComponentCommentString with empty data', () => {
        // GIVEN
        const expectedResult = 'cms:component content="" dialog="" label="" description="" activationStatus="0"';

        // WHEN
        const result = TemplateAnnotations.getComponentCommentString({}, {});

        // THEN
        expect(result).toEqual(expectedResult);
    });

    function cleanString(str) {
        return str.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    }
});
