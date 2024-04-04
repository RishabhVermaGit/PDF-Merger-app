import PDFMerger from 'pdf-merger-js';
var merger = new PDFMerger();

export const mergePdfs = async (pdfs) => {
  for(let i of pdfs)
    await merger.add(i);  
  let d = new Date().getTime()
  await merger.save(`public/${d}.pdf`); 
  return d;
};