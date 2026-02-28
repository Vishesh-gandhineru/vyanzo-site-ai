const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'public/products/pdf');

function getDirectoryTree(dirPath, relativeRoot = '') {
  const result = [];
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const relPath = path.join(relativeRoot, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      result.push({
        name: item,
        type: 'folder',
        children: getDirectoryTree(fullPath, relPath)
      });
    } else if (stat.isFile() && item.endsWith('.pdf')) {
      result.push({
        name: item,
        type: 'file',
        path: `/products/pdf/${relPath.replace(/\\/g, '/')}`,
        size: Math.round(stat.size / 1024) + ' KB'
      });
    }
  }
  return result;
}

const tree = getDirectoryTree(baseDir);
fs.writeFileSync(path.join(__dirname, 'src/data/docsMap.json'), JSON.stringify(tree, null, 2));
console.log('Done!');
