import React from 'react';
import { EditableArea, EditableComponent } from '@magnolia/react-editor';

class CustomArea extends EditableArea {
  render() {
    const { content } = this.props;
    const componentNames = content['@nodes'];
    const hasComponents = componentNames.length > 0;
    return (
      <div ref={node => (this.node = node)} key={content['@id']}>
        <p>
          Custom area script:
          {content.title}
        </p>
        {hasComponents ? (
          <EditableComponent
            key={content[componentNames[0]]['@id']}
            content={content[componentNames[0]]}
          />
        ) : null}
      </div>
    );
  }
}

export default CustomArea;
