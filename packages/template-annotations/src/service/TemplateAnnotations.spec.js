import TemplateAnnotations from './TemplateAnnotations';
import page from '../../mock/page.json';
import pageDefinition from '../../mock/template-definition.json';

describe('Test Magnolia SPA Service', () => {
    it('Test getPageCommentString with data', () => {
        // GIVEN
        const expectedResult = 'cms:page content="website:/react-sample" dialog="mte:pages/pageProperties"';

        // WHEN
        const result = TemplateAnnotations.getPageCommentString(page, pageDefinition['sample-light-module:pages/standard']);

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getAreaCommentString with data', () => {
        // GIVEN
        const expectedResult = cleanString(`cms:area name="main" content="website:/react-sample/main"
         availableComponents="sample-light-module:components/text-image,sample-light-module:components/title,sample-light-module:components/nested"
          type="list" label="Main" inherit="false" optional="false" createdAreaNode="true" showAddButton="true" showNewComponentArea="true" description=""
          activationStatus="1"`);

        // WHEN
        const result = TemplateAnnotations.getAreaCommentString(page.main, pageDefinition['sample-light-module:pages/standard']);

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getComponentCommentString with data', () => {
        // GIVEN
        const expectedResult = cleanString(`cms:component content="website:/react-sample/main/0"
        dialog="sample-light-module:components/title" label="The nested area in component" description="" activationStatus="1"`);

        // WHEN
        const result = TemplateAnnotations.getComponentCommentString(page.main['0'], pageDefinition['sample-light-module:components/nested']);

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

    it('Test getComponentCommentString with activationStatus', () => {
        // GIVEN
        const expectedResult = cleanString(`cms:component content="website:/react-sample/main/0"
        dialog="sample-light-module:components/title" label="The nested area in component" description="" activationStatus="1"`);

        // WHEN
        const result = TemplateAnnotations.getComponentCommentString(page.main['0'], pageDefinition['sample-light-module:components/nested']);

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getComponentCommentString with activationStatus', () => {
        // GIVEN
        const expectedResult = cleanString(`cms:component content="website:/react-sample/main/00"
        dialog="sample-light-module:components/title" label="Title" description="" activationStatus="2"`);

        // WHEN
        const result = TemplateAnnotations.getComponentCommentString(page.main['00'], pageDefinition['sample-light-module:components/title']);

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getComponentCommentString with activationStatus', () => {
        // GIVEN
        const expectedResult = cleanString(`cms:component content="website:/react-sample/main/01"
        dialog="sample-light-module:components/title" label="Title" description="" activationStatus="0"`);

        // WHEN
        const result = TemplateAnnotations.getComponentCommentString(page.main['01'], pageDefinition['sample-light-module:components/title']);

        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('Test getComponentCommentString with activationStatus', () => {
        // GIVEN
        const expectedResult = cleanString(`cms:component content="website:/react-sample/main/02"
        dialog="sample-light-module:components/title" label="Title" description="" activationStatus="0"`);

        // WHEN
        const result = TemplateAnnotations.getComponentCommentString(page.main['02'], pageDefinition['sample-light-module:components/title']);

        // THEN
        expect(result).toEqual(expectedResult);
    });

    function cleanString(str) {
        return str.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    }
});
