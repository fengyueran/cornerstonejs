import React, { useEffect } from 'react';

import {
  RenderingEngine,
  Enums,
  StackViewport,
  init as csRenderInit,
} from '@cornerstonejs/core';
import { init as csToolsInit } from '@cornerstonejs/tools';

function App() {
  useEffect(() => {
    const run = async () => {
      await csRenderInit();
      await csToolsInit();
      // Get Cornerstone imageIds and fetch metadata into RAM
      const imageIds = [
        'wadors:https://d3t6nz73ql33tx.cloudfront.net/dicomweb/studies/1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463/series/1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561/instances/1.3.6.1.4.1.14519.5.2.1.7009.2403.811199116755887922789178901449/frames/1',
      ];
      //localhost:3001/
      // Final code

      const content = document.getElementById('content')!;
      const element = document.createElement('div');

      element.style.width = '500px';
      element.style.height = '500px';

      content.appendChild(element);

      const renderingEngineId = 'myRenderingEngine';
      const viewportId = 'CT_AXIAL_STACK';
      const renderingEngine = new RenderingEngine(renderingEngineId);

      const viewportInput = {
        viewportId,
        element,
        type: Enums.ViewportType.STACK,
      };

      renderingEngine.enableElement(viewportInput);

      const viewport = renderingEngine.getViewport(
        viewportInput.viewportId
      ) as StackViewport;

      viewport.setStack(imageIds, 0);

      viewport.render();
    };
    run();
  }, []);
  return <div id="content"></div>;
}

export default App;
