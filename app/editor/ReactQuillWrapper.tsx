// import React, { forwardRef } from 'react';
// import ReactQuill, { ReactQuillProps } from 'react-quill';

// // Define the correct ref type
// const ReactQuillWrapper = forwardRef<ReactQuill, ReactQuillProps>((props, ref) => {
//   return <ReactQuill ref={ref} {...props} />;
// });

// export default ReactQuillWrapper;
import React, { forwardRef } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';

const ReactQuillWrapper = forwardRef<ReactQuill, ReactQuillProps>((props, ref) => (
  <ReactQuill ref={ref} {...props} />
));

export default ReactQuillWrapper;
