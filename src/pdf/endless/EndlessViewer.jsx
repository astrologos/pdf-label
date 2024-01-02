import React, { useState } from 'react';
import { CgDebug, CgArrowsExpandDownRight } from 'react-icons/cg';
import { RiImageEditFill } from 'react-icons/ri';

import AnnotatablePage from './AnnotatablePage';

const Range = maxValue => 
  Array.from(Array(maxValue).keys());

const EndlessViewer = props => {

  const [ debug, setDebug ] = useState(false);
  const [ annotationMode, setAnnotationMode ] = useState('ANNOTATION');

  // New state for additional features
  // Example: Adding a zoom feature
  const [ zoomLevel, setZoomLevel ] = useState(1);

  const onToggleRelationsMode = () => {
    if (annotationMode === 'RELATIONS')
      setAnnotationMode('ANNOTATION');
    else
      setAnnotationMode('RELATIONS'); 
  }

  const onToggleImageMode = () => {
    if (annotationMode === 'IMAGE')
      setAnnotationMode('ANNOTATION');
    else
      setAnnotationMode('IMAGE');
  }

  // Example function to handle zoom level change
  const handleZoomChange = (increment) => {
    setZoomLevel(prevZoom => prevZoom + increment);
  }
  
  return (
    <div>
      <header>
        <span className='debug-header'>
          <button 
            className={debug ? 'active' : null}
            onClick={() => setDebug(!debug)}
            >
              <span className="inner">
                <CgDebug />
              </span>
            Debug
          </button>
          </span>

<span className='annotate-header'>
    <button
      className={annotationMode === 'IMAGE' ? 'active' : null} 
      onClick={onToggleImageMode}>
      <span className="inner">
        <RiImageEditFill />
      </span>
      Image
    </button>
  </span>
</header>

<main>
  <div className="pdf-viewer-container">
      {Range(props.pdf.numPages).map(idx =>
          <AnnotatablePage 
              key={idx}
              url={props.url}
              pdf={props.pdf}
              page={idx + 1} 
              config={props.config}
              debug={debug} 
              store={props.store}
              connections={props.connections}
              annotationMode={annotationMode}
              zoomLevel={zoomLevel}
              onCreateAnnotation={props.onCreateAnnotation}
              onUpdateAnnotation={props.onUpdateAnnotation}
              onDeleteAnnotation={props.onDeleteAnnotation} 
              onCancelSelected={props.onCancelSelected} />
          )}
        </div>
      </main>
    </div>
  );
}

export default EndlessViewer;
